{{view App.UserListView
  title="Contacts"
  usersBinding="controller.contacts"
  controlsBinding="App.ControlContactView"
  noUsers="You don't have any contacts yet."
  noFilteredUsers="Your search didn't match any contact."}}

{{view App.UserListView
title="PendingContacts"
usersBinding="controller.pendingContacts"
controlsBinding="App.ControlContactView"
noUsers="You don't have any pending contacts yet."
noFilteredUsers="Your search didn't match any contact."}}

{{view App.UserListView
title="RequestedContacts"
usersBinding="controller.requestedContacts"
controlsBinding="App.ControlContactView"
noUsers="You don't have any requested contacts yet."
noFilteredUsers="Your search didn't match any contact."}}