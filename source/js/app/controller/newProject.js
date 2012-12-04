App.NewProjectController = Ember.Controller.extend({
    title: null,
    description: null,
    owner: App.get('session.sessionUser'),
    dueDate: null,

    save: function() {
		var title = this.get("title");

		var project = App.store.createRecord(App.Project,  { title: title, desc: this.get("description"), owner: this.get("owner"), dueDate: this.get("dueDate")});
		showFlashMessageFor(project);
		App.get('session.sessionUser.ownedProjects').addObject(project);
    
		App.store.commit();
	}
});
