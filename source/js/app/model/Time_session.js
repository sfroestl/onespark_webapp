App.Time_session = DS.Model.extend({
        start: DS.attr('date'),
        end: DS.attr('date'),
        task: DS.belongsTo('App.Task'),
        user: DS.belongsTo('App.User'),
        flashMessageName: function(){
        	return "TimeSession";
        }.property(),

        duration: function () {
        	var start = this.get('start');
        	var end = this.get('end');
        	var dur = moment.duration((end-start),"milliseconds").humanize();
        	return dur;
        }.property('start','end'),

        workedTime: function(){
        	var start = this.get('start');
        	var end = this.get('end');
        	var now = new Date();
        	if(end!=null){
	        	var duration = end-start;
	        	// console.log("session-duration (mS): "+ duration.toString());
	        	return duration;
	        }
	        else{
	       		var duration = now-start;
	        	// console.log("session-duration (without end) (mS): "+ duration.toString());
	        	return duration;
	        } 

        }.property("start","end"),

        canStop: function(user){
	        var aUser = user;
	        var aTask = this.get("task");
	        var out= false;
	        //check if user is task worker
	        if(aUser.get('id')==aTask.get("worker.id")) out=true;

	        return out;
	    },
});

DS.AuthenticatedRESTAdapter.map('App.Task', {
	task: { key: 'task_id'},
	user: { key: 'user_id'}
});

