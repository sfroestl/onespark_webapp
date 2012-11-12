describe( "The user model", function () {  

	var user = null;

    //App = Ember.Application.create();

    beforeEach(function(){
        user = App.User.create();

    });

    afterEach(function(){
        user = null;
    });

	it("should have an get session token function", function(){
		expect(App.User.getSessionToken).toBeDefined();
	});

	it("should have an set session token function", function(){
		expect(App.User._setSessionToken).toBeDefined();
	});

	it("should have an deleteSessionToken function", function(){
		expect(App.User.deleteSessionToken).toBeDefined();
	});

	it("should have an isSignedIn function", function(){
		expect(App.User.isSignedIn).toBeDefined();
	});

	it("should have an registerSessionUser function", function(){
		expect(App.User.registerSessionUser).toBeDefined();
	});

	it("should have an getSessionUser function", function(){
		expect(App.User.getSessionUser).toBeDefined();
	});

	it("should have an createUser function", function(){
		expect(App.User.createUser).toBeDefined();
	});


	describe( "The logged out user", function () {  

		it("should be signed out before login", function(){
			expect(App.User.signedIn).toEqual(false);
			//expect(App.User.isSignedIn()).toEqual(false);
		});
	});

	describe( "The logged in user", function () {  

		beforeEach(function(){
        	App.User.registerSessionUser("Ym9iOnRlc3Rib2I=");
		});

		it("should be signed in after login", function(){
			expect(App.User.signedIn).toEqual(true);
			//expect(App.User.isSignedIn()).toEqual(true);
		});

		it("should be signed out again after logout", function(){
			App.User.deleteSessionToken();
			expect(App.User.signedIn).toEqual(false);
			//expect(App.User.isSignedIn()).toEqual(false);
		});
	});
});
