App.ProjectsController = Ember.Controller.extend({
		ownedProjects: null,
		contributedProjects: null
});

App.ProjectController =  Ember.ObjectController.extend();

App.ProjectOverviewController = Ember.ObjectController.extend({

	// deleteProject: function(projectToDelete) {

	// 		//console.log(projectToDelete.get('id'));
	// 		//this.projectDeleteCommitted = false;

	// 		var confirmResult = confirm("Delete project "+projectToDelete.get('title')+" ?");

	// 		if (confirmResult){
	// 			this.projectDeleteCommitted = true;
	// 			var project = App.store.find(App.Project, projectToDelete.id);
	// 			//project.unloadRecord();	
	// 			project.deleteRecord();
	// 			App.store.commit();
	// 		}
	// }

	deleteProject: function(projectToDelete){
		if (App.get("session.sessionUserId")==projectToDelete.get('owner.id')){
			var project = projectToDelete;

			var base64 = encodeBase64(App.get("session.username"), App.get('session.password'));
			var confirmResult = confirm("Delete project \""+projectToDelete.get('title')+"\" ?");

			//old fashioned
			if(confirmResult){
				$.ajax({
			      async: true,
			      url: 'http://api.onespark.de/api/v1/projects/'+project.id,
			      type: 'DELETE',
			      dataType: 'json',
			      accept: 'json',
			      headers: {'Authorization': base64},
			      context: this,

			      // error: function(jqXHR, textStatus){
			      // 	this.set('isError', true);
			      // 	this.set('password_conf', '');
			      //   console.log ("--> ERROR");
			      // },

			      success: function(data) {
			        console.log ("--> Success: 200 - Message: "+data.message);
			        App.get('session.sessionUser.ownedProjects').removeObject(project);
			        App.router.send("goProjectsIndex");
			      }
			    })
			}

		}
		else{
			alert("You have no permission to delete this project");
		}
	}
});

//App.ProjectDetailsController = Em.ObjectController.extend();

//App.ProjectnaviController = Em.ObjectController.extend();

// App.ProjecttitleController = Em.ObjectController.extend();
