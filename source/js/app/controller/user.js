App.UserController = Ember.Controller.extend({

	//update profile
	surname: '',
	city: '',
	about: '',
	forename: '',

	//delete account
	password_conf: '',

	//messages
	isError: false,

	loadContent: function() {
		this.surname = App.get("session.sessionUser.profile.surname");
		this.forename = App.get("session.sessionUser.profile.forename");
		this.city = App.get("session.sessionUser.profile.city");
		this.about = App.get("session.sessionUser.profile.about");
	},

	update: function() {
		var profile = App.get("session.sessionUser.profile");
		profile.set("surname", this.surname);
		profile.set("forename", this.forename);
		profile.set("city", this.city);
		profile.set("about", this.about);
    	App.store.commit();

    	this.set('surname', '');
    	this.set('forename', '');
    	this.set('city', '');
    	this.set('about', '');
	},
	deleteMe: function() {
		
		//Ember-Data my ass
		
		/*
		var user = App.get("session.sessionUser");
		console.log(user.get("id"));
		user.deleteRecord();
		App.store.commit();
		*/

		var base64 = encodeBase64(App.get("session.sessionUser.username"), this.password_conf);

		//old fashioned
		$.ajax({
	      async: true,
	      url: 'http://api.onespark.de/api/v1/user',
	      type: 'DELETE',
	      dataType: 'json',
	      accept: 'json',
	      headers: {'Authorization': base64},
	      context: this,

	      error: function(jqXHR, textStatus){
	      	this.set('isError', true);
	      	this.set('password_conf', '');
	        console.log ("--> ERROR");
	      },

	      success: function(data) {
	      	this.set('isError', false);
	        console.log ("--> Success: 200");
	        App.session.logout();
	        App.router.send("afterDelete");
	      }
	    });
	}
});