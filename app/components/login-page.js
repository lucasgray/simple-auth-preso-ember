import Ember from 'ember';

export default Ember.Component.extend({

  session: Ember.inject.service(),

  actions: {
    authenticate() {
      const { login, password } = this.getProperties('login', 'password');
      this.get('session').authenticate('authenticator:oauth2', login, password).then(() => {
        //do whatever you want here
        this.sendAction('authenticationSuccess');
      }, (err) => {
        console.log('fail', err);
        this.sendAction('authenticationFailure');
      });
    }
  }

});
