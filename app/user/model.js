import DS from 'ember-data';
import Validator from 'ember-loopback-auth-demo/mixins/model-validator';

const { Model, attr } = DS;

/**
 * A simple user model.
 *
 * @module
 * @augments ember-data/Model
 * @augments ember-loopback-auth-demo/mixins/model-validator
 */
export default Model.extend(Validator, {
  // =attributes

  /** @type {String} */
  email: attr('string'),

  /** @type {String} */
  emailConfirmation: attr('string'),

  /** @type {String} */
  password: attr('string'),

  /** @type {String} */
  passwordConfirmation: attr('string'),

  // =validations

  /**
   * Validations declarations.
   *
   * @type {Object}
   */
  validations: {
    email: {
      presence: true,
      email: true
    },
    emailConfirmation: {
      match: {
        attr: 'email'
      }
    },
    password: {
      presence: true,
      mustContainCapital: true,
      mustContainLower: true,
      mustContainNumber: true,
      mustContainSpecial: true,
      length: {
        minimum: 8
      }
    },
    passwordConfirmation: {
      match: {
        attr: 'password'
      }
    }
  },

  // =methods

  /**
   * Overrides default `save` method to guarantee that `password` and
   * `passwordConfirmation` fields are nulled after save, regardess of success.
   *
   * @override
   * @function
   * @returns {Promise}
   */
  save() {
    const saved = this._super(...arguments);
    saved.finally(() => {
      this.setProperties({
        password: null,
        passwordConfirmation: null
      });
    });
    return saved;
  }
});
