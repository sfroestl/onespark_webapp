//= require ../../libs/jquery/jquery.cookie.js
App.Session = Ember.Object.extend({
	username: null,
	password: null,
	sessionUser: null,
    sessionUserId: null,
    adapter:null,
	store: null,
	
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
  
  recreateStore: function() {
	var adapter = this.get("adapter");
	if (!adapter) {
		store = null;
		return;
	}
	adapter.set("session",this);
	this.set("store",DS.Store.create({
		  revision: 9,
		  adapter:adapter
	}));
  }.observes("adapter","sessionToken"),
  
  // creates a cookie with sessionToken
  _storeCredentialsAsCookie: function() {
    var token = this.get("sessionToken");
    if (token)
		$.cookie("sessionToken", token)
	else
		$.removeCookie("sessionToken")
  }.observes("sessionToken"),
  
  _storeUserIdAsCookie: function() {
    var token = this.get("sessionUserId");
    if (token)
		$.cookie("sessionUserId", token)
	else
		$.removeCookie("sessionUserId")
  }.observes("sessionUserId"),



  _findUserId: function() {
	ses = this;
	ses.set("sessionUserId",null);
	if (!ses.get("adapter")) return; //don't request without adapter
	if (!ses.get("sessionToken")) return; //don't request when not logged in
		basicAuth = ses.get("sessionToken");
		$.ajax({
		  url: ses.get("adapter.url")+"/user",
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
			ses.set("sessionUserId",data.auth_user.id);
			var id = data.auth_user.id;
			App.router.send("loginComplete");
		  }
	});
  }.observes("sessionToken","adapter"),

  _loadSessionUser: function() {
	var id = this.get("sessionUserId");
	var store = this.get("store");
  	this.set("sessionUser",(id && store) ? store.find(App.User,id) : null);
  }.observes("sessionUserId","store"),
  
});
App.set("session",App.Session.create());

var restoreLogin =Ember.Object.create({
	username: null,
	password: null,
	sessionUserId: null
});
restoreLogin.setProperties(decodeBase64Credentials($.cookie("sessionToken")));
restoreLogin.set("sessionUserId",$.cookie("sessionUserId"));
App.session.setProperties(restoreLogin);
