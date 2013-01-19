App.ToolView = Ember.View.extend({
  templateName: 'tool',
  classNames: ['tool'],
  currentToolState: function() {
	  var state = App.get('router.currentState');
	  while (!state.get("toolName")) {	//find a state (searching up to root) with a toolName-Property
	    var p = state.get("parentState");
	    if (p)
			state = p;
		else
			return null;
	  }
	  return state;	  
  }.property('App.router.currentState'),
  
  currentToolName: function() {
	  return this.get("currentToolState.toolName");
  }.property('currentToolState'),
  contextMenuStates: function() {
	  var exitState = this.get("currentToolState.parentState");
	  var state = App.get('router.currentState');
	  var result = [];
	  
	  while (state && state!=exitState) {
		  var currentResult = [];
		  state.get("childStates").forEach(function(item){
			  if (item.get('contextMenu') && (!item.contextCondition||item.contextCondition())) currentResult.push(item); //add item if it has a contextMenu entry and evaluate the condition (if any) 
		  });
		  state = state.get("parentState");
		  result = result.concat(currentResult); //TODO schachteln?
	  };
	  return result;
  }.property("App.router.currentState",'currentToolState'), 
  toolCaptionState: function() {
	console.log("search caption state");
	var exitState = this.get("currentToolState.parentState");
	var state = App.get('router.currentState');
	while (state != exitState) {
		console.log("  checking state",state.get("path"));
		if(state.get("toolCaption")) return state;
		state = state.get("parentState");
	}
	return null;
  }.property("App.router.currentState"),
  
  currentToolCaption: function() {
	var tc = this.get("toolCaptionState.toolCaption");
	console.log("found caption:",tc);
	if (!tc) return this.get("currentToolName");
	if (typeof tc=="function") return tc();
	else return tc;
  }.property("toolCaptionState","toolCaptionState.toolCaption","currentToolName"),
   
  showContextMenu: function() {
	return this.get("contextMenuStates.length")>1;  
  }.property("contextMenuStates.length")
});

App.ToolsView = Ember.View.extend({
  templateName: 'tools',
  classNames: ['tools'],
  availableTools: function() {
	  var state = App.get('router.currentState');
	  while (!state.get("goToTool")) {	//find a state (searching up to root) with a toolName-Property
	    var p = state.get("parentState");
	    if (p)
			state = p;
		else
			return null;
	  }
	  return state.get("childStates").filter(function(item){
		  return !!item.get('toolName');
	  });
  }.property('App.router.currentState')
});
