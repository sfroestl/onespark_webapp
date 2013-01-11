<a {{action goToNewTask href=true}} class="new-task-button task-elem clearfix">
	<span class="add-img"><img src="/images/icon-add.png"></span>
	<span class="add-txt">add task</span>
</a>


{{view App.ProjectListView title="open tasks" recordsBinding="tasks"}}
