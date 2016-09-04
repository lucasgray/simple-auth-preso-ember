import Ember from 'ember';
import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";

export default ESASession.extend({

  store: Ember.inject.service(),

  currentUser: Ember.computed('isAuthenticated', function() {

    console.log('hello')

    if (this.get('isAuthenticated')) {
      const promise = this.get('store').queryRecord('team', {isCurrent: true})
      return DS.PromiseObject.create({ promise: promise });
    }
  })

});
