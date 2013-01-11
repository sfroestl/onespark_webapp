App.UserListView = App.RecordListView.extend({
  title: "User List",
  image: Ember.View.extend({template: Ember.Handlebars.compile('<img {{bindAttr src="record.displayAvatarUrl"}} >')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{displayName}}')}),
  sortings: [
    Ember.Object.create({name:"forename",sortProperties:["forenameOrUsername"]}),
    Ember.Object.create({name:"surname",sortProperties:["surnameOrUsername"]}),
  ]
});
