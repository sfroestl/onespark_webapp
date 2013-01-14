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
	<fieldset>
	<label for="due-date">due date:</label>
	{{view Ember.TextField valueBinding="dueDate" type="date" id="due-date" placeholder="YYYY-MM-DD"}}
	</fieldset>
	<fieldset>
	<label for="estimatedHours">estimated hours</label>
	{{{view Ember.TextArea valueBinding="estimatedHours" id="estimatedHours" placeholder="0"}}
	</fieldset>

	<fieldset>
 	{{view Ember.Select
       contentBinding="possibleWorkers"
       valueBinding="worker"
       optionValuePath="content"
       optionLabelPath="content.username"}}
    </fieldset>

	<fieldset>
	<fieldset>
	<button {{action cancel}} class="btn-cancel">cancel</button>
	{{#if updateFlag}}
	<button {{action goUpdate content}} class="btn-submit">save Changes</button>
	{{/if}}
	{{#if createFlag}}
	<button {{action goCreate}} class="btn-submit">create Task</button>
	{{/if}}
	</fieldset>
</form>

