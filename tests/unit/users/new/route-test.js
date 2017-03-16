import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { run } = Ember;

moduleFor('route:users/new', 'Unit | Route | users/new', {
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
