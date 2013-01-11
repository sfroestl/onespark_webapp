<p>Search {{view Ember.TextField valueBinding="controller.query"}}</p>
{{view App.UserListView
  title="Matching Users"
  usersBinding="controller.allUsers"
  filterBinding="controller.query"
  showFilter=false
  noUsers="There are no records to display."
  noFilteredUsers="Your search didn't match any contributor."}}
