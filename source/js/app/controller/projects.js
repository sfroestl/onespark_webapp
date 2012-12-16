App.ProjectsController = Ember.Controller.extend({
		ownedProjects: null,
		collaboratedProjects: null
});

App.ProjectController =  Ember.ObjectController.extend({
	deleteProject: function(projectToDelete) {
		var confirmResult = confirm("Delete project \""+projectToDelete.get('title')+"\" ?");

		if(confirmResult){
			var project = projectToDelete;
			showFlashMessageFor(project);
			project.deleteRecord();
			App.store.commit();
			App.router.transitionTo('projects.index');
		}
		else{
			App.router.transitionTo('projects.singleproject');
		}
	}
});

App.ProjectOverviewController = Ember.ObjectController.extend({

});

App.CreateUpdateProjectController = Ember.Controller.extend({
	createFlag: false,
	updateFlag: false,

    title: null,
    description: null,
    owner: App.get('session.sessionUser'),
    dueDate: null,

    create: function() {
    	console.log(this.createFlag);
		var newtitle = this.get("title");
		var newdesc = this.get("description");
		var newowner = this.get("owner");
		var newduedate = new Date(this.get("dueDate"));

		var project = App.store.createRecord(App.Project,  { title: newtitle, desc: newdesc, owner: newowner, dueDate: newduedate});
		showFlashMessageFor(project);
		App.get('session.sessionUser.ownedProjects').addObject(project);
    
		App.store.commit();
	},

	fill: function(projectToEdit){
			this.title = projectToEdit.get("title");
			this.description = projectToEdit.get("desc");
			var date = projectToEdit.get("dueDate");
			if(date!=null){
				this.dueDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
	},

	empty: function(){
		this.title = null;
		this.description = null;
		this.dueDate= null;
	},

	update: function(projectToEdit){
		var project = projectToEdit;
		project.set("title", this.title);
		project.set("desc", this.description);
		var date = new Date(this.dueDate);
		project.set("dueDate", date);
		App.store.commit();

    	var fm = App.FlashMessage.create({
			text: "Project was updated"
		});

    	App.router.transitionTo('projects.singleproject.projectOverview');
	}
});