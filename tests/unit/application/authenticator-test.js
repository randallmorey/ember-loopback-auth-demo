import { moduleFor, test } from 'ember-qunit';
import config from '../../../config/environment';

moduleFor('authenticator:application', 'Unit | Authenticator | application', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const authenticator = this.subject();
  assert.ok(authenticator);
});

test('its `loginEndpoint` attribute is derived through app config', function (assert) {
  const authenticator = this.subject();
  assert.equal(authenticator.get('loginEndpoint'), config.api.host + config.api.namespace + '/users/login');
});
