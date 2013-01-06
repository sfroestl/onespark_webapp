describe("The RegisterController", function(){

	beforeEach(function(){
       registerController = App.RegisterController.create();
       session = App.Session.create();
       loginController = App.LoginController.create();
    });

	it("should be defined", function(){
        expect(registerController).toBeDefined();
    });

    it("should have a register function", function(){
		expect(registerController.register).toBeDefined();
	});

	/*** Integration Test ***/

	describe( "its registration as integration test", function () {  

		it("should run for valid input", function(){
			//spyOn($, "ajax");

			registerController.set("username", "deleteTestUser");
			registerController.set("email", "deleteTestUser@gmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			registerController.register();

			waitsFor(function() {
		      return registerController.getComplete();
		    }, "Registration never completed", 10000);
		    
    		//expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("http://api.onespark.de/api/v1/users");
    		//expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("POST");
    		//expect($.ajax.mostRecentCall.args[0]["dataType"]).toEqual("json");

			runs(function() {
				expect(registerController.getError()).toEqual(false);
       		}); 
		});

		it("should run login for new user", function(){
			loginController.set("username", "deleteTestUser");
			loginController.set("password", "asdasd");
			loginController.login();

			waitsFor(function() {
				return App.get("session.sessionUser.isLoaded");
			}, "Session never completed", 10000);

			runs(function() {
				expect(App.get("session.sessionToken")).toEqual(encodeBase64("deleteTestUser", "asdasd"));
				expect(App.get("session.sessionUser")).not.toBe(null);
				//still not case sensitive?
				expect(App.get("session.sessionUser.username")).toEqual("deletetestuser");
				expect(App.get("session.sessionUser.email")).toEqual("deletetestuser@gmx.de");

				deleteTestUser();
		    });
		});
		

		it("should run for invalid input", function(){

			registerController.set("username", "bob");
			registerController.set("email", "testbob@gmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			registerController.register();

			waitsFor(function() {
		      return registerController.getComplete();
		    }, "Registration never completed", 10000);

			runs(function() {
				expect(registerController.getError()).toEqual(true);
    		});
		});
	});
});

/*** Remove user afterwards ***/

function deleteTestUser() {
	var base64 = encodeBase64("deleteTestUser", "asdasd");

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