App.SearchController = Ember.ObjectController.extend({
	query: null,
	allUsers: function() {
		var found = new Ember.Set();
			found.addEach(App.get("session.sessionUser.outContacts").mapProperty("contact"));
			this.get("allProjects").forEach(function(project) {
				found.addEach(project.get("peopleInvolved"));
			});
		return found.toArray();
	}.arrayProperty("App.session.sessionUser.outContacts.@each.contact","allProjects.@each.peopleInvolved.[]"),
	allProjects: function() {
		var found=[];
		found.addObjects(App.get("session.sessionUser.ownedProjects"));
		found.addObjects(App.get("session.sessionUser.collaboratedProjects"));
		return found;
	}.arrayProperty("App.session.sessionUser.ownedProjects.[]","App.session.sessionUser.collaboratedProjects.[]"),
	allTasks: function() {
		var found=[];
			this.get("allProjects").forEach(function(project) {
				found.addObjects(project.get("tasks"));
			});
		return found;
	}.arrayProperty("allProjects.@each.tasks.[]"),	
})
