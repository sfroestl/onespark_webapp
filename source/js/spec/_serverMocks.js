function serverMock() {
	var server =  sinon.fakeServer.create();
	
var user_1 ={"user": 
  {
    "id":1,
    "username":"bob",
    "email":"bob@testme.com",
    "profile_id":1,
    "owned_project_ids":[],"collaborated_project_ids":[],"project_coworker_ids":[],"contact_ids":[]
  }
};
var user_2 ={"user": 
  {
    "id":2,
    "username":"alice",
    "email":"alice@testme.com",
    "profile_id":2,
    "owned_project_ids":[],"collaborated_project_ids":[],"project_coworker_ids":[],"contact_ids":[]
  }
};
var authenticated_response = function(response) {
	return function (xhr) {
	  if (xhr.username!="bob" && xhr.password!="testbob") 
		xhr.respond(401,{ "Content-Type": "application/json" },"HTTP BASIC: Access denied");
	  else
		if ("function" == typeof response)
		  response.appy(this,arguments);
		else
		  xhr.respond.apply(this,response);
	};
};

server.respond("GET", "http://api.onespark.de/api/v1/user",authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(user_1)]));
server.respond("GET", "http://api.onespark.de/api/v1/users/1",authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(user_1)]));
server.respond("PUT", "http://api.onespark.de/api/v1/users/1",authenticated_response(function(xhr) {
		var username = xhr.requestBody.match("user%5Busername%5D=([^&]+)(&|$)");
		var email = xhr.requestBody.match("user%5Bemail%5D=([^&]+)(&|$)");
		var newUser = {};
		$.extend(newUser, user_1);
		return [200,{ "Content-Type": "application/json" },JSON.stringify(newUser)];
}));
server.respond("DELETE", "http://api.onespark.de/api/v1/users/1",authenticated_response(function(xhr) {
		return [204,{ "Content-Type": "application/json" },""];
}));

server.respond("POST", "http://api.onespark.de/api/v1/users",function(xhr) {
  if (xhr.requestBody.match(/username%5D=bob/)) 
    xhr.respond(422, { "Content-Type": "application/json" }, '{"errors":{"username":["hasalreadybeentaken"]}}');
  else 
    xhr.respond(201, { "Content-Type": "application/json" }, JSON.stringify(user_2));
});
    

return server
};
