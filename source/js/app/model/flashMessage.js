App.FlashMessage = Ember.Object.extend({
    text:"",
    type:"",
    removable:true,
    init: function() {
		App.flashMessages.addObject(this);
	},
	hide: function() {
		App.flashMessages.removeObject(this);
	}
});

App.flashMessages = [];
