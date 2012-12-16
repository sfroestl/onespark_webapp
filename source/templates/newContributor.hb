{{view App.UserListView
  title="Add contributors"
  usersBinding="controller.possibleUsers"
  controlsBinding="App.NewContributorControlsView"
  filterBinding="controller.filter"
  noUsers="All your contacts are added to this project."
  noFilteredUsers="Your search didn't match any of your contacts."
}}
