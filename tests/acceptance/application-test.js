import { test } from 'qunit';
import moduleForAcceptance from 'ember-loopback-auth-demo/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'ember-loopback-auth-demo/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | application');

test('visiting /', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(currentURL(), '/');
  });
});

test('users/new link is visible when unauthenticated', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('.link-registration:visible').length, 1);
  });
});

test('users/new link is not visible when authenticated', function (assert) {
  visit('/');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(find('.link-registration:visible').length, 0);
  });
});

test('users/authenticate link is visible when unauthenticated', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('.link-authenticate:visible').length, 1);
  });
});

test('users/authenticate link is not visible when authenticated', function (assert) {
  visit('/');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(find('.link-authenticate:visible').length, 0);
  });
});

test('session invalidation link is not visible when unauthenticated', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(find('.link-session-invalidation:visible').length, 0);
  });
});

test('session invalidation link is visible when authenticated', function (assert) {
  visit('/');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(find('.link-session-invalidation:visible').length, 1);
  });
});

test('user is redirected to root / after authenticating', function (assert) {
  visit('/login');
  authenticateSession(this.application);
  andThen(function () {
    assert.equal(currentURL(), '/');
  });
});

test('user is redirected to root / after invalidating the session', function (assert) {
  visit('/');
  authenticateSession(this.application);
  click('.link-session-invalidation');
  andThen(function () {
    assert.equal(currentURL(), '/');
  });
});
