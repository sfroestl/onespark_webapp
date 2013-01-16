App.Time_session = DS.Model.extend({
        start: DS.attr('date'),
        end: DS.attr('date'),
        task: DS.belongsTo('App.Task'),
        user: DS.belongsTo('App.User'),
        duration: function () {
        	var start = this.get('start');
        	var end = this.get('end');
        	var dur = moment.duration((end-start),"milliseconds").humanize();

        	console.log(dur);
        	return dur;
        }.property('start','end'),
});

DS.AuthenticatedRESTAdapter.map('App.Task', {
	task: { key: 'task_id'},
	user: { key: 'user_id'}
});

