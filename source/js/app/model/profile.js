App.Profile = DS.Model.extend({
    forename: DS.attr('string'),
    surname: DS.attr('string'),
    city: DS.attr('string'),
    about: DS.attr('string'),
    avatar_url: DS.attr('string'),
    user_id: DS.attr('string'),

    user: DS.belongsTo('App.User')
});