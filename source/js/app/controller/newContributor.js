App.NewContributorController = Ember.Controller.extend({
    project: null,
    possiblePermissions: [Ember.Object.create({name:"Reader",id:1}), Ember.Object.create({name:"Writer",id:2}), Ember.Object.create({name:"Admin",id:3})],
	possibleUsers: function() {
		var coworkers = this.get('project.coworkers');
		var owner = this.get('project.owner');
		var people =  App.get("session.sessionUser.acceptedContacts");
		return people.filter(function(item) {
			item = item.get('originalModel');
			if (item == owner.get('originalModel'))  return false;
			var isAlreadyContributor = coworkers && coworkers.find(function(contr){return contr.get('user') == item;});
			return  !isAlreadyContributor;
		});
	}.property("project.contributors.@each.user","App.session.sessionUser.acceptedContacts.[]"),
    save: function(user,permission) {
		var coworker = App.store.createRecord(App.ProjectCoworker,  { project: this.get("project"), user: user, permission: permission});
		showFlashMessageFor(coworker);
		this.get('project.coworkers').addObject(coworker);
		App.store.commit();
	}
});
App.EditContributorsController = Ember.ObjectController.extend({
    possiblePermissions: [Ember.Object.create({name:"Reader",id:1}), Ember.Object.create({name:"Writer",id:2}), Ember.Object.create({name:"Admin",id:3})],
    filterText:"",
    removeAsContributor: function(user) {
		var coworker = user.get("projectCoworker");
		showFlashMessageFor(coworker);
		coworker.deleteRecord();
		App.store.commit();
	}
});
