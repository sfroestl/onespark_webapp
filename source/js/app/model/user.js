App.User = DS.Model.extend({
    username: DS.attr('string'),
    email: DS.attr('string'),
    ownedProjects: DS.hasMany('App.Project'),
    collaboratedProjects:DS.hasMany('App.Project'),
    profile: DS.belongsTo('App.Profile')
});
DS.AuthenticatedRESTAdapter.map('App.User', {
	ownedProjects: { key: 'owned_project_ids' },
	collaboratedProjects: { key: 'collaborated_project_ids' }
});
