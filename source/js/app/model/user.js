App.User = DS.Model.extend({
	//simple attributes
    username: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    password_confirmation: DS.attr('string'),
    tasks: DS.hasMany('App.Task'),
    //Relations
    ownedProjects: DS.hasMany('App.Project'),
    profile: DS.belongsTo('App.Profile'),
    projectCoworkers:DS.hasMany('App.ProjectCoworker'),
    //computed Relation
    collaboratedProjects: null,
    _updateCollaboratedProjects: function() {
		this.set("collaboratedProjects.[]",this.get("projectCoworkers").map(function(item){
			return item.get("project");
		}));
	}.observes("projectCoworkers.@each.project"),
	
	//Computed Properties
	
	//Displayed Name
    displayName: function() {
	  var forename = this.get("profile.forename");
	  var surname = this.get("profile.surname");
	  if (forename || surname)
		   return ((forename)?forename:"") + ((forename && surname)?" ":"")+((surname)?surname:"");
	  else
		   return this.get("username");
	}.property('profile.forename','profile.surname','username'),
	//URL of displayed Avatar
    displayAvatarUrl: function() {
	  return this.get("profile.avatarUrl") || imagePath("noavatar.png");
	}.property('profile.avatarUrl'),
	
	forenameOrUsername: function() {
	  	var name= this.get("profile.forename") || this.get("username");
	  	return name && name.toLowerCase();
	}.property('profile.forename','username'),
	surnameOrUsername: function() {
	  	var name= this.get("profile.surname") || this.get("username");
	  	return name && name.toLowerCase();
	}.property('profile.surname','username'),	
	//functions
	matchesSearch: function(word) {
		word = word.toLowerCase();
		
		var username = this.get("username");
		var email = this.get("email");
		var displayName = this.get("displayName");
		return (!!username && (username.toLowerCase().indexOf(word)!=-1)) ||
		(!!email && email.toLowerCase().indexOf(word)!=-1) ||
		(!!displayName && displayName.toLowerCase().indexOf(word)!=-1);
	},
	init: function() {
	  this._super(); //do this first
	  this.set("collaboratedProjects",[]);
	}
});
DS.AuthenticatedRESTAdapter.map('App.User', {
	ownedProjects: { key: 'owned_project_ids' },
	projectCoworkers: { key: 'project_coworker_ids' },
	profile: {key: 'profile_id'}
});


