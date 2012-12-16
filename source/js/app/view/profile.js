App.ProfileView = Ember.View.extend({
  templateName: 'profile',
    isUpdateProfile: false,
    isDeleteAccount: false,
    goToUpdateProfile: function() {
        this.set('isUpdateProfile', !this.get('isUpdateProfile'));
        if(this.isDeleteAccount) {
        	 this.set('isDeleteAccount', !this.get('isDeleteAccount'));
        }
    },
    goToDeleteMe: function() {
        this.set('isDeleteAccount', !this.get('isDeleteAccount')); 
        if(this.isUpdateProfile) {
        	 this.set('isUpdateProfile', !this.get('isUpdateProfile'));
        }
    }
});

App.UpdateProfileView= Ember.View.extend({
    didInsertElement: function(){
    	$('body,html').animate({ scrollTop: $('body').height() }, 'slow');
    }
});

App.DeleteAccountView= Ember.View.extend({
    didInsertElement: function(){
    	$('body,html').animate({ scrollTop: $('body').height() }, 'slow');
    }	
});