
App.RegisterController = Ember.Controller.extend();
/*in progress
App.RegisterController.registerInformation = Ember.Object.create({

  username: "",
  password: "",
  password_confirmation: "",
  email: "",
  valid: function() {
    return !(
      this.get('username').length > 0 &&
      this.get('password') == this.get('password_confirmation') &&
      this.get('password').length > 0 &&
      this.get('email').length > 0
    );
  }.property("username","password","password_confirmation","email")

});*/
