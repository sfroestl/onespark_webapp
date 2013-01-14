describe( "The profile controller", function () {  



	/*** Integration Test ***/


		/* login before */
		beforeEach(function(){
			profileController = App.ProfileController.create();
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

		/* first update */
		it("should update and show a user profile", function(){  	

	    	/* upate profile */
	    	runs(function() {
	    		profile = App.get("session.sessionUser.profile");
	    		profile.set("forename", "foooo");
	    		profile.set("surname", "barrr");
	    		profile.set("about", "hereee");
				profile.set("city", "foobarrr");
				user = App.get("session.sessionUser");
				user.set("email", "bob@testyou.com");
				profileController.update();
	    	});

	    	/* wait for async profile update */
	    	waitsFor(function() {
			    return (App.get("session.sessionUser.profile.isLoaded") && App.get("session.sessionUser.isLoaded"));
			}, "Profile never completed", 10000);

	    	/* match attributes & update profile again */
			runs(function() {
	    		expect(App.get("session.sessionUser.profile.forename")).toEqual("foooo");
	    		expect(App.get("session.sessionUser.profile.surname")).toEqual("barrr");
	    		expect(App.get("session.sessionUser.profile.about")).toEqual("hereee");
	    		expect(App.get("session.sessionUser.profile.city")).toEqual("foobarrr");
	    		expect(App.get("session.sessionUser.email")).toEqual("bob@testyou.com");
	    	});

	    	/* wait for async profile update */
	    	waitsFor(function() {
			    return (App.get("session.sessionUser.profile.isLoaded") && App.get("session.sessionUser.isLoaded"));
			}, "Profile never completed", 10000);
    	});
		
		/* second update */
		it("should update a second time and show a user profile", function(){  	

	    	/* upate profile */
	    	runs(function() {
	    		profile = App.get("session.sessionUser.profile");
	    		profile.set("forename", "foo");
	    		profile.set("surname", "bar");
	    		profile.set("about", "here");
				profile.set("city", "foobar");
				user = App.get("session.sessionUser");
				user.set("email", "bob@testme.com");
				profileController.update();
	    	});

	    	/* wait for async profile update */
	    	waitsFor(function() {
			    return (App.get("session.sessionUser.profile.isLoaded") && App.get("session.sessionUser.isLoaded"));
			}, "Profile never completed", 10000);

	    	/* match attributes & update profile again */
			runs(function() {
	    		expect(App.get("session.sessionUser.profile.forename")).toEqual("foo");
	    		expect(App.get("session.sessionUser.profile.surname")).toEqual("bar");
	    		expect(App.get("session.sessionUser.profile.about")).toEqual("here");
	    		expect(App.get("session.sessionUser.profile.city")).toEqual("foobar");
	    		expect(App.get("session.sessionUser.email")).toEqual("bob@testme.com");
	    	});

	    	/* wait for async profile update */
	    	waitsFor(function() {
			    return (App.get("session.sessionUser.profile.isLoaded") && App.get("session.sessionUser.isLoaded"));
			}, "Profile never completed", 10000);
    	});

		/* logout afterwards */
		afterEach(function(){
	      	loginController.logout();
			
			expect(App.get("session.username")).toEqual(null);
			expect(App.get("session.password")).toEqual(null);
			expect(App.get("session.sessionToken")).toEqual(null);
			expect(App.get("session.sessionUser")).toEqual(null);
			expect(App.get("session.sessionUserId")).toEqual(null);

			expect(App.get("session.sessionUser.isLoaded")).toEqual(null);
		});

});

	