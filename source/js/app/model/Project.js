App.Project = DS.Model.extend({
    title: DS.attr('string'),
    desc: DS.attr('string'),
    owner: DS.attr('string'),
    dueDate: DS.attr('date'),
    owner: DS.belongsTo('App.User'),
    coworkers: DS.hasMany('App.ProjectCoworker'),
    contributors: function() {
		return this.get('coworkers').map(function(item, index, self) {
			return item.get('user');
		});
	}.property('coworkers','coworkers.[]','coworkers.@each.user')
    //tasks: DS.hasMany('App.Task')
});
DS.AuthenticatedRESTAdapter.map('App.Project', {
	coworkers: { key: 'project_coworker_ids' },
	dueDate: { key: 'due_date'}
});
