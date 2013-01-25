App.ContactsView = Ember.View.extend({
	templateName: 'contacts',
	classNames: ['contacts']
});

App.ControlContactView = Ember.View.extend({
  templateName: 'controlContact',
  user: null,
  tagName: 'span',
  classNames: ['contact-ctrl']
});