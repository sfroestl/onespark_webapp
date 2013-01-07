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
