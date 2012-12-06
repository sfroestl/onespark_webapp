<div><a {{action goToNewProject href=true}} class="new-project-button">add project</a></div>
{{view App.ProjectListView title="Owned Projects" projectsBinding="controller.ownedProjects"}}
{{view App.ProjectListView title="Contributed Projects" projectsBinding="controller.collaboratedProjects"}}
