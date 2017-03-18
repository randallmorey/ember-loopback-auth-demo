import DS from 'ember-data';
import config from '../config/environment';

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
  host: config.api.host,

  /**
   * @override
   * @type {String}
   */
  namespace: config.api.namespace
});
