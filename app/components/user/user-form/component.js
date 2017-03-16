import Ember from 'ember';

export default Ember.Component.extend({
  user: null,
  actions: {
    saveUser() {
      this.get('saveUser')(this.get('user'));
    }
  }
});
