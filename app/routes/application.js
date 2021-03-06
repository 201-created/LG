import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    return this.get('toriiSession').fetch('lion-guardians').catch(function(){
      // no-op. It's ok if they're not logged in
    });
  },
  actions: {
    logout: function(){
      var route = this;

      this.get('toriiSession').close('lion-guardians').then(function(){
        route.transitionTo('login');
      });
    },

    error: function(e){
      if (window.Rollbar) { window.Rollbar.error(e); }
      return true;
    },

    viewImageSet: function(imageSet) {
      if (imageSet) {
        this.transitionTo('image-set', imageSet);
      }
    }
  }
});
