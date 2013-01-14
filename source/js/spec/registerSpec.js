	describe( "The RegisterController as blackbox test", function () {  

		var server;

		beforeEach(function() {
		    this.server = sinon.fakeServer.create();
		    registerController = App.RegisterController.create();
		});

		afterEach(function() {
			this.server.restore();
		});

		/* registers a valid user */
		it("should run for valid input", function(){
			this.server.respondWith("POST", "http://api.onespark.de/api/v1/users",
    			[200, {"Content-Type": "application/json"},
      			'{"user":{"id":17,"username":"awegawegwe","email":"awegwge@gmx.de","profile_id":17}}']);   

			//{"errors":{"username":["hasalreadybeentaken"]}}
		    registerController = App.RegisterController.create();

		    registerController.set("username", "bob");
		    registerController.set("email", "delete@gmx.de");
		    registerController.set("password", "asdasd");
		    registerController.set("password_confirmation", "asdasd");
		    registerController.register(); 

		    this.server.respond(); 

		    expect(registerController.getError()).toEqual(false);
		})

		/* registers a invalid user */
		it("should run for invalid input", function(){
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