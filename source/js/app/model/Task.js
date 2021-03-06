App.Task = DS.Model.extend({
    dueDate: DS.attr('date'),
    title: DS.attr('string'),
    desc: DS.attr('string'),
    project: DS.belongsTo('App.Project'),
    completed: DS.attr('boolean'),
    completedAt: DS.attr('date'),
    completedBy: DS.belongsTo('App.User'), //User-Model müsste noch completed-projects enthalten, oder? hasMany
                                             // server-seitig?
    estimatedHours: DS.attr('number'),
    workedHours: DS.attr('number'),
    // comments: DS.hasMany('App.Comment');
    creator: DS.belongsTo('App.User'),
    worker: DS.belongsTo('App.User'),
    timesessions: DS.hasMany('App.Time_session'),
    flashMessageName: function(){
        return "Task '"+this.get('title')+"' ";
    }.property("title"),

    workedSessionTime: function(){
        var sessions = this.get("timesessions");
        var totalTime = 0;
        sessions.forEach(function(session){
            if(session.get("end")!=null){
                totalTime = totalTime + session.get("workedTime");
            }
        });
        return moment.duration(totalTime);
    }.property("timesessions.@each.workedTime"),

    aktiveTimeSession: function(){
        var sessions = this.get("timesessions");
        return sessions.findProperty("end", null);
    }.property("timesessions.@each.end"),


    classForCSS: function(){
        return this._super()+" "+completed ? "complete":"incomplete";
    },
    canEditTask: function(user){
        var aUser = user;
        var aTask = this;
        var out= false;
        //check if user is project-contribiutor
        var projectContributors = aTask.get("project.contributors");
        var i = projectContributors.length;
        while (i--) {
            if (projectContributors[i].get("id") === aUser.get("id")){
                //check if user is a projectAdmin
                if(projectContributors[i].get("permission")==3){
                    out=true;
                } 
            } 
        };
        //check if user is project owner
        var prOwner = aTask.get("project.owner");
        if(aUser.get("id")==prOwner.get('id')) out=true;
        //check if user is task creator
        if(aUser.get("id")==aTask.get("creator.id")) out=true;
        //check if user is task worker
        if(aUser.get('id')==aTask.get("worker.id")) out=true;

        // if(out==false) console.log(aUser.get("username")+" has no permission to edit Task '"+aTask.get("title")+"'.");

        return out;
    },
    canDeleteTask: function(user){
        var aUser = user;
        var aTask = this;
        var out= false;
        //check if user is project-contribiutor
        var projectContributors = aTask.get("project.contributors");
        var i = projectContributors.length;
        while (i--) {
            if (projectContributors[i].get("id") === aUser.get("id")){
                //check if user is a projectAdmin
                if(projectContributors[i].get("permission")==3){
                    out=true;
                } 
            } 
        };
        //check if user is project owner
        var prOwner = aTask.get("project.owner");
        if(aUser.get("id")==prOwner.get('id')) out=true;

        // if(out==false) console.log(aUser.get("username")+" has no permission to delete Task '"+aTask.get("title")+"'.");

        return out;
    },
    canCompleteTask: function(user){
        var aUser = user;
        var aTask = this;
        var out= false;
        //check if user is project-contribiutor
        var projectContributors = aTask.get("project.contributors");
        var i = projectContributors.length;
        while (i--) {
            if (projectContributors[i].get("id") === aUser.get("id")){
                //check if user is a projectAdmin
                if(projectContributors[i].get("permission")==3){
                    out=true;
                } 
            } 
        };
        //check if user is project owner
        var prOwner = aTask.get("project.owner");
        if(aUser.get("id")==prOwner.get('id')) out=true;
        //check if user is task creator
        if(aUser.get("id")==aTask.get("creator.id")) out=true;
        //check if user is task worker
        if(aUser.get('id')==aTask.get("worker.id")) out=true;

        // if(out==false) console.log(aUser.get("username")+" has no permission to complete Task '"+aTask.get("title")+"'.");

        return out;
    },
    canReopenTask: function(user){
        var aUser = user;
        var aTask = this;
        var out= false;
        //check if user is project-contribiutor
        var projectContributors = aTask.get("project.contributors");
        var i = projectContributors.length;
        while (i--) {
            if (projectContributors[i].get("id") === aUser.get("id")){
                //check if user is a projectAdmin
                if(projectContributors[i].get("permission")==3){
                    out=true;
                } 
            } 
        };
        //check if user is project owner
        var prOwner = aTask.get("project.owner");
        if(aUser.get("id")==prOwner.get('id')) out=true;

        // if(out==false) console.log(aUser.get("username")+" has no permission to reopen Task '"+aTask.get("title")+"'.");

        return out;
    },
	matchesSearch: function(word) {
		word = word.toLowerCase();
		var title = this.get("title");
		return (!!title && (title.toLowerCase().indexOf(word)!=-1));
	},    
});

DS.AuthenticatedRESTAdapter.map('App.Task', {
    dueDate: { key: 'due_date'},
    project: { key: 'project_id'},
    estimatedHours: { key: 'estimated_hours'},
    workedHours: { key: 'worked_hours'},
    // comments: {key: 'comment_ids'}
    creator: { key: 'creator_id'},
    worker: { key: 'worker_id'},
    completedBy: { key: 'completed_by'},
    timesessions: {key: 'time_session_ids'}
});
