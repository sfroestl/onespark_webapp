App.NewContributorController = Ember.Controller.extend({
    project: null,
    user: null,
    permission: 2,
    possiblePermissions: [Ember.Object.create({name:"Reader",id:1}), Ember.Object.create({name:"Writer",id:2}), Ember.Object.create({name:"Admin",id:3})],
    
	possibleUsers: function() {
		var contributors = this.get('project.contributors');
		var owner = this.get('project.owner');
		var people =  App.store.filter(App.User, function(){return true;});
		return people.filter(function(item) {
			var isSelf = item == owner;
			var isAlreadyContributor = contributors && contributors.contains(item);
			return !isSelf && !isAlreadyContributor;
		});
	}.property("project.contributors.@each.user","project.owner"),
    save: function() {
		var coworker = App.store.createRecord(App.ProjectCoworker,  { project: this.get("project"), user: this.get("user"), permission: this.get("permission")});
		showFlashMessageFor(coworker);
		this.get('project.coworkers').addObject(coworker);
		App.store.commit();
	}
});
