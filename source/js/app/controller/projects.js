App.ProjectsController = Ember.Controller.extend({
		ownedProjects: null,
		collaboratedProjects: null
});

App.ProjectController =  Ember.ObjectController.extend();

App.ProjectOverviewController = Ember.ObjectController.extend({

	projectDeleteCommitted : false,

	deleteProject: function(projectToDelete) {
		if (App.get("session.sessionUserId")==projectToDelete.get('owner.id')){
			this.projectDeleteCommitted = false;

			var confirmResult = confirm("Delete project "+projectToDelete.get('title')+" ?");

			if(confirmResult){
				this.projectDeleteCommitted = true;
				var project = projectToDelete;
				showFlashMessageFor(project);
				project.deleteRecord();
				App.store.commit();
			}
		}
		else{
			var fm = App.FlashMessage.create({
				text: "You have no permission to delete this project"
			})
			App.router.transitionTo('projects.index');
		}
	}
});
