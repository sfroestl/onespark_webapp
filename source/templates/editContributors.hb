{{view App.UserListView 
  title="Edit contributors"
  usersBinding="controller.content.contributors"
  controlsBinding="App.EditContributorsControlsView" 
  filterBinding="controller.filterText"
  noUsers="This project doesn't have contributors."
  noFilteredUsers="Your search doesn't matches any contributors."}}
