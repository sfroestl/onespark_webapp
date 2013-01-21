App.ProjectsView = Ember.View.extend({
  templateName: 'projects',
  classNames: ['projects']
});

App.ProjectOverviewView = Ember.View.extend({
	templateName: 'projectOverview'
});

App.CreateUpdateProjectView = Ember.View.extend({
  tagName: "form",
  templateName: 'createUpdateProject',
  classNames: ['new-project', 'createUpdate']
});