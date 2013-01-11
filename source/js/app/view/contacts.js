App.ContactsView = Ember.View.extend({
	templateName: 'contacts'
});

App.RemoveContactView = Ember.View.extend({
  templateName: 'removeContact',
  user: null,
});

App.CancelContactView = Ember.View.extend({
  templateName: 'cancelContact',
  user: null,
});

App.AcceptContactView = Ember.View.extend({
  templateName: 'acceptContact',
  user: null,
});