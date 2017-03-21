import Ember from 'ember';
import Loopback from 'ember-simple-auth-loopback/authenticators/loopback';
import config from '../config/environment';

const { inject: { service } } = Ember;

/**
 * Authenticates with a Loopback API server.
 *
 * @module
 * @augments ember-simple-auth-loopback/authenticators/loopback
 */
export default Loopback.extend({
  // =dependencies

  /** @type {Object} */
  store: service(),

  // =attributes

  /**
   * @override
   * @type {String}
   */
  loginEndpoint: config.api.host + '/' + config.api.namespace + '/users/login',

  /**
   * Authenticates the session with credentials from the specified user instance
   * by delegating to the `_super` method.  If authentication fails, a generic
   * error message is applied to the user model instance's base field.
   * It is recommended to use a disposable, unsaved user instance and to
   * destroy it after a successful authentication, or upon navigating away from
   * the route used for login.
   *
   * @see module:ember-simple-auth-loopback/authenticators/loopback~authenticate
   * @override
   * @function
   * @param {Object} user A user model instance
   * @returns {Promise} A promise that when it resolves results in the session
   *   becoming authenticated
   */
  authenticate(user, scope) {
    const { email, password } = user.getProperties('email', 'password');
    const promise = this._super(email, password, scope);
    promise.catch(() => {
      const recordForErrors = user.adapterDidInvalidate ?
        user : user._internalModel;
      this.get('store').recordWasInvalid(recordForErrors, {
        base: ['login failed']
      });
    });
    return promise;
  }
});
