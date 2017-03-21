import Ember from 'ember';

/**
 * A simple login form component with fields for {@link module:app/user/model}.
 *
 * @module
 * @augments ember/Component
 * @example
 *  {{user/login-form user=model login=(action externalLogin)}}
 */
export default Ember.Component.extend({
  // =actions

  /** @type {Object} */
  actions: {
    /**
     * Trigger a bound `login` method when the form is submitted, passing the
     * form's user instance *if* the user instance is valid, with only `email`
     * and `password` fields subject to validation.
     *
     * @function actions:submit
     * @returns {undefined}
     */
    submit() {
      const user = this.get('user');
      if (user.validate({only: ['email', 'password']})) {
        this.get('login')(user);
      }
    }
  }
});
