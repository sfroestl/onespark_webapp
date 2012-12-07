
App.FriendlyTimeView = Ember.View.extend({
  classNameBindings: ['absolute'],
  tagName:"span",
  template: Ember.Handlebars.compile('{{view.friendlyTime}}'),
  absolute: false,
  time: null,
  friendlyTime: function() {
	  var time = this.get("time");
	  if (!time) return "";
	  var time= moment(time);
	  var absolute = this.get("absolute");
	  if (absolute) return time.format("LL");
	  var currentTime = App.get("currentTime");
	  return time.from(currentTime);
  }.property("App.currentTime","date","absolute"),
  click: function(event){
    this.set("absolute",!this.get("absolute"));
  }
  
});

window.setInterval(function(){
	App.set("currentTime",moment());
}, 1000);
