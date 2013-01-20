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
    dueTime: null,

    create: function() {
    	var errorMessageText =null;
    	var wrongtime =false;
    	var wrongdate = false;
    	var newDate = null;
    	committed = false;

    	if((this.get("title")==null)||(this.get("title")=="")){
    		errorMessageText = "title required";

    		console.log("title required");
    	}
    	else {
    		if(this.get("dueDate")!=null){
    			var regexDate = "^((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])$";
    			var validDate = this.get("dueDate").match(regexDate);
    			if(validDate){
    				newDate = new Date(this.get("dueDate"));
    				console.log(newDate);
    				if(this.get("dueTime")!=null){
    					var timefield = this.get('dueTime').match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
    					if(timefield){
							newDate.setHours(timefield[1]);
							newDate.setMinutes(timefield[2]);
							var project = App.store.createRecord(App.Project,  { title: this.get("title"), desc: this.get("description"), owner: this.get("owner"), dueDate: newDate});
							showFlashMessageFor(project);
							App.get('session.sessionUser.ownedProjects').addObject(project);
							App.store.commit();
							this.setProperties({
								title: null,
								description: null,
								owner: null,
								dueDate: null,
								dueTime: null,
							});
							wrongtime = false;
							wrongdate = false;
							committed = true;
							App.router.transitionTo('projects.index');
						}
						else{
							errorMessageText = "wrong timeformat";
							console.log("wrong timeformat");
							wrongtime = true;
							this.set("dueTime", null);
						}
    				}
    			}
    			else{
    				errorMessageText = "wrong dateformat";
    				this.set("dueDate", null);
    				wrongdate = true;
    				console.log("wrong dateformat");
    			}
    		};
    		if((!wrongtime)&&(!wrongdate)&&(!committed)){
				var project = App.store.createRecord(App.Project,  { title: this.get("title"), desc: this.get("description"), owner: this.get("owner"), dueDate: newDate});
				showFlashMessageFor(project);
				App.get('session.sessionUser.ownedProjects').addObject(project);
				App.store.commit();
				this.setProperties({
					title: null,
					description: null,
					owner: null,
					dueDate: null,
					dueTime: null,
				});
				wrongtime = false;
				wrongdate = false;
				committed = true;
				App.router.transitionTo('projects.index');
			}
    	};
		if(errorMessageText!=null){
			var fm = App.FlashMessage.create({
				text: errorMessageText
			});
			errorMessageText = null;
		};
		wrongtime = false;
		wrongdate = false;
		committed = false;
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
