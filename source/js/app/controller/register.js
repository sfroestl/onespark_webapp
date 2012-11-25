
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

    var user = App.store.createRecord(App.User,  { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation")});
    App.store.commit();

    console.log("OutController: Check created user: " + user);
  }
});