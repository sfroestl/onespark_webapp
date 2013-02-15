<h1>Your Contacts</h1>
<form class="contact-add">
	{{view Ember.TextField valueBinding="newUserField" id="username"}}
	<button {{action goAddContact}} class="btn-submit">Add Contact</button>
</form>

{{view App.UserListView
  title="Contacts"
  recordsBinding="controller.contacts"
  controlsBinding="App.ControlContactView"
  noRecords="You don't have any contacts yet."
  noFilteredRecords="Your search didn't match any contact."}}

{{view App.UserListView
title="PendingContacts"
recordsBinding="controller.pendingContacts"
controlsBinding="App.ControlContactView"
noRecords="You don't have any pending contacts yet."
noFilteredRecords="Your search didn't match any contact."}}

{{view App.UserListView
title="RequestedContacts"
recordsBinding="controller.requestedContacts"
controlsBinding="App.ControlContactView"
noRecords="You don't have any requested contacts yet."
noFilteredRecords="Your search didn't match any contact."}}
