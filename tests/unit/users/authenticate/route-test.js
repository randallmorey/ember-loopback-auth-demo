import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { run } = Ember;

moduleFor('route:users/authenticate', 'Unit | Route | users/authenticate', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function (assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it generates a new user instance', function (assert) {
  let route = this.subject();
  run(() => {
    const model = route.model();
    assert.ok(model);
    assert.equal(model.constructor.modelName, 'user');
  });
});

test('it should call rollbackAttributes on the model on transition', function (assert) {
  assert.expect(1);
  let route = this.subject({
    modelFor: function () {
      return Ember.Object.create({
        rollbackAttributes() {
          assert.ok(true, 'should call rollbackAttributes on the model');
        }
      });
    }
  });
  route.actions.willTransition.call(route);
});
