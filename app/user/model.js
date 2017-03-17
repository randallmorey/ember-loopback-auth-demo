import Ember from 'ember';
import DS from 'ember-data';
import Validator from 'ember-loopback-auth-demo/mixins/model-validator';
import strength from 'password-strength';

const { Model, attr } = DS;
const { computed } = Ember;

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

  // =properties

  /**
   * Password strength report as returned by
   * [zxcvbn](https://github.com/dropbox/zxcvbn).
   *
   * @type {Object}
   */
  passwordStrength: computed('email', 'password', function () {
    const { email, password } = this.getProperties('email', 'password');
    return password && strength(password, [email]);
  }),

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
      length: {
        minimum: 10
      },
      custom: {
        // Strength is scored on a scale 0 - 4.
        // Password is valid if score is 2 or greater.
        validation(key, value, model) {
          return (model.get('passwordStrength.score') || 0) > 1;
        },
        // Strength report includes plain-English recommendations for improving
        // passwords.  These recommendations are returned as the validation
        // error message.
        message(key, value, model) {
          if (value) {
            const {
              warning,
              suggestions
            } = model.get('passwordStrength.feedback');
            let message = [];
            if (warning) {
              message.push(`${warning}.`);
            }
            for (let i = 0; i < suggestions.length; i++) {
              message.push(suggestions[i]);
            }
            return message.join(' ');
          }
        }
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
