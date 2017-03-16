import Ember from 'ember';

/**
 * The registration controller handles the `saveUser` action
 * and post-success redirect.
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Controller.extend({
  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Validates the user instance.  If valid, saves the user.
     * If save is successful, redirects to the `application` route.
     * If save fails, does nothing.
     *
     * @function actions:saveUser
     * @param {module:app/user/model} user
     * @returns {undefined}
     */
    saveUser(user) {
      if (user.validate()) {
        user.save().then(() => {
          this.transitionToRoute('application');
        });
      }
    }
  }
});
