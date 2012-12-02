App.AccountView = Ember.View.extend({
  templateName: 'account',
});

App.FadeInView = Ember.View.extend({
    didInsertElement: function(){
        this.$().hide().show();
    }
});