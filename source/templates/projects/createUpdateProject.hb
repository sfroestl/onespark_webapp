{{#if updateFlag}}
<h1>Edit project</h1>
{{/if}}
{{#if createFlag}}
<h1>New project</h1>
{{/if}}	
<form>
	<fieldset>
	<label for="title">title</label>
	{{view Ember.TextField valueBinding="title" id="title" placeholder="title"}}
	</fieldset>
	<fieldset>
	<label for="description">description</label>
	{{{view Ember.TextArea valueBinding="description" id="description" placeholder="description"}}
	</fieldset>
	<fieldset class="duedate">
	<label for="due-date">due date:</label>
	{{view Ember.TextField valueBinding="dueDate" type="date" id="due-date" placeholder="YYYY-MM-DD"}}
	</fieldset>
	<fieldset class="hours">
	<label for="due-time">due time:</label>
	{{view Ember.TextField valueBinding="dueTime"  id="due-time" placeholder="HH:mm"}}
	</fieldset>
	<fieldset>
	<button {{action goBack}} class="btn-cancel"><img src="images/icon-cancel.png">cancel</button>
	{{#if updateFlag}}
	<button {{action goUpdate content}} class="btn-submit">
		<img src="images/icon-accept.png">save Changes</button>
	{{/if}}
	{{#if createFlag}}
	<button {{action goCreate}} class="btn-submit"><img src="images/icon-accept.png">create Project</button>
	{{/if}}
	</fieldset>
</form>

