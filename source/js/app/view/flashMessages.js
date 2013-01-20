App.FlashMessagesView = Ember.View.extend({
  tagName: "ul",
  templateName: 'flashMessages',
  classNames:['flash', 'clearfix'],

// TODO: Fadeout!
  // didInsertElement: function(){
  // 	flash = $('.flash li');
  // 	$(flash).delay(1000).fadeOut(200);
  // 	$(flash).remove();
  // }
});
