import Ember from 'ember';
import DS from 'ember-data';
import Validator from 'ember-model-validator/mixins/model-validator';
import strength from 'password-strength';

const { Model, attr } = DS;
const { computed } = Ember;

/**
 * A simple user model.
 *
 * @module
 * @augments ember-data/Model
 * @augments ember-model-validator/mixins/model-validator
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
        validation(key, value, user) {
          return (user.get('passwordStrength.score') || 0) > 1;
        },
        // Strength report includes plain-English recommendations for improving
        // passwords.  These recommendations are returned as the validation
        // error message.
        message(key, value, user) {
          if (value) {
            const {
              warning,
              suggestions
            } = user.get('passwordStrength.feedback');
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
  }
});
