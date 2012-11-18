App.ApplicationController = Ember.ObjectController.extend({
    	passwordNew: null,
	usernameNew: null,
	login: function() {
		this.set("content.username",this.get("usernameNew"));
		this.set("content.password",this.get("passwordNew"));
	}
});
