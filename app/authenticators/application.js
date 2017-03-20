import Loopback from 'ember-simple-auth-loopback/authenticators/loopback';
import config from '../config/environment';

/**
 * Authenticates with a Loopback API server.
 *
 * @module
 * @augments ember-simple-auth-loopback/authenticators/loopback
 */
export default Loopback.extend({
  // =attributes

  /**
   * @override
   * @type {String}
   */
  loginEndpoint: config.api.host + '/' + config.api.namespace + '/users/login'
});
