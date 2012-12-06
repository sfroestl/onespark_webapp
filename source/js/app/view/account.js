App.AccountView = Ember.View.extend({
  templateName: 'account',
  classNames:[ 'account' ]
});

App.FadeInView = Ember.View.extend({
    didInsertElement: function(){
        this.$().hide().show();
    }
});