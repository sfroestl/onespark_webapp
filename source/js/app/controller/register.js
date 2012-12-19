
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',

  register: function() {
    if(!( this.isEmptyValidation() || this.matchPwValidation() || this.pwLengthValidation() || this.isEmailValid())) {  
      
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
            App.router.send("goToLogin");
        }
      });    
    }
  },

  /* ### Reset TextFields ### */

  resetFields: function() {
    this.set('username', '');
    this.set('email', '');
    this.set('password', '');
    this.set('password_confirmation', '');
  },

  /* ### Validation ### */

  isEmptyValidation: function() {
    if(this.get("username") == '' || this.get("email") == '' || this.get("password") == ''|| this.get("password_confirmation") == ''){
      App.FlashMessage.create({text:"Fill up everything."});
      return true;
    } else {
      return false;
    }
  },

  matchPwValidation: function() {
    if(this.get("password_confirmation") != this.get("password")) {
      this.set('password', '');
      this.set('password_confirmation', '');
      App.FlashMessage.create({text:"Your passwords don't match."});
      return true;
    } else {
      return false;
    }
  },

  pwLengthValidation: function() {
    if(this.get("password").length < 6) {
      App.FlashMessage.create({text:"Password to short."});
      return true;
    } else {
      return false;
    }
  },

  isEmailValid: function() {
    if(checkEmail(this.get("email")) == false) {
      this.set('email', '');
      App.FlashMessage.create({text:"Invalid Email address."});
      return true;
    } else {
      return false;
    }
  }
});
