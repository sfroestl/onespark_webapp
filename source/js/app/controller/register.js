
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  
  error_msg: '',
  isError: false,

  isSuccess: false,
  success_msg: '',

  register: function() {
    if(this.isEmptyValidation() || this.matchPwValidation() || this.pwLengthValidation() || this.isEmailValid()) {
      this.set('isError', true);
    } else {
      this.set('isError', false);

      var user = App.store.createRecord(App.User,  { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation")});
      App.store.commit();

      App.router.send("goToLogin");
    }
  },

  /* ### Validation ### */

  isEmptyValidation: function() {
    if(this.get("username") == '' || this.get("email") == '' || this.get("password") == ''|| this.get("password_confirmation") == ''){
      this.set('error_msg', 'Fill up everything.');
      return true;
    } else {
      return false;
    }
  },

  matchPwValidation: function() {
    if(this.get("password_confirmation") != this.get("password")) {
      this.set('password', '');
      this.set('password_confirmation', '');
      this.set('error_msg', "Your passwords don't match.");
      return true;
    } else {
      return false;
    }
  },

  pwLengthValidation: function() {
    if(this.get("password").length < 6) {
      this.set('error_msg', 'Password to short.');
      return true;
    } else {
      return false;
    }
  },

  isEmailValid: function() {
    if(checkEmail(this.get("email")) == false) {
      this.set('email', '');
      this.set('error_msg', 'Invalid Email address.');
      return true;
    } else {
      return false;
    }
  },

  /* ### Exit Helper ### */

  //Reset Notifications
  resetMsg: function() {
    this.set('isError', false);
    this.set('error_msg', '');

    this.set('isSuccess', false);
    this.set('success_msg', '');
  },

  //Reset Text Fields
  resetFields: function() {
    this.set('username', '');
    this.set('password', '');
    this.set('email', '');
    this.set('password_confirmation', '');
  }
});