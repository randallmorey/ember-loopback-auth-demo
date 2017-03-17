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

test('it has a `passwordStrength` property that returns a strength report object', function (assert) {
  const model = this.subject();
  run(() => {
    model.set('password', 'foobar123');
    const {
      guesses,
      score,
      feedback: {
        warning,
        suggestions: [suggestion]
      }
    } = model.get('passwordStrength');
    assert.equal(guesses, 101400);
    assert.equal(score, 1);
    assert.equal(warning, 'This is similar to a commonly used password');
    assert.equal(suggestion, 'Add another word or two. Uncommon words are better.');
  });
});

test('it has a `passwordStrength` property that returns a strength report object which sometimes has no `warning` feedback', function (assert) {
  const model = this.subject();
  run(() => {
    model.set('password', 'foo');
    const {
      guesses,
      score,
      feedback: {
        warning,
        suggestions: [suggestion]
      }
    } = model.get('passwordStrength');
    assert.equal(guesses, 1001);
    assert.equal(score, 0);
    assert.equal(warning, '');
    assert.equal(suggestion, 'Add another word or two. Uncommon words are better.');
  });
});

test('it passes validation if validations are satisfied', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('email', 'test@foo.com');
    model.set('emailConfirmation', 'test@foo.com');
    model.set('password', 'this password is good enough');
    model.set('passwordConfirmation', 'this password is good enough');
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
    assert.equal(errors[0].message[0], 'is too short (minimum is 10 characters)');
  });
});

test('it fails validation if password is not strong enough', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'abcdefghijkl');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'Sequences like abc or 6543 are easy to guess. Add another word or two. Uncommon words are better. Avoid sequences');
  });
  run(() => {
    model.set('password', 'foo');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[1].message[0], 'Add another word or two. Uncommon words are better.');
  });
});

test('it fails validation if password is not strong enough because it contains the email address', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('email', 'test@foo.com');
    model.set('emailConfirmation', 'test@foo.com');
    model.set('password', 'test@foo.com');
    model.set('passwordConfirmation', 'test@foo.com');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('password');
    assert.equal(errors[0].message[0], 'Add another word or two. Uncommon words are better.');
  });
});

test('it fails validation if passwordConfirmation does not match password', function (assert) {
  const model = this.subject();
  // let store = this.store();
  run(() => {
    model.set('password', 'this password is good enough');
    model.set('passwordConfirmation', 'this password is good enough, but different');
    assert.notOk(model.validate());
    const errors = model.get('errors').errorsFor('passwordConfirmation');
    assert.equal(errors[0].message[0], 'must match Password');
  });
});
