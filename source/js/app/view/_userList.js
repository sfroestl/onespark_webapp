App.UserListRowView = Ember.View.extend({
	templateName: "userListRow",
});
App.UserListView = App.RecordListView.extend({
  title: "User List",  
  content: null,
  noRecords: "No users to display.",
  noMatchingRecords: "No user matches your search.",  
  sortings: [
    Ember.Object.create({name:"surname",sortProperties:['surnameOrUsername']}),
    Ember.Object.create({name:"forename",sortProperties:['forenameOrUsername']})
  ],
  recordRow: App.UserListRowView,
  controls: null,
});

