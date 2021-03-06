describe( "The session model", function () {  

	session = App.get("session");
	loginController = App.LoginController.create();

	it("should be defined", function(){
		expect(session).toBeDefined();
	});

	it("should have a login function", function(){
		expect(session.login).toBeDefined();
	});

	it("should have a logout function", function(){
		expect(session.login).toBeDefined();
	});

	it("should have a insertAuthenticationInRequest function", function(){
		expect(session.insertAuthenticationInRequest).toBeDefined();
	});

	it("should have a _storeCredentialsAsCookie function", function(){
		expect(session._storeCredentialsAsCookie).toBeDefined();
	});

	it("should have a _storeUserIdAsCookie function", function(){
		expect(session._storeUserIdAsCookie).toBeDefined();
	});

	it("should have a _findUserId function", function(){
		expect(session._findUserId).toBeDefined();
	});

	it("should have a _loadSessionUser function", function(){
		expect(session._loadSessionUser).toBeDefined();
	});

	/*** Integration Test ***/

	describe( "its logged in user as integration test", function () {  

		it("should be signed in after login", function(){

			loginController.set("username", "bob");
			loginController.set("password", "testbob");
			loginController.login();

			waitsFor(function() {
		      return App.get("session.sessionUser.isLoaded");
		    }, "Session never completed", 10000);

			runs(function() {
				expect(App.get("session.sessionToken")).toEqual(encodeBase64("bob", "testbob"));
				expect(App.get("session.sessionUser")).not.toBe(null);
				expect(App.get("session.sessionUserId")).toEqual(2);
				expect(App.get("session.sessionUser.username")).toEqual("bob");
				expect(App.get("session.sessionUser.email")).toEqual("bob@testme.com");
    		});
		});
	});
});
