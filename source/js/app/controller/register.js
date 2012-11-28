
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',

  register: function() {
    
    var user = App.store.createRecord(App.User,  { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation")});
    App.store.commit();

    this.set('username', '');
  	this.set('password', '');
  	this.set('email', '');
  	this.set('password_confirmation', '');

    App.router.send("goToLogin");
  }
});