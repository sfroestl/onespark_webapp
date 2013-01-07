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

    classForCSS: function(){
        return this._super()+" "+completed ? "complete":"incomplete";
    },
    canEditTask: function(user){
        var aUser = user;
        var out= false;
        //check if user is project-contribiutor
        var projectContributors = this.project.get("contributors");
        console.log("projectcontributors: "+projectContributors);
        var i = projectContributors.length;
        while (i--) {
            if (projectContributors[i].get("id") === aUser.get("id")){
                console.log(aUser+" is project-contribiutor");
                //check if user is a projectAdmin
                if(projectContributors[i].get("permission")==3){
                    out=true;
                    console.log(aUser+" is projectAdmin");
                } 
            } 
        };
        //check if user is task creator
        if(aUser.get("id")==this.creator.get("id")) out=true;
        if(aUser.get('id')==this.worker.get('id')) out=true;

        return out;
    }   
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
});
