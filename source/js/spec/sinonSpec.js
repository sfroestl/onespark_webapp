


describe("fake server", function() {
 var server;


 beforeEach(function() {
    this.server = serverMock();
  });

  afterEach(function() {
    this.server.restore();
  });

 it("calls callback with deserialized data", function () {
    var callback = sinon.spy();
	


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
