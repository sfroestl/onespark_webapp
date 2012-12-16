App.ProfileController = Ember.Controller.extend({
	user: null,

	//update profile
	surname: '',
	city: '',
	about: '',
	forename: '',

	//delete account
	password_conf: '',

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

    	App.FlashMessage.create({text:"Profile successfully updated."});
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
	      	this.set('password_conf', '');
	      	App.FlashMessage.create({text:"Invalid password."});     	
	        console.log ("--> ERROR");
	      },

	      success: function(data) {
	      	this.set('password_conf', '');
	        console.log ("--> Success: 200");
	        App.session.logout();
	        App.FlashMessage.create({text:"Account successfully deleted."});  
	        App.router.send("afterDelete");
	      }
	    });
	},

	resetFields: function() {
		this.set('password_conf', '');
	}
});
