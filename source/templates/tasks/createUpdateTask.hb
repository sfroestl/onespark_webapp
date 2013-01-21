{{#if updateFlag}}
<h1>Edit "{{title}}"</h1>
{{/if}}
{{#if createFlag}}
<h1>New task</h1>
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
	<label for="estimatedHours">estimated hours</label>
	{{{view Ember.TextField valueBinding="estimatedHours" id="estimatedHours" placeholder="0"}}
	</fieldset>

	<fieldset>
		<label for="assign">Who is responsible</label>
 	{{view Ember.Select
       contentBinding="possibleWorkers"
       valueBinding="worker"
       id="assign"
       optionValuePath="content"
       optionLabelPath="content.username"}}
    </fieldset>

	<fieldset>
	<fieldset>
	<button {{action cancel}} class="btn-cancel"><img src="images/icon-cancel.png">cancel</button>
	{{#if updateFlag}}
	<button {{action goUpdate content}} class="btn-submit"><img src="images/icon-accept.png">save Changes</button>
	{{/if}}
	{{#if createFlag}}
	<button {{action goCreate}} class="btn-submit"><img src="images/icon-accept.png">create Task</button>
	{{/if}}
	</fieldset>
</form>

