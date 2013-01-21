<div class="project-details">

	<p>
		<span>title:</span>
		<span>{{title}}</span>
	</p>
	<p>
		<span>description:</span>
		<span>{{desc}}</span>
	</p>
	<p>
		<span>owner:</span>
		<span>{{owner.displayName}}</span>
	</p>
	<p>
		<span>due:</span>
		<span>{{view "App.FriendlyTimeView" timeBinding="dueDate"}}</span>
	</p>

</div>

{{view App.UserListView title="Contributors" usersBinding="controller.content.contributors"}}