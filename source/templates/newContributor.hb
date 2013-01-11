{{view App.UserListView
  title="Add contributors"
  recordsBinding="controller.possibleUsers"
  controlsBinding="App.NewContributorControlsView"
  filterBinding="controller.filter"
  noRecords="All your contacts are added to this project."
  noFilteredRecords="Your search didn't match any of your contacts."
}}
