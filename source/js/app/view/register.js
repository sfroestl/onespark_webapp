App.RegisterView = Ember.View.extend({
  tagName: "form",
  templateName: 'register',
  classNames:['register-form'],
  userBinding: 'App.User'
});