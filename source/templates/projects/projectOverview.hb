<div>
<span>title: {{title}}<span><br/>
<span>description: {{desc}}</span><br/>
<span>owner: {{owner.displayName}}</span><br/>
<span>due date: {{dueDate}}</span><br/>
{{view App.UserListView title="Contributors" usersBinding="controller.content.contributors"}}
</div>
