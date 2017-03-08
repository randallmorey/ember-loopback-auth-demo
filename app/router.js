import Ember from 'ember';
import config from './config/environment';

/**
 * The Ember router.
 *
 * @module
 * @augments ember/Router
 */
const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
});

export default Router;
