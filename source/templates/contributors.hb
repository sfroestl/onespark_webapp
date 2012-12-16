{{#if view.showSearch}}
<p>Search {{view Ember.TextField valueBinding="controller.filterText"}}</p>
{{/if}}
{{view App.UserListView 
  title="Contributors"
  usersBinding="controller.writers"
  filterBinding="controller.filterText"
  showFilter=false
  noUsers="This project doesn't have any contributors."
  noFilteredUsers="Your search doesn't matches any contributor."}}
{{view App.UserListView 
  title="Administrators"
  usersBinding="controller.admins"
  filterBinding="controller.filterText"
  showFilter=false
  noUsers="This project doesn't have any adminstrators."
  noFilteredUsers="Your search doesn't matches any admin."}}
{{view App.UserListView 
  title="Observators"
  usersBinding="controller.readers"
  filterBinding="controller.filterText"
  showFilter=false
  noUsers="This project doesn't have any observators."
  noFilteredUsers="Your search doesn't matches any observator."}}
  
<a {{action "goToNewContributor" href="true"}}>Hinzufügen</a>
<a {{action "goToEditContributors" href="true"}}>Bearbeiten</a>
