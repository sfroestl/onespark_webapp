
App.DateTimeView = Ember.View.extend({
  classNameBindings: ['absolute'],
  tagName:"span",
  template: Ember.Handlebars.compile('{{view.dateTime}}'),
  absolute: false,
  time: null,
  dateTime: function() {
	  var time = this.get("time");
	  if (!time) return "";
    // console.log(time);
	  var time= moment(time).format("ddd DD.MM.YYYY HH:mm");
    // console.log(time);
    // time.;
   //  console.log(time);
	  // var absolute = this.get("absolute");
	  // if (absolute) return time.format("LL");
	  // var currentTime = App.get("currentTime");
	  return time;
  }.property("App.currentTime","date","absolute"),
  click: function(event){
    this.set("absolute",!this.get("absolute"));
  }
  
});

window.setInterval(function(){
	App.set("currentTime",moment());
}, 1000);
