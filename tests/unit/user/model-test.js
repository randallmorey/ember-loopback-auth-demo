import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { run } = Ember;

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function (assert) {
  const model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it passes validation if validations are satisfied', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('email', 'test@foo.com');
    model.set('emailConfirmation', 'test@foo.com');
    model.set('password', '1234ABcd++');
    model.set('passwordConfirmation', '1234ABcd++');
    assert.ok(model.validate());
  });
});

test('it fails validation if email is invalid', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('email', 'notReallyAnEmail.com');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('email');
    assert.equal(errors[0].message[0], 'is not a valid email');
  });
});

test('it fails validation if email is blank', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('email', '');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('email');
    assert.equal(errors[0].message[0], 'can\'t be blank');
  });
});

test('it fails validation if emailConfirmation does not match email', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('email', 'test@foo.com');
    model.set('emailConfirmation', 'cool@bro.net');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('emailConfirmation');
    assert.equal(errors[0].message[0], 'must match Email');
  });
});

test('it fails validation if password is blank', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', '');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'can\'t be blank');
  });
});

test('it fails validation if password is too short', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'Ab12+');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'is too short (minimum is 8 characters)');
  });
});

test('it fails validation if password is missing an upper case character', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'abcd1234+++');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'must include an upper case character');
  });
});

test('it fails validation if password is missing a lower case character', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'ABCD1234+++');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'must include a lower case character');
  });
});

test('it fails validation if password is missing a number', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'ABCDabcd+++');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'must include a number');
  });
});

test('it fails validation if password is missing a special character', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'ABCDabcd123');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'must include one of these special characters: -+_!@#$%^&*.,?()');
  });
});

test('it fails validation if passwordConfirmation does not match password', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', '12345ABcd++');
    model.set('passwordConfirmation', 'ABcd1234--');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('passwordConfirmation');
    assert.equal(errors[0].message[0], 'must match Password');
  });
});
