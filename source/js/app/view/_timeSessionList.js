App.TimeSessionListView = App.RecordListView.extend({
  title: "Time Sessions",
  image: Ember.View.extend({template: Ember.Handlebars.compile('')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile('{{view "App.DateTimeView" timeBinding="start"}}{{#if this.end}} <b>to</b> {{view "App.DateTimeView" timeBinding="end"}} <i>({{this.duration}})</i>{{else}} <button {{action goStopTimeSession this}} class="btn-submit">stop</button>{{/if}}')}),
  sortings: [
    Ember.Object.create({name:"start",sortProperties:["start"]}),
    Ember.Object.create({name:"end",sortProperties:["end"]}),
    Ember.Object.create({name:"duration",sortProperties:["duration"]}),
  ],
  // clickedRecord: function(record){
  //   App.router.send("goToSingleTimeSession", record);
  // }
});