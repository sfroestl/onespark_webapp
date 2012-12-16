<<<<<<< HEAD:source/templates/projects/createUpdateProject.hb
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
		

=======
<h1>{{#if content.id}}Edit{{else}}new{{/if}} project</h1>	
<form>
	<fieldset>
	<label for="title">title</label>
	{{view Ember.TextField valueBinding="title" id="title"}}
	</fieldset>
	<fieldset>
	<label for="description">description</label>
	{{{view Ember.TextArea valueBinding="description" id="description"}}
	</fieldset>
	<fieldset>
	<label for="due-date">due date (Year-Month-Day):</label>
	{{view Ember.TextField valueBinding="dueDate" type="date" id="due-date"}}
	</fieldset>
	<fieldset>
	<button {{action goToProjects}} class="btn-cancel">cancel</button>
	<button {{action goSave}} class="btn-submit">create Project</button>
	</fieldset>
</form>
>>>>>>> UIDesign01:source/templates/projects/newProject.hb
