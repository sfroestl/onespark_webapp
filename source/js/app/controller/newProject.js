App.NewProjectController = Ember.Controller.extend({
    title: null,
    description: null,
    owner: App.get('session.sessionUser'),
    dueDate: null,

    save: function() {
    
    var project = App.store.createRecord(App.Project,  { title: this.get("title"), desc: this.get("description"), owner: this.get("owner"), dueDate: this.get("dueDate")});
    App.store.commit();
	}
});
