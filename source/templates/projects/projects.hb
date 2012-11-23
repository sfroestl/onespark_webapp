<span><a {{!action goToAddProject href=true}}>+ add project</a></span>
{{view App.ProjectListView title="Owned Projects" projectsBinding="controller.ownedProjects"}}
{{view App.ProjectListView title="Contributed Projects" projectsBinding="controller.collaboratedProjects"}}
