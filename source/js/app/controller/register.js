
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',

  isComplete: false,
  error: false,

  register: function() {
    
    var emptyArray = new Array(this.get("username"), this.get("email"), this.get("password"), this.get("password_confirmation"));
    
    var pw = this.get("password");
    var username = this.get("username");
    
    that = this;

    this.set("isComplete", false);
    this.set("error", false);

    if( isEmptyValidation(emptyArray) && 
        matchPwValidation(this.get("password"), this.get("password_confirmation")) && 
        pwLengthValidation(this.get("password")) && isEmailValid(this.get("email")) && 
        usernameLength(this.get("username"))) {  
      $.ajax({
            async: true,
            url: 'http://api.onespark.de/api/v1/users',
            type: 'POST',
            dataType: 'json',
            accept: 'json',
            data: {user: { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation") }},

            error: function(jqXHR, textStatus){
              console.log ("--> ERROR");
              App.FlashMessage.create({text:"Username and email have already been taken."});
              
              that.set("error", true);
              that.set("isComplete", true);
            },

            success: function(data) {
              console.log ("--> Success: 200");
              App.FlashMessage.create({text:"Your sign up was successfull."});
              
              that.set("error", false);
              that.set("isComplete", true);
            }
          });
    }
  },

  getComplete: function() {
    return this.get("isComplete");
  },

  getError: function() {
    return this.get("error");
  },

  loginAfterregister: function() {
    var complete = this.get("isComplete");
    if(complete) {
      var error = this.get("error");
      if(!error) {
        console.log("Error " + error);
        var pw = this.get("password");
        var username = this.get("username");
        App.session.login(username,pw);
      }
    }
  }.observes("isComplete"),

  /*
  register: function() {
    var emptyArray = new Array(this.get("username"), this.get("email"), this.get("password"), this.get("password_confirmation"));
    if(isEmptyValidation(emptyArray) && matchPwValidation(this.get("password"), this.get("password_confirmation")) && pwLengthValidation(this.get("password")) && isEmailValid(this.get("email")) && usernameLength(this.get("username"))) {  
      
      user = App.store.createRecord(App.User,  { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation")});
      App.store.commit();

      //adds observer for callback and error handling
      user.addObserver('isDirty', function() {
        //if user is dirty
        if (user.get('isDirty')) {

            if(user.get("errors").username!=null && user.get("errors").email!=null) {
              error_msg = "Username and email have already been taken.";
              App.FlashMessage.create({text:error_msg});
            } else {

              if(user.get("errors").username!=null) {
                error_msg = "Username " + user.get("errors").username + ".";
              } else {
                error_msg = "Email " + user.get("errors").email + ".";
              }
              App.FlashMessage.create({text:error_msg});
            }
        //if user is not dirty
        } else {
            App.FlashMessage.create({text:"Your sign up was successfull."});
            App.session.login(this.get("username"),this.get("password"));
        }
      });    
    }
  },
  */

  /* ### Reset TextFields ### */

  resetFields: function() {
    this.set('username', '');
    this.set('email', '');
    this.set('password', '');
    this.set('password_confirmation', '');

    this.set('isComplete', false);
    this.set('error', false);
  }
});
