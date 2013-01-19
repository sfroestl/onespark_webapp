App.UserListView = App.RecordListView.extend({
  title: "User List",
  image: Ember.View.extend({
	  template: Ember.Handlebars.compile('<img {{bindAttr src="record.displayAvatarUrl"}} >'),
	  classNames: ["elem-image"],
	  tagName: "span"
  }),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{displayName}}'),
	  classNames: ["elem-desc"],
	  tagName: "span"
  }),
  sortings: [
    Ember.Object.create({name:"forename",sortProperties:["forenameOrUsername"]}),
    Ember.Object.create({name:"surname",sortProperties:["surnameOrUsername"]}),
  ],
  
  clickedRecord: function(record){
    App.router.send("goToContactsProfile", record);
  }
});
