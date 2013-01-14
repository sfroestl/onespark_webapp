	describe( "The LoginController as blackbox test", function () {  

		var server;

		beforeEach(function() {
		    this.server = sinon.fakeServer.create();
		    loginController = App.LoginController.create();
		});

		afterEach(function() {
			this.server.restore();
		});

		/* login a valid user */
		it("should run for valid input", function(){
			this.server.respondWith("GET", "http://api.onespark.de/api/v1/user",
    			[200, {"Content-Type": "application/json"},
      			'{"auth_user":{"id":2,"username":"bob","email":"bob@testme.com","profile":{"id":2,"forename":"foo","surname":"bar","city":"foobar","about":"here","avatar_url":null,"user_id":2},"owned_project_ids":[4,5,10,11],"collaborated_project_ids":[1,3],"contact_ids":[67,76,54,60,65,63]}}']);

      			this.server.respondWith("GET", "http://api.onespark.de/api/v1/users/2",
    			[200, {"Content-Type": "application/json"},
      			'{"user":{"id":2,"username":"bob","email":"bob@testme.com","profile_id":2,"owned_project_ids":[4,5,10,11],"collaborated_project_ids":[1,3],"project_coworker_ids":[6,1],"outContacts":[67,76,54,60,65,63],"inContacts":[68,75,53,59,66,64]}}']);   
//{"auth_user":{"id":2,"username":"bob","email":"bob@testme.com","profile":{"id":2,"forename":"foo","surname":"bar","city":"foobar","about":"here","avatar_url":null,"user_id":2},"owned_project_ids":[4,5,10,11],"collaborated_project_ids":[1,3],"contact_ids":[67,76,54,60,65,63]}}

		    loginController.set("username", "bob");
			loginController.set("password", "testbob");
			loginController.login();

			//App.session.login("bob","testbob");

		    this.server.respond(); 
		    this.server.respond(); 

		   	expect(App.get("session.sessionToken")).toEqual(encodeBase64("bob", "testbob"));
			expect(App.get("session.sessionUser")).not.toBe(null);
			expect(App.get("session.sessionUserId")).toEqual(2);
			expect(App.get("session.sessionUser.username")).toEqual("bob");
			expect(App.get("session.sessionUser.email")).toEqual("bob@testme.com");
		})

		/* login a invalid user */
		xit("should run for invalid input", function(){
			this.server.respondWith("POST", "http://api.onespark.de/api/v1/users",
    			[422, {"Content-Type": "application/json"},
      			'{"errors":{"username":["hasalreadybeentaken"]}}']);   

		    registerController = App.RegisterController.create();

		    registerController.set("username", "bob");
		    registerController.set("email", "delete@gmx.de");
		    registerController.set("password", "asdasd");
		    registerController.set("password_confirmation", "asdasd");
		    registerController.register(); 

		    this.server.respond(); 

		    expect(registerController.getError()).toEqual(true);
		})
	})