App.LoginController = Ember.Controller.extend(
{
  username: '',
  password: '',
  oldPosition: '',
  login: function() {
    console.log("OutController: Launched");
    console.log("OutController: Check username: " + this.get("username"));
    console.log("OutController: Check password: " + this.get("password"));
	console.log(this);
    console.log("Base64: " + encodeBase64(this.get("username"), this.get("password")));
	App.session.login(this.get("username"),this.get("password"));
	return this.get("oldPosition");
  }
});
