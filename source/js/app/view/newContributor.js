App.NewContributorView = Ember.View.extend({
  tagName: "form",
  templateName: 'newContributor',
});
App.NewContributorControlsView = Ember.View.extend({
  templateName: 'newContributorControls',
  permission: 2,
  record: null,
});
