
App.RegisterController = Ember.Controller.extend({

  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  
  error_msg: '',
  isError: false,

  register: function() {
    //checks if any input field is empty
    if(this.get("username") == '' || this.get("email") == '' || this.get("password") == ''|| this.get("password_confirmation") == ''){
      this.set('isError', true);
      this.set('error_msg', 'Fill up everything.');
    }
    else {
      //checks if both passwords match
      if(this.get("password_confirmation") != this.get("password")) {
        this.set('isError', true);
        this.set('password', '');
        this.set('password_confirmation', '');
        this.set('error_msg', "Your passwords don't match.");
      } else {
        //checks password length > 6
        if(this.get("password").length < 6) {
          this.set('isError', true);
          this.set('error_msg', 'Password to short.');
        } else {
          //checks for valid email
          if(checkEmail(this.get("email")) == false) {
            this.set('isError', true);
            this.set('email', '');
            this.set('error_msg', 'Invalid Email address.');
          } else {
            this.set('isError', false);

            //create new Model and commit it to onespark service
            var user = App.store.createRecord(App.User,  { username: this.get("username"), email: this.get("email"), password: this.get("password"), password_confirmation: this.get("password_confirmation")});
            App.store.commit();

            //reset everything
            this.set('username', '');
            this.set('password', '');
            this.set('email', '');
            this.set('password_confirmation', '');

            App.router.send("goToLogin");
          }
        }
      } 
    }
  }
});