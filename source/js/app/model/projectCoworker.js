App.ProjectCoworker = DS.Model.extend({
    permission: DS.attr('number'),
    project: DS.belongsTo('App.Project'),
    user: DS.belongsTo('App.User')
    //tasks: DS.hasMany('App.Task')
});
DS.AuthenticatedRESTAdapter.map('App.Project', {
	project: { key: 'project_id' },
	user: { key: 'user_id' }
});
