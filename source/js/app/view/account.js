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
  		console.log('Nope');
  		$('.account').animate({right: '-1.5%', paddingLeft: '1.5%'}, duration, 'swing', function() {
  			that.set('fullyVisible', !that.get('fullyVisible'));
  		});
  	} else if (that.get('fullyVisible')){
  		console.log('Jep');
  		$('.account').animate({right: '-86.375%', paddingLeft: '0%'}, duration, 'swing', function() {
  			that.set('fullyVisible', !that.get('fullyVisible'));
  		});
  		App.router.send("goToProjects");
  	}
  }
});

App.FadeInView = Ember.View.extend({
    didInsertElement: function(){
        this.$().hide().show();
    }
});