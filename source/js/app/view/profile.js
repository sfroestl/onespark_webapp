App.ProfileView = Ember.View.extend({
  templateName: 'profile',
    isDetailViewable: true,
    clickMeToToggleDetail: function() {
        this.set('isDetailViewable', !this.get('isDetailViewable'));
        console.log(this.isDetailViewable); 
    }
});
/*
App.FadeInView = Ember.View.extend({
    didInsertElement: function(){
        this.$().hide().show();
    }
});*/