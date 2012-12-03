App.UserController = Ember.Controller.extend({

	//update profile
	surname: '',
	city: '',
	about: '',
	forename: '',

	//delete account
	password_conf: '',

	error_msg: '',
  	isError: false,

  	isSuccess: false,
  	success_msg: '',

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

    	this.set('isSuccess', true);
    	this.set('success_msg', 'Profile successfully updated.');
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
	      	App.router.userController.set('isError', true);
	      	this.set('password_conf', '');
	      	App.router.userController.set('error_msg', 'Invalid password.');
	        console.log ("--> ERROR");
	      },

	      success: function(data) {
	      	this.set('isError', false);
	      	this.set('password_conf', '');
	        console.log ("--> Success: 200");
	        App.session.logout();

	        App.router.loginController.set("success_msg","Account successfully deleted.");
	        App.router.loginController.set("isSuccess",true);
	        App.router.send("afterDelete");
	      }
	    });
	},

	/* ### Exit Helper ### */

  	//Reset Notifications
  	resetMsg: function() {
	    this.set('isError', false);
	    this.set('error_msg', '');

	    this.set('isSuccess', false);
	    this.set('success_msg', '');
  	},

  	//Reset Text Fields
  	resetFields: function() {
	    this.set('forename', '');
	    this.set('password_cnf', '');
	    this.set('city', '');
	    this.set('about', '');
	    this.set('surname', '');
  	}
});