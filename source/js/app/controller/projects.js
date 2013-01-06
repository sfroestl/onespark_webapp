App.ProjectsController = Ember.Controller.extend({
		ownedProjectsBinding: "App.session.sessionUser.ownedProjects",
		collaboratedProjectsBinding: "App.session.sessionUser.collaboratedProjects"
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
	},

	isUserProjectAdmin: function(user, project){
		var p = project;
		var co = p.get("contributors");
		var u = user;
		//check if user is a Contributor
	    var i = co.length;
	    while (i--) {
	        if (co[i].get("id") === u.get("id")){
	        	//check if user is a projectAdmin
	        	if(co[i].get("permission")==3) return true;	
	        } 
	    }
    	return false;
	},
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
		var newtitle = this.get("title");
		var newdesc = this.get("description");
		var newowner = this.get("owner");
		var newduedate;

		var date = Date.parse(this.get("dueDate"));
		if(isNaN(date)){
			newduedate=null;
		}
		else newduedate= new Date(this.get("dueDate"));
		
		var project = App.store.createRecord(App.Project,  { title: newtitle, desc: newdesc, owner: newowner, dueDate: newduedate});
		showFlashMessageFor(project);
		App.get('session.sessionUser.ownedProjects').addObject(project);
    
		App.store.commit();
	},

	fill: function(projectToEdit){
			this.set("title", projectToEdit.get("title"));
			this.set("description", projectToEdit.get("desc"));
			var date = projectToEdit.get("dueDate");
			if(date!=null){
				var month = (date.getMonth()+1);
				if (month<10) month = "0"+(month);
				var day = date.getDate();
				if(day<10) day = "0"+day;
				this.dueDate = date.getFullYear()+"-"+month+"-"+day;
			}
	},

	update: function(projectToEdit){
		var project = projectToEdit;
		project.set("title", this.title);
		project.set("desc", this.description);
		var newduedate;
		var date = Date.parse(this.get("dueDate"));
		if(isNaN(date)){
			newduedate=null;
		}
		else newduedate= new Date(this.get("dueDate"));
		project.set("dueDate", newduedate);
		App.store.commit();

    	var fm = App.FlashMessage.create({
			text: "Project was updated"
		});

    	//App.router.transitionTo('projects.singleproject.projectOverview');
	}
});
