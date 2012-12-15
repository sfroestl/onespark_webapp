App.EditContributorsView = Ember.View.extend({
  tagName: "form",
  filter:"",
  templateName: 'editContributors',
});
App.EditContributorsControlsView = Ember.View.extend({
  templateName: 'editContributorsControls',
  permissionBinding: "user.projectCoworker.permission",
  user: null,
  updatePermission: function() {
//	var current = this.get("user.projectCoworker.permission");
	var newValue = this.get("permission");
//	if (current!=newValue) {
		this.set("user.projectCoworker.permission",newValue);
		showFlashMessageFor(this.get("user.projectCoworker"));
		App.store.commit();
//	}
  }.observes("permission"),
});
