<form>
	<fieldset>
	<label>New Contact</label>
		{{view Ember.TextField valueBinding="username" id="username"}}
	</fieldset>
	<fieldset>
		<button {{action goAddContact}} class="btn-submit">Add</button>
	</fieldset>
</form>

{{view App.UserListView
  title="Contacts"
  recordsBinding="controller.contacts"
  controlsBinding="App.RemoveContactView"
  noRecords="You don't have any contacts yet."
  noFilteredRecords="Your search didn't match any contact."}}

{{view App.UserListView
title="PendingContacts"
recordsBinding="controller.pendingContacts"
controlsBinding="App.CancelContactView"
noRecords="You don't have any pending contacts yet."
noFilteredRecords="Your search didn't match any contact."}}

{{view App.UserListView
title="RequestedContacts"
recordsBinding="controller.requestedContacts"
controlsBinding="App.AcceptContactView"
noRecords="You don't have any requested contacts yet."
noFilteredRecords="Your search didn't match any contact."}}
