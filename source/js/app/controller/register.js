
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',

  register: function() {
    console.log("OutController: Launched");
    console.log("OutController: Check username: " + this.get("username"));
    console.log("OutController: Check email: " + this.get("email"));
    console.log("OutController: Check password: " + this.get("password"));
    console.log("OutController: Check password_confirmation: " + this.get("password_confirmation"));

    //var user = App.store.createRecord(App.User,  { name: this.get("username"), this.get("email"), this.get("password"), this.get("password_confirmation")});

    console.log("OutController: Check created user: " + user);
  }
});