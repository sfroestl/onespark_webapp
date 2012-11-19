App.ApplicationController = Ember.ObjectController.extend({
    passwordNew: null,
	usernameNew: null,
	navigation: null,
	body: null,
	content: function() {
		return App.get("session")
	}.property("App.session"),
	login: function() {
		this.set("content.username",this.get("usernameNew"));
		this.set("content.password",this.get("passwordNew"));
	}
});
