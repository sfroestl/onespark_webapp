function serverMock() {
	var server =  sinon.fakeServer.create();
	server.autoRespond = true;
	
	
	/*	server.respondWith(function(request) {
			console.log("mocking missing for ",request.method, " on ",request.url, " full object:",request);
			request.respond(404,{ "Content-Type": "application/json" },"");
	});*/
	
	
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
	  if ((xhr.username!="bob" && xhr.password!="testbob")||(xhr.username!="alice" && xhr.password!="asdasd")) {
	    console.log("allowing access to",xhr.method,xhr.url);
	    if ("function" == typeof response)
		  response.appy(this,arguments);
		else
		  xhr.respond.apply(xhr,response);
	   } else {
		xhr.respond(401,{ "Content-Type": "application/json" },"HTTP BASIC: Access denied");
	   }
	};
};

server.respond("GET", new RegExp("/api/v1/user$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(user_1)]));
server.respond("GET", new RegExp("/api/v1/users/1$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(user_1)]));
server.respond("GET", new RegExp("/api/v1/users/2$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(user_2)]));
server.respond("PUT", new RegExp("/api/v1/users/1$"),authenticated_response(function(xhr) {
		var username = xhr.requestBody.match("user%5Busername%5D=([^&]+)(&|$)")[1];
		var email = xhr.requestBody.match("user%5Bemail%5D=([^&]+)(&|$)")[1];
		var newUser = {};
		$.extend(newUser, user_1);
		newUser[username]=username;
		newUser[email]=email;
		return [200,{ "Content-Type": "application/json" },JSON.stringify(newUser)];
}));
server.respond("DELETE", new RegExp("/api/v1/users/1$"),authenticated_response(function(xhr) {
		return [204,{ "Content-Type": "application/json" },""];
}));

server.respond("POST", new RegExp("/api/v1/users$"),function(xhr) {
  if (xhr.requestBody.match(/username%5D=bob/)) 
    xhr.respond(422, { "Content-Type": "application/json" }, '{"errors":{"username":["hasalreadybeentaken"]}}');
  else 
    xhr.respond(201, { "Content-Type": "application/json" }, JSON.stringify(user_2));
});



return server
};
