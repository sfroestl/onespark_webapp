App.AccountController =  Ember.ObjectController.extend({
    isDetailViewable: false,
    clickMeToToggleDetail: function() {
    	this.set('isDetailViewable', !this.get('isDetailViewable'));
    	if(!this.get('isDetailViewable')) {	
        	App.router.send("goToProjects");
        } else if (this.get('isDetailViewable')){
        	
       
        }
    }
});