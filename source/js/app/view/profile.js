App.ProfileView = Ember.View.extend({
  templateName: 'profile',
    tagName: "form",
});

App.DeleteAccountView= Ember.View.extend({
	tagName: "form",
    didInsertElement: function(){
    	$('body,html').animate({ scrollTop: $('body').height() }, 'slow');
    },
});