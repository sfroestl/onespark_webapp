<a {{action "goToNewContributor" href="true"}}>Hinzufügen</a>
<a {{action "goToEditContributors" href="true"}}>Bearbeiten</a>
{{#if view.showSearch}}
<p>Search {{view Ember.TextField valueBinding="controller.filterText"}}</p>
{{/if}}

{{#if controller.admins}}
{{view App.UserListView
  title="Admins"
  usersBinding="controller.admins"
  filterBinding="controller.filterText"
  showFilter=false
  noUsers="This project doesn't have any admins."
  noFilteredUsers="Your search didn't match any contributor."}}
{{/if}}
{{#if controller.writers}}
{{view App.UserListView
  title="Writers"
  usersBinding="controller.writers"
  filterBinding="controller.filterText"
  showFilter=false
  noUsers="This project doesn't have any worker."
  noFilteredUsers="Your search didn't match any contributor."}}
{{/if}}
{{#if controller.readers}}
{{view App.UserListView
  title="Viewers"
  usersBinding="controller.readers"
  filterBinding="controller.filterText"
  showFilter=false
  noUsers="This project doesn't have any viewer."
  noFilteredUsers="Your search didn't match any contributor."}}
{{/if}}

