App.ProfileController = Ember.ObjectController.extend({

	user: null,

	enterProfile: function() {

		console.log("Test3" + user.get('profile').forename);
	}
});
