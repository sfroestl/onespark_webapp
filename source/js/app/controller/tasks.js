App.TasksController = Ember.Controller.extend({
	tasks: [],
});

App.SingleTaskController = Ember.ObjectController.extend({
	task: null,

	deleteTask: function(taskToDelete) {
		var confirmResult = confirm("Delete Task \""+taskToDelete.get('title')+"\" ?");
		var task = taskToDelete;

		if(confirmResult){
			showFlashMessageFor(task);
			task.deleteRecord();
			App.store.commit();
			App.router.transitionTo('projectTasks.index');
		}
		else{
			App.router.transitionTo('projectTasks.singletask.index', task);
		}
	}
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

    possibleWorkers: function(){
    	var users = this.get('project.contributors').mapProperty("content");
    	users.unshift(this.get('project.owner'));
    	users.unshift(null);
    	return users;
    }.property("project.contributors", "project.owner"),

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
		var newWorker = this.get("worker");
		console.log(newWorker);
	
		var task = App.store.createRecord(App.Task,  { title: newtitle, desc: newdesc, creator: newcreator, dueDate: newduedate, project: newProject, estimatedHours: newEstimatedHours, worker: newWorker});
		showFlashMessageFor(task);
    
		App.store.commit();
	},

	fill: function(taskToEdit){
    		var date = taskToEdit.get("dueDate");
			if(date!=null){
				this.dueDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			}
			this.set("title", taskToEdit.get("title"));
			this.set("description", taskToEdit.get("desc"));
			this.set("estimatedHours", taskToEdit.get("estimatedHours"));
			this.set("project", taskToEdit.get("project"));
			this.set("worker", taskToEdit.get("worker"));
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

		task.set("worker", this.worker);

		App.store.commit();

    	var fm = App.FlashMessage.create({
			text: "Task was updated"
		});
	}
});