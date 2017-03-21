import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('user/login-form', 'Integration | Component | user/login form', {
  integration: true
});

test('it renders with a new empty user model', function (assert) {
  run(() => {
    this.set('user', {});
    this.render(hbs`{{user/login-form user=user}}`);
    assert.equal(this.$('[name="email"]:visible').length, 1);
    assert.equal(this.$('[name="password"]:visible').length, 1);
  });
});

test('it renders with a new filled user model', function (assert) {
  run(() => {
    this.set('user', {
      email: 'test@foo.com',
      password: 'password1234'
    });
    this.render(hbs`{{user/login-form user=user}}`);
    assert.equal(this.$('[name="email"]:visible').val(), 'test@foo.com');
    assert.equal(this.$('[name="password"]:visible').val(), 'password1234');
  });
});

test('it updates underlaying instance based on user input', function (assert) {
  run(() => {
    let user = {};
    this.set('user', user);
    this.render(hbs`{{user/login-form user=user}}`);
    // fill out the form and force an onchange
    this.$('[name="email"]').val('test@foo.com');
    this.$('[name="email"]').change();
    this.$('[name="password"]').val('this is a simple passphrase');
    this.$('[name="password"]').change();
    // test that changes propogate to underlaying instance
    assert.equal(user.email, 'test@foo.com');
    assert.equal(user.password, 'this is a simple passphrase');
  });
});

test('it renders validation error messages', function (assert) {
  run(() => {
    const store = this.container.lookup('service:store');
    let user = store.createRecord('user', {
      email: 'test',
      password: 'password1234'
    });
    this.set('user', user);
    this.render(hbs`{{user/login-form user=user}}`);
    user.validate();
  });
  run(() => {
    let emailErrors = this.get('user.errors').errorsFor('email');
    let passwordErrors = this.get('user.errors').errorsFor('password');
    assert.equal(this.$('.form-group.has-danger:visible').length, 2);
    assert.equal(this.$('.form-group:eq(0) .form-control-feedback').text(), emailErrors[0].message);
    assert.equal(this.$('.form-group:eq(1) .form-control-feedback').text(), passwordErrors[0].message);
  });
});

// ===
test('its `submit` action calls `validate` on the user instance', function (assert) {
  assert.expect(1);
  let user = {
    validate() {
      assert.ok(true, 'user.validate() was called');
      return false;
    }
  };
  this.set('user', user);
  this.render(hbs`{{user/login-form user=user}}`);
  // submit form
  this.$('button[type="submit"]').click();
});
// ===

test('it triggers the external login action on submit if the user instance is valid', function (assert) {
  run(() => {
    const store = this.container.lookup('service:store');
    let user = store.createRecord('user', {});
    this.set('user', user);
    this.set('externalLogin', (loginUser) => {
      assert.ok(loginUser);
      assert.equal(loginUser.get('email'), 'test@foo.com');
      assert.equal(loginUser.get('password'), 'this is a simple passphrase');
    });
    this.render(hbs`{{user/login-form user=user login=(action externalLogin)}}`);
    // fill out the form and force an onchange
    this.$('[name="email"]').val('test@foo.com');
    this.$('[name="email"]').change();
    this.$('[name="password"]').val('this is a simple passphrase');
    this.$('[name="password"]').change();
    // submit form
    this.$('button[type="submit"]').click();
  });
});

test('it renders base error message', function (assert) {
  run(() => {
    const store = this.container.lookup('service:store');
    let user = store.createRecord('user', {
      email: 'test@foo.com',
      password: 'this is a simple passphrase'
    });
    this.set('user', user);
    user.pushErrors({
      base: ['Login failed.']
    });
    this.render(hbs`{{user/login-form user=user}}`);
  });
  run(() => {
    let baseErrors = this.get('user.errors').errorsFor('base');
    assert.equal(this.$('.form-group.has-danger:visible').length, 1);
    assert.equal(this.$('.form-group.has-danger:visible .form-control-feedback').text(), baseErrors[0].message);
  });
});
