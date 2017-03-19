import { moduleForModel, test } from 'ember-qunit';

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

test('it normalizes responses and nulls password, passwordConfirmation, and emailConfirmation', function (assert) {
  const record = this.subject();
  const serializer = this.store().serializerFor('user');
  const responseHash = {
    data: {
      id: '1',
      type: 'users',
      attributes: {
        email: 'test@foo.com',
        emailConfirmation: 'test@foo.com',
        password: 'password1234',
        passwordConfirmation: 'password1234'
      }
    }
  };
  const normalizedHash = serializer.normalize(record.constructor, responseHash.data);
  assert.equal(normalizedHash.data.attributes.password, null);
  assert.equal(normalizedHash.data.attributes.passwordConfirmation, null);
  assert.equal(normalizedHash.data.attributes.emailConfirmation, null);
});
