import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },
    authenticationSuccess: function() {
      this.transitionToRoute('portal');
    },
    authenticationFailure: function() {
      alert("wrong creds. probably.");
    }
  }
});
