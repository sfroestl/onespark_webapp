{{view App.UserListView title="Contributors" usersBinding="controller.content.contributors"}}
<a {{action "goToNewContributor" href="true"}}>Hinzufügen</a>
<a {{action "goToEditContributors" href="true"}}>Bearbeiten</a>
