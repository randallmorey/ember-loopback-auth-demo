import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

/**
 * The registration route displays the new user form.
 *
 * @module
 * @augments ember/Route
 * @augments ember-simple-auth/mixins/unauthenticated-route-mixin
 */
export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  // =methods

  /**
   * This route generates a newly-created user instance.
   *
   * @override
   * @function
   * @returns {module:app/user/model}
   */
  model() {
    return this.store.createRecord('user');
  },

  // =actions

  actions: {
    /**
     * Rollsback and removes the route's user model if it `isNew`.
     *
     * @function actions:willTransition
     * @returns {undefined}
     */
    willTransition() {
      const model = this.modelFor('users/new');
      if (model.get('isNew')) {
        // `rollbackAttributes` on a model that `isNew` both reverts all
        // attributes to their defaults and causes the record to be removed
        // from the store.
        // Thus, this is a good way to clean up new unsaved records that we
        // want to get rid of.
        model.rollbackAttributes();
      }
    }
  }
});
