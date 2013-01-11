App.SearchController = Ember.ObjectController.extend({
	query: null,
	allUsers: function() {
		console.log("owned");
		var found = new Ember.Set();
			found.addEach(App.get("session.sessionUser.outContacts").mapProperty("contact"));
			App.get("session.sessionUser.ownedProjects").forEach(function(project) {
				console.log(project.get("peopleInvolved"));
				found.addEach(project.get("peopleInvolved"));
			});
			console.log("collaborated");
			App.get("session.sessionUser.collaboratedProjects").forEach(function(project) {
				console.log(project.get("peopleInvolved"));
				found.addEach(project.get("peopleInvolved"));
			});	
		return found.toArray();
	}.arrayProperty("App.session.sessionUser.outContacts.@each.contact","App.session.sessionUser.ownedProjects.@each.peopleInvolved.[]","App.session.sessionUser.collaboratedProjects.@each.peopleInvolved.[]")
})
