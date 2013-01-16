	describe( "The LoginController as blackbox test", function () {  

		var server;
		
		beforeEach(function() {
		    this.server = serverMock();
		    //this.server = sinon.fakeServer.create();
		    loginController = App.LoginController.create();
		});

		afterEach(function() {
			this.server.restore();
		});

		/* login a valid user */
		it("should run for valid input", function(){
			
			console.log("wurst");
			//this.server.respondWith("GET", "http://api.onespark.de/api/v1/user",
    		//	[200, {"Content-Type": "application/json"},
      		//	'{"user":{"id":2,"username":"bob","email":"bob@testme.com","profile":{"id":2,"forename":"foo","surname":"bar","city":"foobar","about":"here","avatar_url":null,"user_id":2},"owned_project_ids":[4,5,10,11],"collaborated_project_ids":[1,3],"contact_ids":[67,76,54,60,65,63]}}']);

      		//this.server.respondWith("GET", "http://api.onespark.de/api/v1/users/2",
    		//	[200, {"Content-Type": "application/json"},
      		//	'{"user":{"id":2,"username":"bob","email":"bob@testme.com","profile_id":2,"owned_project_ids":[4,5,10,11],"collaborated_project_ids":[1,3],"project_coworker_ids":[6,1],"outContacts":[67,76,54,60,65,63],"inContacts":[68,75,53,59,66,64]}}']);   
		    runs(function() {
				loginController.set("username", "bob");
				loginController.set("password", "testbob");
				loginController.login();
			});
			waitsFor(function() {
				return App.get("session.signedIn");
			}, "login", 5000);
		    runs(function() {
				console.log("wurst2");			
				expect(App.get("session.sessionToken")).toEqual(encodeBase64("bob", "testbob"));
				expect(App.get("session.sessionUser")).not.toBe(null);
				expect(App.get("session.sessionUserId")).toEqual(1);
				expect(App.get("session.sessionUser.username")).toEqual("bob");
				expect(App.get("session.sessionUser.email")).toEqual("bob@testme.com");
			});
		})

		/* logout user */
		it("should be signed out again after logout", function(){
			loginController.logout();
			
			expect(App.get("session.username")).toEqual(null);
			expect(App.get("session.password")).toEqual(null);
			expect(App.get("session.sessionToken")).toEqual(null);
			expect(App.get("session.sessionUser")).toEqual(null);
			expect(App.get("session.sessionUserId")).toEqual(null);

			expect(App.get("session.sessionUser.isLoaded")).toEqual(null);
		});
	})
