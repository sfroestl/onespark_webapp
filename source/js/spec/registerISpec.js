describe("The RegisterController as integration test", function(){


	beforeEach(function(){
       registerController = App.RegisterController.create();
    });

	/* registers a valid user */
	it("should run for valid input", function(){
		//spyOn($, "ajax");

		registerController.set("username", "delete");
		registerController.set("email", "delete@gmx.de");
		registerController.set("password", "asdasd");
		registerController.set("password_confirmation", "asdasd");
		registerController.register();

		/* waits for async registration */
		waitsFor(function() {
	      return registerController.getComplete();
	    }, "Registration never completed", 10000);

    	//expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("http://api.onespark.de/api/v1/users");
    	//expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("POST");
    	//expect($.ajax.mostRecentCall.args[0]["dataType"]).toEqual("json");

   		/* no errors expected */
		runs(function() {
			expect(registerController.getError()).toEqual(false);
  		}); 
	});

	/* deletes the fresh registered user */
	it("should delete a new user", function(){

		profileController = App.ProfileController.create();

		/* waits for async session user after login */
		waitsFor(function() {
			return App.get("session.sessionUser.isLoaded");
		}, "Session never completed", 10000);

		/* deltes user */
		runs(function() {
			profileController.set('password_conf', 'asdasd');
			profileController.deleteMe();
	    });

		/* waits for asyn delete */
		waitsFor(function() {
		    return profileController.getComplete();
		}, "Delete user never completed", 10000);

		/* tries to login */
		runs(function() {
			loginController.set("username", "delete");
			loginController.set("password", "asdasd");
			loginController.login();
		});

		/* expects error in session */
		waitsFor(function() {
			return App.get("session.isError");
		}, "Session never completed", 10000);

		/* expects no session user = user deleted successful*/
	   	runs(function() {
			expect(App.get("session.sessionUser")).toEqual(null);
			expect(App.get("session.sessionUserId")).toEqual(null);
	   	});
	});
	
	/* tries to register a invalid user */
	it("should run for invalid input", function(){

		registerController.set("username", "bob");
		registerController.set("email", "testbob@gmx.de");
		registerController.set("password", "asdasd");
		registerController.set("password_confirmation", "asdasd");
		registerController.register();

		/* waits for async registration */
		waitsFor(function() {
	      return registerController.getComplete();
	    }, "Registration never completed", 10000);

		/* errors expected */
		runs(function() {
			expect(registerController.getError()).toEqual(true);
    	});
	});
});

/*** Remove user afterwards ***/
//unused
function deleteTestUser() {
	var base64 = encodeBase64("delete", "asdasd");

	$.ajax({
	    async: true,
	    url: 'http://api.onespark.de/api/v1/user',
	    type: 'DELETE',
	    dataType: 'json',
	    accept: 'json',
	    headers: {'Authorization': base64},
	    error: function(jqXHR, textStatus){     	
	    	console.log ("--> ERROR");
	    },
	    success: function(data) {
	        console.log ("--> Success: 200");
	    }
	});
}