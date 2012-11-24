App.Profile = DS.Model.extend({
    forename: DS.attr('string'),
    surname: DS.attr('string'),
    city: DS.attr('string'),
    about: DS.attr('string'),
    avatarUrl: DS.attr('string'),
    user: DS.belongsTo('App.User')
});
DS.AuthenticatedRESTAdapter.map('App.Profile', {
	user: { key: 'user_id' },
	avatarUrl: { key: 'avatar_url' }
});
