<h1>new project</h1>		

		<label>title: </label>{{view Ember.TextField valueBinding="title"}}
		<br/>

		<label>description: </label>{{view Ember.TextField valueBinding="description"}}
		<br/>

		<label>due date (month-day-year): </label>{{view Ember.TextField valueBinding="dueDate" type="date"}}
		<br/>

		<button {{action goSave}}>save</button>

