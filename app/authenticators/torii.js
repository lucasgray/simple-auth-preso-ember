import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

const { inject: { service } } = Ember;

export default Torii.extend({
  torii: service(),
  ajax: service(),

  authenticate() {
    const ajax = this.get('ajax');

    //this gives us a code
    return this._super(...arguments).then((data) => {
      console.log(data);
      //that we must ask our backend to turn in for an access token
      return ajax.request('http://localhost:4201/googleToken', {
        type:     'POST',
        dataType: 'json',
        data:     { 'grant_type': 'google_auth_code', 'authorization_code': data.authorizationCode }
      }).then((response) => {
        //then we should set up the normal ember-simple-auth session with OUR backend's access token
        return {
          access_token: response.access_token,
          provider: data.provider
        };
      });
    });
  }
});
