import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { Promise } = Ember.RSVP;

moduleFor('controller:users/new', 'Unit | Controller | users/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('its `saveUser` action calls `validate` on the passed user instance', function (assert) {
  assert.expect(1);
  let controller = this.subject();
  let user = {
    validate() {
      assert.ok(true, 'user.validate() was called');
      return false;
    },
    save() {
      assert.notOk(true, 'user.save() should not be called');
    }
  };
  controller.send('saveUser', user);
});

test('its `saveUser` action calls `save` on the passed user instance if `validate` returns true', function (assert) {
  assert.expect(2);
  let controller = this.subject();
  let user = {
    validate() {
      assert.ok(true, 'user.validate() was called');
      return true;
    },
    save() {
      assert.ok(true, 'user.save() was called');
      return {
        then() {}
      };
    }
  };
  controller.send('saveUser', user);
});

test('its `saveUser` action transitions to the `application` route if the user instance validates and saves', function (assert) {
  const done = assert.async();
  assert.expect(1);
  let controller = this.subject();
  controller.transitionToRoute = function (routeName) {
    assert.equal(routeName, 'application', 'controller.transitionToRoute() was called');
    done();
  };
  let user = {
    validate() {
      return true;
    },
    save() {
      return new Promise(function (resolve) {
        resolve();
      });
    }
  };
  controller.send('saveUser', user);
});
