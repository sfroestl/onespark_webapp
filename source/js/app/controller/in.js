App.InController = Ember.Controller.extend({
  sessionUser: null,

  logout: function() {
    App.User.deleteSessionToken();
  }

});
