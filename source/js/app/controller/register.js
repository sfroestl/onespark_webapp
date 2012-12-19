
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  register: function() {
    var emptyArray = new Array(this.get("username"), this.get("email"), this.get("password"), this.get("password_confirmation"));
    var pw = this.get("password");
    var username = this.get("username");
    if(isEmptyValidation(emptyArray) && matchPwValidation(this.get("password"), this.get("password_confirmation")) && pwLengthValidation(this.get("password")) && isEmailValid(this.get("email")) && usernameLength(this.get("username"))) {  
      $.ajax({
            async: true,
            url: 'http://api.onespark.de/api/v1/users',
            type: 'POST',
            dataType: 'json',
            accept: 'json',
            data: {user: { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation") }},

            error: function(jqXHR, textStatus){

              var dec = JSON.parse(jqXHR.responseText);
              console.log ("--> ERROR");
              if(dec.errors!=null) {
                error_msg = "Username and email have already been taken.";
                App.FlashMessage.create({text:error_msg});
              }
            },

            success: function(data) {
              console.log ("--> Success: 200");
              App.FlashMessage.create({text:"Your sign up was successfull."});
              App.session.login(username,pw);
            }
          });
    }
  },
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

    this.set('registered', false);
  }
});
