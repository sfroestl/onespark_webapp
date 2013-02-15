App.NewContributorView = Ember.View.extend({
  tagName: "form",
  templateName: 'newContributor',
});
App.NewContributorControlsView = Ember.View.extend({
  templateName: 'newContributorControls',
  classNames: ['add-contrib'],
  tagName: 'span',
  permission: 2,
  record: null,
});
