describe( "The session model", function () {  

	var session = App.Session.create();

    //App = Ember.Application.create();

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

	describe( "The logged out user", function () {  

		it("should be signed out before login", function(){
			expect(session.sessionUser).toEqual(null);
			//expect(App.User.isSignedIn()).toEqual(false);
		});
	});

	describe( "The logged in user", function () {  

		beforeEach(function(){
        	session.login("bob", "testbob");
		});

		it("should be signed in after login", function(){
			console.log("SessionUser ist: " + session.sessionUser);
			//to Do
		});

		it("should be signed out again after logout", function(){
			//to Do
		});
	});
});
