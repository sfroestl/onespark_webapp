App.OutController = Ember.Controller.extend({
  isError: false,
  username: '',
  password: '',

  login: function() {
    console.log("OutController: Launched");
    console.log("OutController: Check username: " + this.get("username"));
    console.log("OutController: Check password: " + this.get("password"));

    console.log("Base64: " + encodeBase64(this.get("username"), this.get("password")));
    var basicAuth = encodeBase64(this.get("username"), this.get("password"));

    //usermodel api call
    if(!App.User.registerSessionUser(basicAuth)) {
      console.log("--> User is not registered!")
      this.set('isError', true);
    }
  }
});
