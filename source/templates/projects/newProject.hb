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