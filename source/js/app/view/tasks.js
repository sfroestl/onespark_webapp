App.TasksView = Ember.View.extend({
  templateName: 'tasks',
  classNames: ['tasks']
});

App.SingleTaskView = Ember.View.extend({
	templateName: 'singletask',
	classNames: ['singletask']
});

App.CreateUpdateTaskView = Ember.View.extend({
  tagName: "form",
  templateName: 'createUpdateTask',
  attributeBindings: ['placeholder'],
  classNames: ['createUpdateTask', 'createUpdate'],
});