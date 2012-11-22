App.Project = DS.Model.extend({
    title: DS.attr('string'),
    desc: DS.attr('string'),
    owner: DS.belongsTo('App.User'),
    contributors: DS.hasMany('App.User')
});
DS.AuthenticatedRESTAdapter.map('App.Project', {
	contributors: { key: 'contributor_ids' }
});
