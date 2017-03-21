import Ember from 'ember';

/**
 * A simple user form component with fields for {@link module:app/user/model}.
 *
 * @module
 * @augments ember/Component
 * @example
 *  {{user/user-form user=model save=(action externalSave)}}
 */
export default Ember.Component.extend({
  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Trigger a bound `save` method when the form is submitted, passing the
     * form's user instance *if* the user instance is valid.
     *
     * @function actions:submit
     * @returns {undefined}
     */
    submit() {
      const user = this.get('user');
      if (user.validate()) {
        this.get('save')(user);
      }
    }
  }
});
