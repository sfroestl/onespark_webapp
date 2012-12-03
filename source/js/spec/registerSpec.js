describe("TheregisterControllerontroller", function(){

	beforeEach(function(){
       registerController = App.RegisterController.create();

       //router = App.Router.create();
       //router.transitionTo('loggedOut.register');
        
    });

	it("should be defined", function(){
        expect(registerController).toBeDefined();
    });

   	it("should have a register function", function(){
		expect(registerController.register).toBeDefined();
	});

	describe( "its validation", function () {  
		it(" should run for password missmatch", function(){
			expect(registerController.isError).toEqual(false);

			registerController.set("username", "karl");
			registerController.set("email", "karl@gmx.de");
			registerController.set("password", "aasdasd");
			registerController.set("password_confirmation", "asdasd");

			registerController.register();

			expect(registerController.error_msg).toEqual("Your passwords don't match.");
			expect(registerController.isError).toEqual(true);
		});

		it(" should run for empty textfields", function(){
			expect(registerController.isError).toEqual(false);

			registerController.set("username", "");
			registerController.set("email", "karl@gmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			registerController.register();

			expect(registerController.error_msg).toEqual("Fill up everything.");
			expect(registerController.isError).toEqual(true);
		});

		it(" should run for empty invalid emails", function(){
			expect(registerController.isError).toEqual(false);

			registerController.set("username", "karl");
			registerController.set("email", "karlgmx.de");
			registerController.set("password", "asdasd");
			registerController.set("password_confirmation", "asdasd");

			registerController.register();

			expect(registerController.error_msg).toEqual("Invalid Email address.");
			expect(registerController.isError).toEqual(true);
		});

		it(" should run for empty too short passwords", function(){
			expect(registerController.isError).toEqual(false);

			registerController.set("username", "karl");
			registerController.set("email", "karl@gmx.de");
			registerController.set("password", "asd");
			registerController.set("password_confirmation", "asd");

			registerController.register();

			expect(registerController.error_msg).toEqual("Password to short.");
			expect(registerController.isError).toEqual(true);
		});
	});

	describe( "its registration with ajax mock", function () {  
		it(" should run for valid input", function(){
			spyOn($, "ajax");
		    register("karl1", "karl1@gmx.de", "asdasd", "asdasd");
    		expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("/users");
		});
	});

	describe( "its registration as integration test with real ajax", function () {  
		it(" should run for valid input", function(){
			spyOn($, "ajax");

			//registerController.set("username", "karl1");
			//registerController.set("email", "karl1@gmx.de");
			//registerController.set("password", "asdasd");
			//registerController.set("password_confirmation", "asdasd");

		   	var user = App.store.createRecord(App.User,  { username: "karl1", email: "karl1@gmx.de", password: "asdasd", password_confirmation: "asdasd"});
            App.store.commit();
		    
    		expect($.ajax.mostRecentCall.args[0]["url"]).toEqual("http://api.onespark.de/api/v1/users");
		});
	});
});


//mock for ajax backend connection
function register(username, email, password, password_confirmation) {
    $.ajax({
        type: "POST",
        url: "/users",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {"user":{"username":username,"email":email,"password":password,"password_confirmation":password_confirmation}}
    });
}