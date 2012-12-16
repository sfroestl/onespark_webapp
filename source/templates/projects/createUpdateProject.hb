{{#if updateFlag}}
<h1><legend>Edit project</legend></h1>
{{/if}}
{{#if createFlag}}
<h1><legend>New project</legend></h1>
{{/if}}	

<table>
	<tr>
		<td>title:</td>
		<td>{{view Ember.TextField valueBinding="title" id="title"}}</td>
	</tr>
	<tr>
		<td>description:</td>
		<td>{{{view Ember.TextField valueBinding="description"}}</td>
	</tr>	
	<tr>
		<td>due date (Year-Month-Day):</td>
		<td>{{view Ember.TextField valueBinding="dueDate" type="date"}}</td>
	</tr>	
</table>
{{#if updateFlag}}
<button {{action goUpdate content}}>save Changes</button>
{{/if}}
{{#if createFlag}}
<button {{action goCreate}}>create</button>
{{/if}}
		

