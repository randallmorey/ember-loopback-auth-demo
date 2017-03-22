import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:users/authenticate', 'Unit | Controller | users/authenticate', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('its `loginUser` action calls `authenticate` on the session service, passing the user instance', function (assert) {
  const controller = this.subject({
    session:{
      authenticate(authenticatorName, passedUser) {
        assert.equal(passedUser.email, 'test@foo.com');
        assert.equal(passedUser.password, 'password1234');
      }
    }
  });
  const user = {
    email: 'test@foo.com',
    password: 'password1234'
  };
  controller.send('loginUser', user);
});
