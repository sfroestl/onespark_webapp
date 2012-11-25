App.User = DS.Model.extend({
    username: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    password_confirmation: DS.attr('string'),
    ownedProjects: DS.hasMany('App.Project'),
    collaboratedProjects:DS.hasMany('App.Project'),
    profile: DS.belongsTo('App.Profile'),
    displayName: function() {
	  var forename = this.get("profile.forename");
	  var surname = this.get("profile.surname");
	  if (forename || surname)
		   return ((forename)?forename:"") + ((forename && surname)?" ":"")+((surname)?surname:"");
	  else
		   return this.get("username");
	}.property('profile.forename','profile.surname','username'),
    displayAvatarUrl: function() {
	  return this.get("profile.avatarURL") || imagePath("noavatar.png");
	}.property('profile.avatarURL')
});
DS.AuthenticatedRESTAdapter.map('App.User', {
	ownedProjects: { key: 'owned_project_ids' },
	collaboratedProjects: { key: 'collaborated_project_ids' },
	profile: {embedded: true}
});


