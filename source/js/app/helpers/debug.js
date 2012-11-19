Handlebars.registerHelper('debug', function(property, options) {
  var value = Ember.Handlebars.get(this, property, options);
  return new Handlebars.SafeString('<span class="highlight">'+value+'</span>');
});
