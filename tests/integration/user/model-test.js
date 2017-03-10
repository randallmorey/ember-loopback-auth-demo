import setupStore from 'ember-loopback-auth-demo/tests/helpers/store';
import User from 'ember-loopback-auth-demo/user/model';

import Ember from 'ember';

import {module, test} from 'qunit';

const { run } = Ember;

var env;
var user;
var deferred;

module('Integration | Model | user', {
  beforeEach() {
    env = setupStore({ user: User });
    deferred = Ember.RSVP.defer();
    env.adapter.createRecord = function () {
      return deferred.promise;
    };
    run(function () {
      user = env.store.createRecord('user', {
        email: 'test@foo.com',
        emailConfirmation: 'test@foo.com',
        password: '1234ABcd++',
        passwordConfirmation: '1234ABcd++'
      });
    });
  },

  afterEach() {
    run(env.container, 'destroy');
  }
});

test('it resolves save on success', function (assert) {
  run(function () {
    var saved = user.save();

    // `save` returns a PromiseObject which allows to call get on it
    assert.equal(saved.get('id'), undefined);

    deferred.resolve({ id: 123 });
    saved.then(function (model) {
      assert.ok(true, 'save operation was resolved');
      assert.equal(saved.get('id'), 123);
      assert.equal(model, user, 'resolves with the model');
    });
  });
});

test('it nulls password and passwordConfirmation on save success', function (assert) {
  run(function () {
    user.setProperties({
      password: '1234ABcd++',
      passwordConfirmation: '1234ABcd++'
    });

    assert.equal(user.get('password'), '1234ABcd++');
    assert.equal(user.get('passwordConfirmation'), '1234ABcd++');

    var saved = user.save();

    deferred.resolve({ id: 123 });
    saved.then(function () {
      assert.ok(true, 'save operation was resolved');
      assert.equal(user.get('password'), null);
      assert.equal(user.get('passwordConfirmation'), null);
    });
  });
});

test('it nulls password and passwordConfirmation on save failure', function (assert) {
  run(function () {
    user.setProperties({
      password: '1234ABcd++',
      passwordConfirmation: '1234ABcd++'
    });

    assert.equal(user.get('password'), '1234ABcd++');
    assert.equal(user.get('passwordConfirmation'), '1234ABcd++');

    var saved = user.save();

    deferred.reject();
    saved.then(function () {
      assert.ok(true, 'save operation was resolved');
      assert.equal(user.get('password'), null);
      assert.equal(user.get('passwordConfirmation'), null);
    });
  });
});
