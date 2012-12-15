App.NewProjectController = Ember.Controller.extend({
    title: null,
    description: null,
    owner: App.get('session.sessionUser'),
    dueDate: null,

    save: function() {
		var newtitle = this.get("title");
		var newdesc = this.get("description");
		var newowner = this.get("owner");
		var newduedate = new Date(this.get("dueDate"));

		var project = App.store.createRecord(App.Project,  { title: newtitle, desc: newdesc, owner: newowner, dueDate: newduedate});
		showFlashMessageFor(project);
		App.get('session.sessionUser.ownedProjects').addObject(project);
    
		App.store.commit();
	}
});
