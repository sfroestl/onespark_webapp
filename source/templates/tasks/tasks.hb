{{#if canAddTasks}}
<!-- TODO Hacky: warum zieht Tasks nicht wie Contributors oder Overview das Context menu? -->
<ul class="context-menu clearfix">
	<li>
		<a {{action goToNewTask href=true}} class="new-task-button task-elem clearfix">
			<span class="add-img"><img src="images/icon-add.png"></span>
			<span class="add-txt">add task</span>
		</a>
	</li>
</ul>
{{/if}}

{{view App.TaskListView title="open tasks" recordsBinding="openTasks"}}
{{view App.TaskListView title="completed tasks" recordsBinding="completedTasks"}}
