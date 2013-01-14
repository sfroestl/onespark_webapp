	describe( "The RegisterController as blackbox test", function () {  

		var server;

		beforeEach(function() {
		    //this.server = sinon.fakeServer.create();
		    this.server = serverMock();
		    registerController = App.RegisterController.create();
		});

		afterEach(function() {
			this.server.restore();
		});

		/* registers a valid user */
		it("should run for valid input", function(){

		    registerController.set("username", "alice");
		    registerController.set("email", "alice@gmx.de");
		    registerController.set("password", "asdasd");
		    registerController.set("password_confirmation", "asdasd");
		    registerController.register(); 

		    this.server.respond(); 

		    expect(registerController.getError()).toEqual(false);
		})

		/* registers a invalid user */
		it("should run for invalid input", function(){

		    registerController.set("username", "bob");
		    registerController.set("email", "delete@gmx.de");
		    registerController.set("password", "asdasd");
		    registerController.set("password_confirmation", "asdasd");
		    registerController.register(); 

		    this.server.respond(); 

		    expect(registerController.getError()).toEqual(true);
		})
	})