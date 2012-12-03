App.NewProjectController = Ember.Controller.extend({
    title: null,
    description: null,
    owner: App.get('session.sessionUser'),
    dueDate: null,

    save: function() {
		var title = this.get("title");
		var fm = App.FlashMessage.create({text: "Saving Project '" + title +"'",removable:false});
		var project = App.store.createRecord(App.Project,  { title: title, desc: this.get("description"), owner: this.get("owner"), dueDate: this.get("dueDate")});
		project.set("didCreate",function() {
			fm.setProperties({removable: true, text: "Project '" + title + "' saved"});
		});
		App.get('session.sessionUser.ownedProjects').addObject(project);
    
		App.store.commit();
	}
});
