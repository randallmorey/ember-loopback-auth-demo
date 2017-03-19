import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('user/user-form', 'Integration | Component | user/user form', {
  integration: true
});

test('it renders with a new empty user model', function (assert) {
  run(() => {
    this.set('user', {});
    this.render(hbs`{{user/user-form user=user}}`);
    assert.equal(this.$('[name="email"]:visible').length, 1);
    assert.equal(this.$('[name="emailConfirmation"]:visible').length, 1);
    assert.equal(this.$('[name="password"]:visible').length, 1);
    assert.equal(this.$('[name="passwordConfirmation"]:visible').length, 1);
  });
});

test('it renders with a new filled user model', function (assert) {
  run(() => {
    this.set('user', {
      email: 'test@foo.com',
      emailConfirmation: 'test@foo.com',
      password: 'password1234',
      passwordConfirmation: 'password1234'
    });
    this.render(hbs`{{user/user-form user=user}}`);
    assert.equal(this.$('[name="email"]:visible').val(), 'test@foo.com');
    assert.equal(this.$('[name="emailConfirmation"]:visible').val(), 'test@foo.com');
    assert.equal(this.$('[name="password"]:visible').val(), 'password1234');
    assert.equal(this.$('[name="passwordConfirmation"]:visible').val(), 'password1234');
  });
});

test('it updates underlaying instance based on user input', function (assert) {
  run(() => {
    let user = {};
    this.set('user', user);
    this.render(hbs`{{user/user-form user=user}}`);
    // fill out the form and force an onchange
    this.$('[name="email"]').val('test@foo.com');
    this.$('[name="email"]').change();
    this.$('[name="emailConfirmation"]').val('test@foo.com');
    this.$('[name="emailConfirmation"]').change();
    this.$('[name="password"]').val('this is a simple passphrase');
    this.$('[name="password"]').change();
    this.$('[name="passwordConfirmation"]').val('this is a simple passphrase');
    this.$('[name="passwordConfirmation"]').change();
    // test that changes propogate to underlaying instance
    assert.equal(user.email, 'test@foo.com');
    assert.equal(user.emailConfirmation, 'test@foo.com');
    assert.equal(user.password, 'this is a simple passphrase');
    assert.equal(user.passwordConfirmation, 'this is a simple passphrase');
  });
});

test('it renders validation error messages', function (assert) {
  run(() => {
    const store = this.container.lookup('service:store');
    let user = store.createRecord('user', {
      email: 'test',
      emailConfirmation: 'example@baz.com',
      password: 'password1234',
      passwordConfirmation: 'passfoo'
    });
    this.set('user', user);
    this.render(hbs`{{user/user-form user=user}}`);
    user.validate();
  });
  run(() => {
    let emailErrors = this.get('user.errors').errorsFor('email');
    let emailConfirmationErrors = this.get('user.errors').errorsFor('emailConfirmation');
    let passwordErrors = this.get('user.errors').errorsFor('password');
    let passwordConfirmationErrors = this.get('user.errors').errorsFor('passwordConfirmation');
    assert.equal(this.$('.form-group.has-danger:visible').length, 4);
    assert.equal(this.$('.form-group:eq(0) .form-control-feedback').text(), emailErrors[0].message);
    assert.equal(this.$('.form-group:eq(1) .form-control-feedback').text(), emailConfirmationErrors[0].message);
    assert.equal(this.$('.form-group:eq(2) .form-control-feedback').text(), passwordErrors[0].message);
    assert.equal(this.$('.form-group:eq(3) .form-control-feedback').text(), passwordConfirmationErrors[0].message);
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
  this.render(hbs`{{user/user-form user=user}}`);
  // submit form
  this.$('button[type="submit"]').click();
});
// ===

test('it triggers the external save action on submit if the user instance is valid', function (assert) {
  run(() => {
    const store = this.container.lookup('service:store');
    let user = store.createRecord('user', {});
    this.set('user', user);
    this.set('externalSave', (savedUser) => {
      assert.ok(savedUser);
      assert.equal(savedUser.get('email'), 'test@foo.com');
      assert.equal(savedUser.get('emailConfirmation'), 'test@foo.com');
      assert.equal(savedUser.get('password'), 'this is a simple passphrase');
      assert.equal(savedUser.get('passwordConfirmation'), 'this is a simple passphrase');
    });
    this.render(hbs`{{user/user-form user=user save=(action externalSave)}}`);
    // fill out the form and force an onchange
    this.$('[name="email"]').val('test@foo.com');
    this.$('[name="email"]').change();
    this.$('[name="emailConfirmation"]').val('test@foo.com');
    this.$('[name="emailConfirmation"]').change();
    this.$('[name="password"]').val('this is a simple passphrase');
    this.$('[name="password"]').change();
    this.$('[name="passwordConfirmation"]').val('this is a simple passphrase');
    this.$('[name="passwordConfirmation"]').change();
    // submit form
    this.$('button[type="submit"]').click();
  });
});
