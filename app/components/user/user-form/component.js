import Ember from 'ember';

/**
 * A simple user form component with fields for {@link module:app/user/model}.
 *
 * @module
 * @augments ember-data/Model
 * @augments ember-loopback-auth-demo/mixins/model-validator
 * @example
 *  {{user/user-form model=user save=(action externalSave)}}
 */
export default Ember.Component.extend({
  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Trigger a bound `save` method when the form is submitted, passing the
     * form's model instance.
     *
     * @function actions:submit
     * @returns {undefined}
     */
    submit() {
      this.get('save')(this.get('model'));
    }
  }
});
