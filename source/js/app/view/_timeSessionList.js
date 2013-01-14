App.HistoryTimeSessionListView = App.RecordListView.extend({
  title: "Time Sessions",
  image: Ember.View.extend({template: Ember.Handlebars.compile('')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{#if this.end}}From: {{view "App.DateTimeView" timeBinding="start"}}<br/>To: {{view "App.DateTimeView" timeBinding="end"}} ({{this.duration}}){{/if}}')}),
  sortings: [
    Ember.Object.create({name:"start",sortProperties:["start"]}),
    Ember.Object.create({name:"end",sortProperties:["end"]}),
  ],
  clickedRecord: function(record){
    App.router.send("goToSingleTimeSession", record);
  }
});

App.OpenTimeSessionListView = App.RecordListView.extend({
  title: "Time Sessions",
  image: Ember.View.extend({template: Ember.Handlebars.compile('')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{view "App.DateTimeView" timeBinding="start"}}<button {{action goStopTimeSession}} class="btn-submit">stop</button>')}),
  sortings: [
    Ember.Object.create({name:"start",sortProperties:["start"]}),
    Ember.Object.create({name:"end",sortProperties:["end"]}),
  ],
  clickedRecord: function(record){
    App.router.send("goToSingleTimeSession", record);
  }
});