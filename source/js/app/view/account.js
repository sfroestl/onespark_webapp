App.AccountView = Ember.View.extend({
  templateName: 'account',
  classNames:[ 'account' ],
  fullyVisible: false,
  fadeAccount: function( ){
  	// console.log('animation');
  	// console.log(this.get('fullyVisible'));
  	that = this;
  	duration = 250;
  	if(!that.get('fullyVisible')){
      $('.account-button').animate({ width: '19.5%', paddingRight: '1.5%'}, duration, 'swing');
      $('.account').animate({right: '-10%'}, duration, 'swing', function() {
  			that.set('fullyVisible', !that.get('fullyVisible'));
  		});
  	} else if (that.get('fullyVisible')){
      $('.account-button').animate({ width: '9.125%', paddingRight: '3%'}, duration, 'swing');
      $('.account').animate({right: '-96.375%'}, duration, 'swing', function() {
  			that.set('fullyVisible', !that.get('fullyVisible'));
        App.router.send("goToProjects");
  		});
  	}
  }
});
