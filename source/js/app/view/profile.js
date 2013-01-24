App.ProfileView = Ember.View.extend({
  templateName: 'profile',
    tagName: "div",
    classNames: ['profile'],
});

App.DeleteAccountView= Ember.View.extend({
	tagName: "form",
    didInsertElement: function(){
    	$('body,html').animate({ scrollTop: $('body').height() }, 'slow');
    },
});