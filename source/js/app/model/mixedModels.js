App.CoworkerOfProject = Ember.ObjectProxy.extend({
  projectCoworker: null,
  permission: null,
  contentBinding: "projectCoworker.user",
  permissionBinding: "projectCoworker.permission",

  stateForCSS: function() {
	var p = this.get("projectCoworker.permission");
	var permissions = ["reader","writer","admin"];
	return this.get("content.stateForCSS") + " " + permissions[p-1];
  }.property("content.stateForCSS","projectCoworker.permission")
  
});
