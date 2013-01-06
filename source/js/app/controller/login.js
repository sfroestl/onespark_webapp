App.LoginController = Ember.Controller.extend(
{
  username: '',
  password: '',
  oldPosition: '',

  login: function() {
    
  	App.session.login(this.get("username"),this.get("password"));

    this.set('username', '');
    this.set('password', '');

  	return this.get("oldPosition");
  },

  logout: function() {
  	App.session.logout();
  	this.set('password', '');
  }
});
