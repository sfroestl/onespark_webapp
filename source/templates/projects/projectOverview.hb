<div>
<table>
	<tr>
		<td>title:</td>
		<td>{{title}}</td>
	</tr>
	<tr>
		<td>description:</td>
		<td>{{desc}}</td>
	</tr>
	<tr>
		<td>owner:</td>
		<td>{{owner.displayName}}</td>
	</tr>
	<tr>
		<td>due:</td>
		<td>{{view "App.FriendlyTimeView" timeBinding="dueDate"}}</td>
	</tr>
</table>
{{view App.UserListView title="Contributors" usersBinding="controller.content.contributors"}}

</div>

