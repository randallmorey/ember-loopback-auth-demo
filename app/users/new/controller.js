import Ember from 'ember';

/**
 * The registration controller handles the `saveUser` action
 * and post-success redirect.
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Saves the passed user instance.
     * If save is successful, redirects to the `application` route.
     * If save fails, does nothing.
     *
     * @function actions:saveUser
     * @param {module:app/user/model} user
     * @returns {undefined}
     */
    saveUser(user) {
      user.save().then(() => {
        this.transitionToRoute('application');
      });
    }
  }
});
