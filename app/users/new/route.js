import Ember from 'ember';

/**
 * The registration route displays the new user form.
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({
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
  }
});
