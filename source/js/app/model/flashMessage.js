
App.FlashMessage = Ember.Object.extend({
    text:"",
    type:null,
    buttonAction:function() {
		this.hide();	
	},
    buttonText:"ok",
    init: function() {
		//App.flashMessages.addObject(this);
		App.set("flashMessage",this);
	},
	hide: function() {
		//App.flashMessages.removeObject(this);
		App.set("flashMessage",null);
	}
});
App.ModelFlashMessage = App.FlashMessage.extend({
	content:null,
	editAction: null,
	type: function() {
		return this.get('content.stateForCSS');
	}.property('content.stateForCSS'),
    objectName: function() {
			return this.get("content.flashMessageName")|| "object";
	}.property("content.flashMessageName"),
    buttonAction: function() {
	  if (!this.get("content.isValid")) App.router.send(this.get("editAction"),this.get("content"));
	  /*if (this.get("content.isError")) {
		App.store.commit();
		return; //don't hide the box  
	  };*/
	  this.hide();
	},		
    buttonText: function() {
	  if (!this.get("content.isValid")) return "edit";
	  //if (this.get("content.isError")) return "retry";
	  if (this.get("content.isSaving")) return null;
	  return "ok";
	}.property("content.isValid","content.isSaving"),
    actionName: function() {
		return this.get("content.isDeleted") ? "deleting" : this.get("content.isNew") ? "adding" : "saving";
	}.property("content.isDeleted","content.isNew"), 
    actionText: function() {
		return this.get("actionName")+" "+ this.get("objectName");
	}.property("actionName","objectName"),
	actionPlanningText: function() {
	  if (this.get("content.isSaving")) return this.get("actionText")+ "...";	//action runs right now
	  if (this.get("content.isDirty")) return this.get("actionText") + " is planned."; //data is dirty and must be comitted
	  return this.get("actionText") + " was successful."; 	//data is not dirty, claim to have commited it
	}.property("actionText","content.isSaving","content.isDirty"),
    text: function() {
	  if (!this.get("content.isValid")) return this.get("objectName") + " contains invalid data and has to be edited"; //invalid data must be handled first (could be the cause of the error)
	  if (this.get("content.isError")) return "error while "+ this.get("actionText");  //an error has occured
	  //no edge case
	  return this.get("actionPlanningText");
	}.property("actionText","content.isValid","actionPlanningText"),
});

function showFlashMessageFor(obj,additionalProperties) {
//		removeExistingFlashMessagesOf(obj);
		x= App.ModelFlashMessage.create(additionalProperties || {});
		x.set("content",obj);
}
//remove ModelFlashMessage for obj
//TODO find error
function removeExistingFlashMessagesOf(obj) {
		App.set("flashMessages",App.get("flashMessages").filter( function(item) { 
			var cont = item.get("content");
			return !cont || cont==obj;
		}));
}

App.reopen({
 flashMessage: null,
 flashMessages: function () {
	var m = this.get("flashMessage");
	var fm = [];
	if (m) fm.pushObject(m);
	return fm;
 }.property("flashMessage")
});
