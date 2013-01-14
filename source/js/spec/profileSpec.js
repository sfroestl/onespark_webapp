describe( "The ProfileController", function () {  

	/* login before */
	beforeEach(function(){
		profileController = App.ProfileController.create();
	    
		/* login bob */
	    loginController = App.LoginController.create();
	    loginController.set("username", "bob");
		loginController.set("password", "testbob");
		loginController.login();

		waitsFor(function() {
			return App.get("session.sessionUser.isLoaded");
		}, "Session never completed", 10000);

		/* get user profile */
	    runs(function() {
			App.router.goToUserProfile;
	    });
	    	
	    /* wait for async profile retrieval */
	    waitsFor(function() {
			return (App.get("session.sessionUser.profile.isLoaded") && App.get("session.sessionUser.isLoaded"));
		}, "Profile never completed", 10000);
	});

	it("should be defined", function(){
        expect(profileController).toBeDefined();
    });

    it("should have a update function", function(){
		expect(profileController.update).toBeDefined();
	});

    it("should have a delete function", function(){
		expect(profileController.deleteMe).toBeDefined();
	});

	describe( "as blackbox test", function () { 

		var server;

		beforeEach(function() {
			//this.server = sinon.fakeServer.create();
			this.server = serverMock();
		});

		afterEach(function() {
			this.server.restore();
		});

	   	it("should run update for valid input", function(){

	   		//this.server.respondWith("PUT", "http://api.onespark.de/api/v1/profiles/2",
	    	//		[200, {"Content-Type": "application/json"},
	      	//		'{"profile":{"id":2,"forename":"foooo","surname":"barrr","city":"foobarrr","about":"hereee","avatar_url":null,"user_id":2}}']);

	   		profile = App.get("session.sessionUser.profile");
		    profile.set("forename", "foooo");
		    profile.set("surname", "barrr");
		    profile.set("about", "hereee");
			profile.set("city", "foobarrr");
			user = App.get("session.sessionUser");
			user.set("email", "bob@testyou.com");
			profileController.update();

			expect(App.get("session.sessionUser.profile.forename")).toEqual("foooo");
		    expect(App.get("session.sessionUser.profile.surname")).toEqual("barrr");
		    expect(App.get("session.sessionUser.profile.about")).toEqual("hereee");
		    expect(App.get("session.sessionUser.profile.city")).toEqual("foobarrr");
		    expect(App.get("session.sessionUser.email")).toEqual("bob@testyou.com");
		})
	})
});