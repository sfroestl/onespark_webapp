App.ContributorsView = Ember.View.extend({
  templateName: 'contributors',
  showSearch: function() {
	  return this.get("controller.content.contributors.length")>1;
  }.property("controller.content.contributors.length")
});
