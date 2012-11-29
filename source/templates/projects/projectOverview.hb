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
		<td>due date:</td>
		<td>{{dueDate}}</td>
	</tr>
</table>
{{view App.UserListView title="Contributors" usersBinding="controller.content.contributors"}}

</div>
