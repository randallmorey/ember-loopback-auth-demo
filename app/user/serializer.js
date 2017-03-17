import DS from 'ember-data';

/**
 * The user serializer is configured to omit "confirmation" fields from
 * serialized payloads, as these should not be sent in API requests.
 *
 * @module
 * @augments ember-data/JSONAPISerializer
 */
export default DS.JSONAPISerializer.extend({
  // =attributes

  /** @type {Object} */
  attrs: {
    /** Omit field from serialized payload. @type {Object} */
    emailConfirmation: { serialize: false },
    /** Omit field from serialized payload. @type {Object} */
    passwordConfirmation: { serialize: false }
  }
});
