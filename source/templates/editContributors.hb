{{view App.UserListView
  title="Edit contributors"
  usersBinding="controller.content.contributors"
  controlsBinding="App.EditContributorsControlsView"
  filterBinding="controller.filterText"
  noUsers="This project doesn't have any contributors."
  noFilteredUsers="Your search didn't match any contributor."}}
