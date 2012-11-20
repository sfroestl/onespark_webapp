//= require ../../libs/jquery/jquery.cookie.js
App.Session = Ember.Object.extend({
	username: null,
	password: null,
	sessionUser: null,
    SessionUserRaw: null,

  signedIn: function() {
	  return !!this.get("sessionUser.isLoaded");
  }.property('sessionUser.isLoaded'),

  sessionToken: function() {
	  return encodeBase64(this.get("username"), this.get("password"));
  }.property('username','password'),
  
  // Helper methods to speed things up
  login: function(user,pw) {
    this.setProperties({username:user,password:pw});
  },
  logout: function() {
	this.setProperties({username:null,password:null});
  },

  
  insertAuthenticationInRequest: function(data) {
	token = this.get("sessionToken");
	if (!token) return data;
	data.headers || (data.headers = {});
    data.headers['Authorization'] = token;
    return data;
  },  
  
  // creates a cookie with sessionToken
  _storeAsCookie: function(basicAuth) {
    var token = this.get("sessionToken");
    if (token)
		$.cookie("sessionToken", token)
	else
		$.removeCookie("sessionToken")
  }.observes("sessionToken"),




  _findUser: function() {
	ses = this;
	ses.set("sessionUser",null);
	if (!ses.get("sessionToken")) return; //don't request when not logged in
    Ember.run.next( function() {
		basicAuth = ses.get("sessionToken");
		console.log("reading current user");
		$.ajax({
		  url: 'http://api.onespark.de/api/v1/user',
		  type: 'GET',
		  dataType: 'json',
		  accept: 'json',
		  headers: {'Authorization': ses.get("sessionToken")},
		  context: ses,

		  error: function(jqXHR, textStatus){
			console.log ("--> ERROR");
			App.router.send("unauthorizedRequest");
		  },

		  success: function(data) {
			// store session
			this.set("sessionUserRaw",data);
			var id = data.auth_user.id;
			console.log("id"+id);
			this.set("sessionUser",App.store.find(App.User,id));
			App.router.send("loginComplete");
			console.log ("--> Success: 200");
			console.log("--> User " + data.username + " is logged in.");
		  }
		});
	});
  }.observes("sessionToken")

});
App.session = App.Session.create();
App.session.setProperties(decodeBase64Credentials($.cookie("sessionToken")));
