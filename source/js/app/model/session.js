//= require ../../libs/jquery/jquery.cookie.js
App.Session = Ember.Object.extend({
	
	state: Ember.StateManager.create({
		initialState: 'stranger.guest',
		enableLogging: true, //debug
		stranger: Ember.State.create({         //we don't know the identity of the user, because...
				guest: Ember.State.create({           //we have no credentials, but until now, nobody cared
					unauthorizedRequest: Ember.State.transitionTo('stranger.unauthorized.unknown')
				}),        
				unauthorized: Ember.State.create({ //credentials were required, but ..
					unknown: Ember.State.create(),        //user hasn't provided them yet
					rejected: Ember.State.create()       //the given were rejected
				}),
				navigateAround: Ember.State.transitionTo('guest')
		}),
		candidate: Ember.State.create({			//we got credentials, but haven't used them yet
			successfulRequest: Ember.State.transitionTo('member') // Credentials seem to word
		}),       
		member: Ember.State.create(),           //the given credentials belong to a site member
			
			
		// Actions
		successfulRequest: function(manager) {manager.transitionTo(manager.currentPath);},//Nothing here, since a sucessful request tells nothing about the validity of credentials. Maybe none are needed.
		navigateAround: function(manager) {manager.transitionTo(manager.currentPath);},//Nothing here, since a sucessful request tells nothing about the validity of credentials. Maybe none are needed.
		unauthorizedRequest: Ember.State.transitionTo('stranger.unauthorized.rejected'),//Mark credentials as invalid.
		login: Ember.State.transitionTo('candidate'),//untested credentials
		logout: Ember.State.transitionTo('stranger.guest')
	}),

  sessionStatus: function() {
	  return this.get("state.currentPath");
  }.property('state.currentPath'),
  signedIn: function() {
	  return !this.get("sessionStatus").startsWith('stranger.');
  }.property('sessionStatus'),
  needsLogin: function() {
	  return this.get("sessionStatus").startsWith('stranger.unauthorized.');
  }.property('sessionStatus'),
  username: null,
  password: null,
  sessionUser: null,
  sessionToken: function() {
	  return encodeBase64(this.get("username"), this.get("password"));
  }.property('username','password'),
  
  
  unauthorizedRequest: function() {
	  this.get("state").send("unauthorizedRequest");
  },
  successfulRequest: function() {
	  this.get("state").send("successfulRequest");
  },
  navigateAround: function() {
	  this.get("state").send("navigateAround");
  },
  
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
  _autoLogin: function() {
	  console.log("executing auto-login");
	  if (this.get("sessionToken"))
		this.get("state").send("login");
	  else
	    this.get("state").send("logout")
  }.observes("sessionToken"),
  
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
	if (!ses.get("sessionToken")) return; //don't request when not logged in
    Ember.run.next( function() {
		ses.set("sessionUser",null);
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
			this.unauthorizedRequest();
		  },

		  success: function(data) {
			// store session
			this.set("sessionUser",data);
			this.successfulRequest();
			console.log ("--> Success: 200");
			console.log("--> User " + data.username + " is logged in.");
		  }
		});
	});
  }.observes("sessionToken")

});
App.session = App.Session.create();
App.session.setProperties(decodeBase64Credentials($.cookie("sessionToken")));
