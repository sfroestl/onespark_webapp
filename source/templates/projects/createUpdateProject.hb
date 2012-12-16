<h1><legend>{{#if content.id}}Edit{{else}}new{{/if}} project</legend></h1>	

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
{{#if content.id}}<button {{action goUpdate content}}>save Changes</button>
{{else}}<button {{action goCreate}}>create</button>
{{/if}}
		

