<a {{action goToNewProject href=true}} class="new-project-button project-elem clearfix">
	<span class="add-img"><img src="images/icon-add.png"></span>
	<span class="add-txt">add project</span>
</a>


{{view App.ProjectListView title="Your own Projects" recordsBinding="controller.ownedProjects"}}
{{view App.ProjectListView title="Projects you contribute to" recordsBinding="controller.collaboratedProjects"}}
