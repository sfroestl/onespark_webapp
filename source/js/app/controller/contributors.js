App.ContributorsController = Ember.ObjectController.extend({
	readers: function() {
	  return this.get("content.contributors").filterProperty("permission",1);
	}.property("content.contributors.@each.permission"),
	writers: function() {
	  return this.get("content.contributors").filterProperty("permission",2);
	}.property("content.contributors.@each.permission"),	
	admins: function() {
	  return this.get("content.contributors").filterProperty("permission",3);
	}.property("content.contributors.@each.permission"),		
});
