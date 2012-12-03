App.LoginController = Ember.Controller.extend(
{
  username: '',
  password: '',
  oldPosition: '',

  error_msg: '',
  isError: false,

  isSuccess: false,
  success_msg: '',

  login: function() {
    
  	App.session.login(this.get("username"),this.get("password"));

    this.set('username', '');
    this.set('password', '');

  	return this.get("oldPosition");
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
    }
});
