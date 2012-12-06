App.ProjectsController = Ember.Controller.extend({
		ownedProjects: null,
		collaboratedProjects: null
});

App.ProjectController =  Ember.ObjectController.extend();

App.ProjectOverviewController = Ember.ObjectController.extend({

	projectDeleteCommitted : false,

	deleteProject: function(projectToDelete) {
			this.projectDeleteCommitted = false;

			var confirmResult = confirm("Delete project "+projectToDelete.get('title')+" ?");

			if (confirmResult){
				this.projectDeleteCommitted = true;
				var project = projectToDelete;
				showFlashMessageFor(project);
				project.deleteRecord();
				App.store.commit();
			}
	}
});

//App.ProjectDetailsController = Em.ObjectController.extend();

//App.ProjectnaviController = Em.ObjectController.extend();

// App.ProjecttitleController = Em.ObjectController.extend();
