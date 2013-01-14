App.AccountView = Ember.View.extend({
  templateName: 'account',
  classNames:[ 'account' ],
  fullyVisible: false,
  fadeAccount: function( ){
  	console.log('animation');
  	console.log(this.get('fullyVisible'));
  	that = this;
  	duration = 250;
  	if(!that.get('fullyVisible')){
  		$('.account').animate({right: '0'}, duration, 'swing', function() {
        $('.account-button').animate({ width: '22%'});
  			that.set('fullyVisible', !that.get('fullyVisible'));
  		});
  	} else if (that.get('fullyVisible')){
  		$('.account').animate({right: '-86.375%'}, duration, 'swing', function() {
        $('.account-button').animate({ width: '9.125%'});
  			that.set('fullyVisible', !that.get('fullyVisible'));
        App.router.send("goToProjects");
  		});
  	}
  }
});
