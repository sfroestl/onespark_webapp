App.TimeSessionListView = App.RecordListView.extend({
  title: "Time Sessions",
  classNames: [ 'time-session'],
  showFilter: false,
  image: Ember.View.extend({template: Ember.Handlebars.compile('')}),
  desc: Ember.View.extend({template: Ember.Handlebars.compile(
    '{{#if this.end}}<span class="duration">{{this.duration}}</span> <span class="details">{{view "App.DateTimeView" timeBinding="start"}} <i>to</i><br />{{view "App.DateTimeView" timeBinding="end"}}</span>{{else}}{{view "App.DateTimeView" timeBinding="start"}} <button {{action goStopTimeSession this}} class="btn-submit">stop</button>{{/if}}')}),
  sortings: [
    Ember.Object.create({name:"start",sortProperties:["start"]}),
    Ember.Object.create({name:"end",sortProperties:["end"]}),
    Ember.Object.create({name:"duration",sortProperties:["duration"]}),
  ],
  // clickedRecord: function(record){
  //   App.router.send("goToSingleTimeSession", record);
  // }
});