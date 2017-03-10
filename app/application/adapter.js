import DS from 'ember-data';
import ENV from 'ember-loopback-auth-demo/config/environment';

/**
 * The application adapter interacts with a JSON API server.
 *
 * @module
 * @augments ember-data/adapters/json-api
 */
export default DS.JSONAPIAdapter.extend({
  // =attributes

  /**
   * @override
   * @type {String}
   */
  host: ENV.api.host,

  /**
   * @override
   * @type {String}
   */
  namespace: ENV.api.namespace
});
