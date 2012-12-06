App = Ember.Application.create({
	session:null,
	store: null,
	_updateStore: function() {
	  this.set("store",this.get("session.store"));
	}.observes("session.store")
});
