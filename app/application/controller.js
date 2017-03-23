import Ember from 'ember';

const { inject: { service } } = Ember;

/**
 * Application controller is mostly a simple holder for the session service so
 * that the application template can determine if there is an
 * authetnicated session.
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // =dependencies

  /**
   * @see module:ember-simple-auth-loopback/services/session
   * @type {Object}
   */
  session: service('session'),

  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Calls `invalidate` on the session service.
     *
     * @function actions:invalidateSession
     * @returns {undefined}
     */
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
