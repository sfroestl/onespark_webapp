App.Project = DS.Model.extend({
    title: DS.attr('string'),
    desc: DS.attr('string'),
    //owner: DS.attr('string'),
    dueDate: DS.attr('date'),
    owner: DS.belongsTo('App.User'),
    contributors: DS.hasMany('App.User'),
    //tasks: DS.hasMany('App.Task')

    // didCreate: function() {
    //     alert(this.get('title') + " finished creating.");
    // },

    // isDeleted: function() {
    //     alert(this.get('title') + " finished deleting.");
    // }

});
DS.AuthenticatedRESTAdapter.map('App.Project', {
  owner: {key: 'owner_id'},

	contributors: { key: 'contributor_ids' },
	dueDate: { key: 'due_date'}
});