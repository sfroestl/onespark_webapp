App.ContactsController =  Ember.Controller.extend({
  username: '',
	allContactsBinding: Ember.Binding.oneWay("App.session.sessionUser.contactsByStatus.[]"),
  contacts: function() {
    return this.get("allContacts").filterProperty("status","accepted");
  }.arrayProperty("allContacts.@each.status"), // refreshes if a status is changed
  pendingContacts: function() {
    return this.get("allContacts").filterProperty("status","pending")
  }.arrayProperty("allContacts.@each.status"), // refreshes if a status is changed
  requestedContacts: function() {
    return this.get("allContacts").filterProperty("status","requested")
  }.arrayProperty("allContacts.@each.status"), // refreshes if a status is changed
  removeContact: function(user) {
    contact = user.get("contactModel");
    //contact.get("contact.inContacts").removeObject(contact);
    //contact.get("user.outContacts").removeObject(contact);
    contact.deleteRecord();
    App.store.commit();
    showFlashMessageFor(contact);
    //this.get("allContacts").removeObject(contact);
  },
  acceptContact: function(user) {
    contact = user.get("contactModel");
    //contact.get("user.outContacts").addObject(contact);
    contact.set("status", "accepted");
    App.store.commit();
    showFlashMessageFor(contact);
  },
  addContact: function() {
    var self = this;
    var textInput = this.get("newUserField");
    //do API call to get contact via username
    var newContact = App.store.findQuery(App.User, { username: textInput });

    newContact.addObserver('isLoaded', function() {
      if (newContact.get('isLoaded')) {
        console.log("User is loaded", newContact.get("firstObject"));
        var contact = App.store.createRecord(App.Contact,  { contact: newContact.get("firstObject"), status:"pending" });
        showFlashMessageFor(contact);
        App.store.commit();
        self.get("allContacts").addObject(contact.get("contact"));

        console.log("User is loaded", contact.get("status"));
      } else {
          console.log("User is NOT loaded");
          showFlashMessageFor(newContact);
      }
    });
  }
});
