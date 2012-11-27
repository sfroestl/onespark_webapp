App.UserController = Ember.Controller.extend({

		/*
	surname: null,
	city: null,
	about: null,
	forename: null,
	*/
	surname: '',
	city: '',
	about: '',
	forename: '',

	update: function() {
		var profile = App.get("session.sessionUser.profile");
		profile.set("surname", this.surname);
		profile.set("forename", this.forename);
		profile.set("city", this.city);
		profile.set("about", this.about);
    	App.store.commit();
	}
});