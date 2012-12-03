App.ProjectsController = Ember.Controller.extend({
		ownedProjects: null,
		contributedProjects: null
});

App.ProjectController =  Ember.ObjectController.extend();

App.ProjectOverviewController = Ember.ObjectController.extend({

	projectDeleteCommitted : false,

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
		//projectId = projectToDelete.id;
		project = projectToDelete.id;

		var base64 = encodeBase64(App.get("session.sessionUser.username"), this.password_conf);

		var confirmResult = confirm("Delete project "+projectToDelete.get('title')+" ?");

		if (confirmResult){
			//old fashioned
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
		      	this.set('projectDeleteCommitted', true);
		      	//this.set('password_conf', '');
		        console.log ("--> Success: 200");
		        //App.session.logout();
		        App.get('session.sessionUser.ownedProjects').removeObject(project);
		        App.router.send("projects.index");
		      }
		    })
		}
	}
});

//App.ProjectDetailsController = Em.ObjectController.extend();

//App.ProjectnaviController = Em.ObjectController.extend();

// App.ProjecttitleController = Em.ObjectController.extend();
