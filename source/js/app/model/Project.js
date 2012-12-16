App.Project = DS.Model.extend({
    title: DS.attr('string'),
    desc: DS.attr('string'),
    dueDate: DS.attr('date'),
    owner: DS.belongsTo('App.User'),
    coworkers: DS.hasMany('App.ProjectCoworker'),
    flashMessageName: function() {
		return "project \""+this.get("title")+"\"";
	}.property("title"),
    contributors: function() {
		return this.get('coworkers').map(function(item, index, self) {
			return App.CoworkerOfProject.create({projectCoworker: item});
		});
	}.property('coworkers','coworkers.[]','coworkers.@each.user'),
    tasks: DS.hasMany('App.Task')

});
DS.AuthenticatedRESTAdapter.map('App.Project', {
  owner: {key: 'owner_id'},
	coworkers: { key: 'project_coworker_ids' },
	dueDate: { key: 'due_date'},
    tasks: { key: 'task_ids'}
});
