App.ProjectsView = Ember.View.extend({
  templateName: 'projects',
  classNames: ['projects']
});

App.ProjectOverviewView = Ember.View.extend({
	templateName: 'projectOverview'
});

App.NewProjectView = Ember.View.extend({
  tagName: "form",
  templateName: 'newProject',
  classNames: ['new-project']
});