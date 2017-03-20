import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import config from '../../../config/environment';

const { run } = Ember;
const { RSVP: { Promise } } = Ember;

moduleFor('authenticator:application', 'Unit | Authenticator | application', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const authenticator = this.subject();
  assert.ok(authenticator);
});

test('its `loginEndpoint` attribute is derived through app config', function (assert) {
  const authenticator = this.subject();
  assert.equal(authenticator.get('loginEndpoint'), config.api.host + '/' + config.api.namespace + '/users/login');
});

test('its `authenticate` method calls `makeRequest` with credentials from the passed user instance', function (assert) {
  const done = assert.async();
  const authenticator = this.subject({
    makeRequest(url, credentials) {
      assert.ok(true, 'makeRequest() should be called');
      assert.equal(credentials.email, 'test@foo.com');
      assert.equal(credentials.password, 'password1234');
      done();
    }
  });
  const store = authenticator.get('store');
  run(() => {
    const user = store.createRecord('user', {
      email: 'test@foo.com',
      password: 'password1234'
    });
    authenticator.authenticate(user);
  });
});

test('its `authenticate` method adds an error to the base field of the passed user instance if authentication fails', function (assert) {
  const done = assert.async();
  const authenticator = this.subject({
    makeRequest() {
      return Promise.reject({responseJSON: '{}'});
    }
  });
  const store = authenticator.get('store');
  run(() => {
    const user = store.createRecord('user');
    authenticator.authenticate(user).catch(() => {
      assert.ok(user.get('errors.base')[0].message);
      done();
    });
  });
});
