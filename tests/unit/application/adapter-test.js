import { moduleFor, test } from 'ember-qunit';
import config from '../../../config/environment';

moduleFor('adapter:application', 'Unit | Adapter | application', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const adapter = this.subject();
  assert.ok(adapter);
});

test('its `host` attribute is derived through app config', function (assert) {
  const adapter = this.subject();
  assert.equal(adapter.get('host'), config.api.host);
});

test('its `namspace` attribute is derived from app config', function (assert) {
  const adapter = this.subject();
  assert.equal(adapter.get('namspace'), config.api.namspace);
});
