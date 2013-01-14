var user_1 =  '{"user": \
  {\
    "id":1,\
    "username":"bob",\
    "email":"bob@testme.com",\
    "profile_id":1,\
    "owned_project_ids":[76, 6, 61, 82, 92, 123, 120, 119, 78, 85],"collaborated_project_ids":[124,8],"project_coworker_ids":[55, 7],"contact_ids":[4, 9]\
  }\
}';


describe("fake server", function() {
 var server;


 beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });

  afterEach(function() {
    this.server.restore();
  });

 it("calls callback with deserialized data", function () {
    var callback = sinon.spy();
	
    this.server.respond("POST", "http://api.onespark.de/api/v1/users",function(xhr) {
		if (xhr.requestBody.match(/username%5D=bob/)) 
		  xhr.respond(422, { "Content-Type": "application/json" }, '{"errors":{"username":["hasalreadybeentaken"]}}');
		else 
		  xhr.respond(200, { "Content-Type": "application/json" }, user_1);
    });

//{"errors":{"username":["hasalreadybeentaken"]}}
    registerController = App.RegisterController.create();

    //registerController.bind('register', callback);

    registerController.set("username", "bob");
      registerController.set("email", "delete@gmx.de");
      registerController.set("password", "asdasd");
      registerController.set("password_confirmation", "asdasd");
    registerController.register(); 

    this.server.respond(); 

    expect(registerController.getError()).toEqual(true);
  });
});
