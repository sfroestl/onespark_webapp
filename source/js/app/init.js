$.support.cors = true;
App = Ember.Application.create({

	session:null,
	store: null,
	currentTime:moment(),
	_updateStore: function() {
	  this.set("store",this.get("session.store"));
	}.observes("session.store")
});

