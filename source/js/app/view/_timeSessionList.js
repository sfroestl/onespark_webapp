App.HistoryTimeSessionListView = App.RecordListView.extend({
  title: "Time Sessions",
  image: Ember.View.extend({template: Ember.Handlebars.compile('')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{#if this.end}}{{view "App.DateTimeView" timeBinding="start"}} <b>to</b> {{view "App.DateTimeView" timeBinding="end"}} <i>({{this.duration}})</i>{{/if}}')}),
  // sortings: [
  //   Ember.Object.create({name:"start",sortProperties:["start"]}),
  //   Ember.Object.create({name:"end",sortProperties:["end"]}),
  //   Ember.Object.create({name:"duration",sortProperties:["duration"]}),
  // ],
  clickedRecord: function(record){
    App.router.send("goToSingleTimeSession", record);
  }
});

App.OpenTimeSessionListView = App.RecordListView.extend({
  title: "Time Sessions",
  image: Ember.View.extend({template: Ember.Handlebars.compile('')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{view "App.DateTimeView" timeBinding="start"}}<button {{action goStopTimeSession}} class="btn-submit">stop</button>')}),
  // sortings: [
  //   Ember.Object.create({name:"start",sortProperties:["start"]}),
  //   Ember.Object.create({name:"end",sortProperties:["end"]}),
  //   Ember.Object.create({name:"duration",sortProperties:["duration"]}),
  // ],
  clickedRecord: function(record){
    App.router.send("goToSingleTimeSession", record);
  }
});