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

App.ContactByStatus = Ember.ObjectProxy.extend({
  contactModel: null,
  status: null,
  contentBinding: "contactModel.contact",
  statusBinding: "contactModel.status",
  isAcccpted: function() {
    return this.get("contactModel.status")=="accepted";
  }.property("contactModel.status"),
  stateForCSS: function() {
  var p = this.get("contactModel.status");
  return this.get("content.stateForCSS") + " " + p;
  }.property("content.stateForCSS","contactModel.status")
});
