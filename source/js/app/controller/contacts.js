App.ContactsController =  Ember.Controller.extend({
	allContactsBinding: "App.session.sessionUser.contactsByStatus",
  contacts: function() {
    return this.get("allContacts").filterProperty("status","accepted");
  }.property("allContactsBinding.@each.status"), // refreshes if a status is changed
  pendingContacts: function() {
    return this.get("allContacts").filterProperty("status","pending")
  }.property("allContactsBinding.@each.status"), // refreshes if a status is changed
  requestedContacts: function() {
    return this.get("allContacts").filterProperty("status","requested")
  }.property("allContactsBinding.@each.status"), // refreshes if a status is changed

  deleteContact: function(user) {
    var contact = user;
    this.get("allContacts").removeObject(contact);
    contact = contact.get("contactModel");
    contact.get("user.outContacts").removeObject(contact);
    //contact.get("contact.inContacts").removeObject(contact);
    contact.deleteRecord();
    App.store.commit();
  }
});

    
