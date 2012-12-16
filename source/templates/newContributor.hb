{{view App.UserListView
  title="Add contributors"
  usersBinding="controller.possibleUsers"
  controlsBinding="App.NewContributorControlsView"
  filterBinding="controller.filter"
  noUsers="You already have added everybody to the project."
  noFilteredUsers="Your search doesn't matches any of your contacts."
}}
