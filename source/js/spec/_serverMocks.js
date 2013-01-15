function serverMock() {
	var server =  sinon.fakeServer.create();
	server.autoRespond = true;
	
	
	/*	server.respondWith(function(request) {
			console.log("mocking missing for ",request.method, " on ",request.url, " full object:",request);
			request.respond(404,{ "Content-Type": "application/json" },"");
	});*/
	
	
//////////////////////////////////////////////////////////////
///////////Users /////////////////////////////////////////////
//////////////////////////////////////////////////////////////
var user_1 ={"user": 
  {
    "id":1,
    "username":"bob",
    "email":"bob@testme.com",
    "profile_id":1,
    "owned_project_ids":[],
    "collaborated_project_ids":[],
    "project_coworker_ids":[],
    "outContacts":[1,3],
    "inContacts":[2,4]
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
		console.log("blocking access to",xhr.method,xhr.url);
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

//////////////////////////////////////////////////////////////
///////////Profiles///////////////////////////////////////////
//////////////////////////////////////////////////////////////
var profile_1 ={
    "profile": {
        "id": 1,
        "forename": "Bob",
        "surname": "the Builder",
        "city": "Dresden",
        "about": "x",
        "avatar_url": null,
        "user_id": 1
    }
};
var profile_2 ={
    "profile": {
        "id": 2,
        "forename": "Alice",
        "surname": "Sampletester",
        "city": "Hamburg",
        "about": "Just another Test",
        "avatar_url": null,
        "user_id": 2
    }
};
server.respond("GET", new RegExp("/api/v1/profiles/1$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(profile_1)]));
server.respond("GET", new RegExp("/api/v1/profiles/2$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(profile_2)]));

//////////////////////////////////////////////////////////////
///////////Contacts //////////////////////////////////////////
//////////////////////////////////////////////////////////////
contact_1 ={
    "contact":
    {
        "id": 1,
        "user_id": 1,
        "contact_id": 2,
        "status": "pending"
    }
};
contact_2 ={
    "contact":
    {
        "id": 2,
        "user_id": 2,
        "contact_id": 1,
        "status": "requested"
    }
};
contact_3 ={
    "contact":
    {
        "id": 3,
        "user_id": 1,
        "contact_id": 3,
        "status": "accepted"
    }
};
contact_4 ={
    "contact":
    {
        "id": 4,
        "user_id": 3,
        "contact_id": 1,
        "status": "accepted"
    }
};
server.respond("GET", new RegExp("/api/v1/contacts/1$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(contact_1)]));
server.respond("GET", new RegExp("/api/v1/contacts/2$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(contact_2)]));
server.respond("GET", new RegExp("/api/v1/contacts/3$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(contact_3)]));
server.respond("GET", new RegExp("/api/v1/contacts/4$"),authenticated_response([200,{ "Content-Type": "application/json" },JSON.stringify(contact_4)]));

return server
};
