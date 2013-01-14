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

    this.server.respondWith("POST", "http://api.onespark.de/api/v1/users",
    [200, {"Content-Type": "application/json"},
      '{"user":{"id":17,"username":"awegawegwe","email":"awegwge@gmx.de","profile_id":17}}']);
    

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