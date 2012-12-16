App.ProfileController = Ember.Controller.extend({
	user: null,

	//delete account
	password_conf: '',	

	update: function() {
		var profile = App.get("session.sessionUser.profile");
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
