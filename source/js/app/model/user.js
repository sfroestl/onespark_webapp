App.User = DS.Model.extend({
    username: DS.attr('string'),
    email: DS.attr('string'),
    ownedProjects: DS.hasMany('App.Project', { key: 'owned_project_ids' }),
    collaboratedProjects:DS.hasMany('App.Project', { key: 'collaborated_project_ids' }),
    profile: DS.belongsTo('App.Profile')
});
