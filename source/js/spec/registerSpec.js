describe("The RegisterController", function(){

	beforeEach(function(){
       registerController = App.RegisterController.create();

       //router = App.Router.create();
       //router.transitionTo('loggedOut.register');
        
    });

	it("should be defined", function(){
        expect(registerController).toBeDefined();
    });

    it("should register function", function(){
		expect(registerController.register).toBeDefined();
	});

   	it("should isEmptyValidation function", function(){
		expect(registerController.isEmptyValidation).toBeDefined();
	});

	it("should have a matchPwValidation function", function(){
		expect(registerController.matchPwValidation).toBeDefined();
	});

	it("should have a pwLengthValidation function", function(){
		expect(registerController.pwLengthValidation).toBeDefined();
	});

	it("should have a isEmailValid function", function(){
		expect(registerController.isEmailValid).toBeDefined();
	});

	describe( "its validation", function () {  
		
		it(" should run for password missmatch", function(){
			registerController.set("username", "karl");
			registerController.set("email", "karl@gmx.de");
			registerController.set("password", "aasdasd");
			registerController.set("password_confirmation", "asdasd");
			expect(registerController.matchPwValidation()).toEqual(true);
		});

		it(" should run for empty textfields", function(){
			registerController.set("username", "");
			registerController.set("email", "karl@gmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			expect(registerController.isEmptyValidation()).toEqual(true);
		});

		it(" should run for invalid emails", function(){
			registerController.set("username", "karl");
			registerController.set("email", "karlgmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			expect(registerController.isEmailValid()).toEqual(true);
		});

		it(" should run for too short passwords", function(){
			registerController.set("username", "karl");
			registerController.set("email", "karl@gmx.de");
			registerController.set("password", "asd");
			registerController.set("password_confirmation", "asd");

			expect(registerController.pwLengthValidation()).toEqual(true);
		});
	});

	describe( "its registration as integration test", function () {  
		it(" should run for valid input", function(){
			spyOn($, "ajax");

			registerController.set("username", "karloooos1");
			registerController.set("email", "karlooooos1@gmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			registerController.register();

		   	//var user = App.store.createRecord(App.User,  { username: "karl3", email: "karl3@gmx.de", password: "asdasd", password_confirmation: "asdasd"});
            //App.store.commit();
		    
    		expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("http://api.onespark.de/api/v1/users");
    		expect($.ajax.mostRecentCall.args[0]["type"]).toEqual("POST");
    		expect($.ajax.mostRecentCall.args[0]["dataType"]).toEqual("json");
		});
	});
});