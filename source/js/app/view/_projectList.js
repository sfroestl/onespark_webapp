App.ProjectListView = App.RecordListView.extend({
  title: "Project List",
  image: Ember.View.extend({
	  template: Ember.Handlebars.compile(''),
	  classNames: ["elem-image"],
	  tagName: "span"
  }),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{title}}{{#if dueDate}} <span class="project-due-date"> (due {{view "App.FriendlyTimeView" timeBinding="dueDate"}})</span>{{/if}}'),
	  classNames: ["elem-desc"],
	  tagName: "span"
  }),
  sortings: [
    Ember.Object.create({name:"title",sortProperties:["title"]}),
    Ember.Object.create({name:"due date",sortProperties:["dueDate"]}),
  ],
  clickedRecord: function(record){
    App.router.send("showProject", record);
  }
});
