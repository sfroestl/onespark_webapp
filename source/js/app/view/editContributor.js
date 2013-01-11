App.EditContributorsView = Ember.View.extend({
  tagName: "form",
  filter:"",
  templateName: 'editContributors',
});
App.EditContributorsControlsView = Ember.View.extend({
  templateName: 'editContributorsControls',
  permissionBinding: "record.projectCoworker.permission",
  record: null,
  updatePermission: function() {
	var newValue = this.get("permission");
		this.set("record.projectCoworker.permission",newValue);
		showFlashMessageFor(this.get("record.projectCoworker"));
		App.store.commit();
  }.observes("permission"),
});
