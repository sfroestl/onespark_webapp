//= require ../../libs/jquery/jquery.cookie.js
App.User = Ember.Object.extend();
App.User.reopenClass({
//App.User = Ember.Object.extend({
  sessionUser: null,

  signedIn: false,
  // returns the sessionToken from cookie
  getSessionToken: function() {
    return $.cookie("sessionToken");
  },
  // creates a cookie with sessionToken
  _setSessionToken: function(basicAuth) {
    $.cookie("sessionToken", basicAuth);
  },
  // deletes cookie with sessionToken
  deleteSessionToken: function() {
    $.removeCookie("sessionToken");
    this.signedIn = false;
  },
  // returns true if user is signed in
  isSignedIn: function() {
    if($.cookie("sessionToken")) {
      this.signedIn = true;
      console.log("UserModel: isSignedIn()? => " + this.signedIn);
      console.log("--> sessionToken from cookie is: "+ $.cookie("sessionToken"));
      return true;
    } else {
      this.signedIn = false;
      return false;
    }
  },

  // registers the user by validating his token via API
  // sets the sessionUser
  // returns TRUE or FALSE
  registerSessionUser: function(basicAuth) {
    var registerBool= false;
    if(!basicAuth) {
      basicAuth = this.getSessionToken();
    }
    console.log("UserModel: registerSessionUser()");
    $.ajax({
      async: false,
      url: 'http://api.onespark.de/api/v1/user',
      type: 'GET',
      dataType: 'json',
      accept: 'json',
      headers: {'Authorization': basicAuth},
      context: this,

      error: function(jqXHR, textStatus){
        console.log ("--> ERROR");
        registerBool = false;
      },

      success: function(data) {
        // store session
        this._setSessionToken(basicAuth);
        this.signedIn = true;
        console.log ("--> Success: 200");
        console.log("--> SignIn " + this.signedIn);
        console.log("--> User " + data.username + " is logged in.");
        registerBool = true;
      }
    });

      return registerBool;
  },

  // Returns the sessionUser
  getSessionUser: function() {
    basicAuth = this.getSessionToken();
    console.log("UserModel: getSessionUser()");
    $.ajax({
      async: false,
      url: 'http://api.onespark.de/api/v1/user',
      type: 'GET',
      dataType: 'json',
      accept: 'json',
      headers: {'Authorization': basicAuth},
      context: this,

      error: function(jqXHR, textStatus){
        console.log ("--> ERROR");
      },

      success: function(data) {
        // store session
        console.log ("--> Success: 200");
        console.log("--> User: " + data);
        // set properties
        this.sessionUser = data;
      }
    });
    return this.sessionUser;
  },

  // Creates a new user
  createUser: function(){
    // TODO post new user
  }


});
