App.TasksController = Ember.Controller.extend({
	tasks: [],
});

App.SingleTaskController = Ember.ObjectController.extend({
	//task: null,
})

App.CreateUpdateTaskController = Ember.Controller.extend({
	createFlag: false,
	updateFlag: false,

	dueDate: null,
    title: null,
    description: null,
    creator: App.get('session.sessionUser'),
    project: null,
    estimatedHours: null,

    worker: null,

    create: function() {
		var newtitle = this.get("title");
		var newdesc = this.get("description");
		var newcreator = this.get("creator");
		var newduedate;
		var date = Date.parse(this.get("dueDate"));
		if(isNaN(date)){
			newduedate=null;
		}
		else newduedate= new Date(this.get("dueDate"));
		var newEstimatedHours= parseInt(this.get("estimatedHours"));
		var newProject = this.get("project");
		console.log(newProject);
		
		var task = App.store.createRecord(App.Task,  { title: newtitle, desc: newdesc, creator: newcreator, dueDate: newduedate, project: newProject, estimatedHours: newEstimatedHours});
		showFlashMessageFor(task);
    
		App.store.commit();
	},

	fill: function(taskToEdit){
    		var date = taskToEdit.get("dueDate");
			if(date!=null){
				this.dueDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
			this.title = taskToEdit.get("title");
			this.description = taskToEdit.get("desc");
			this.estimatedHours = taskToEdit.get("estimatedHours");
			this.worker = taskToEdit.get("worker");
	},

	update: function(taskToEdit){
		var task = taskToEdit;
		task.set("title", this.title);
		task.set("desc", this.description);
		var newduedate;
		var date = Date.parse(this.get("dueDate"));
		if(isNaN(date)){
			newduedate=null;
		}
		else newduedate= new Date(this.get("dueDate"));
		task.set("dueDate", newduedate);
		task.set("estimatedHours", this.estimatedHours);

		App.store.commit();

    	var fm = App.FlashMessage.create({
			text: "Task was updated"
		});

    	App.router.transitionTo('projectTasks.singletask');
	}
});