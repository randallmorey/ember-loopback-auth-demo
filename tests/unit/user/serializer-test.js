import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import Pretender from 'pretender';

const { run } = Ember;

moduleForModel('user', 'Unit | Serializer | user', {
  // Specify the other units that are required for this test.
  needs: ['serializer:user']
});

test('it serializes records', function (assert) {
  const record = this.subject({
    email: 'test@foo.com',
    emailConfirmation: 'test@foo.com',
    password: 'password1234',
    passwordConfirmation: 'password1234'
  });
  const {
    email,
    password,
    emailConfirmation,
    passwordConfirmation
  } = record.serialize().data.attributes;
  assert.equal(email, 'test@foo.com');
  assert.equal(password, 'password1234');
  assert.equal(emailConfirmation, undefined);
  assert.equal(passwordConfirmation, undefined);
});

test('it normalizes records and nulls password, passwordConfirmation, and emailConfirmation', function (assert) {
  let done = assert.async();
  const server = new Pretender(function () {
    this.post('/users', function (request) {
      let response = JSON.parse(request.requestBody);
      response.data.id = '1';
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
    });
  });
  run(() => {
    const record = this.subject({
      email: 'test@foo.com',
      emailConfirmation: 'test@foo.com',
      password: 'password1234',
      passwordConfirmation: 'password1234'
    });
    record.save().then(() => {
      assert.equal(record.get('email'), 'test@foo.com');
      assert.equal(record.get('emailConfirmation'), null);
      assert.equal(record.get('password'), null);
      assert.equal(record.get('passwordConfirmation'), null);
      server.shutdown();
      done();
    });
  });
});
