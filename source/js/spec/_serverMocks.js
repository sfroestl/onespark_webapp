function serverMock() {
	var server =  sinon.fakeServer.create();
	
var user_1 =  '{"user": \
  {\
    "id":1,\
    "username":"bob",\
    "email":"bob@testme.com",\
    "profile_id":1,\
    "owned_project_ids":[],"collaborated_project_ids":[],"project_coworker_ids":[],"contact_ids":[]\
  }\
}';
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

server.respond("GET", "http://api.onespark.de/api/v1/user",authenticated_response([200,{ "Content-Type": "application/json" },user_1]));
server.respond("POST", "http://api.onespark.de/api/v1/users",function(xhr) {
  if (xhr.requestBody.match(/username%5D=bob/)) 
    xhr.respond(422, { "Content-Type": "application/json" }, '{"errors":{"username":["hasalreadybeentaken"]}}');
  else 
    xhr.respond(200, { "Content-Type": "application/json" }, user_1);
});
    

return server
};
