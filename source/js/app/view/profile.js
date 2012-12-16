App.ProfileView = Ember.View.extend({
  templateName: 'profile',
    isDeleteAccount: false,
    isDisabled: true,
    tagName: "form",
    goToDeleteMe: function() {
        this.set('isDeleteAccount', !this.get('isDeleteAccount')); 
        if(!this.isDisabled){
        	this.set('isDisabled', !this.get('isDisabled')); 
        }
    },
    edit: function() {
        this.toggleProperty('isDisabled');
        if(this.isDeleteAccount){
        	this.set('isDeleteAccount', !this.get('isDeleteAccount')); 
        }
    }
});

App.DeleteAccountView= Ember.View.extend({
	tagName: "form",
    didInsertElement: function(){
    	$('body,html').animate({ scrollTop: $('body').height() }, 'slow');
    },
});