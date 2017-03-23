import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('its `invalidateSession` action calls `invalidate` on the session service', function (assert) {
  const controller = this.subject({
    session: {
      invalidate() {
        assert.ok(true, 'invalidate method was called');
      }
    }
  });
  controller.send('invalidateSession');
});
