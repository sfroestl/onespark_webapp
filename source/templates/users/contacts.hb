{{view App.UserListView
  title="Contacts"
  usersBinding="controller.contacts"
  noUsers="You don't have any contacts yet."
  noFilteredUsers="Your search didn't match any contact."}}

{{view App.UserListView
title="PendingContacts"
usersBinding="controller.pendingContacts"
noUsers="You don't have any contacts yet."
noFilteredUsers="Your search didn't match any contact."}}

{{view App.UserListView
title="RequestedContacts"
usersBinding="controller.requestedContacts"
noUsers="You don't have any contacts yet."
noFilteredUsers="Your search didn't match any contact."}}