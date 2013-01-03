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
	  var state = this.get("currentToolState");
	  if (!state) return null;
	  return state.get("childStates").filter(function(item){
		  return !!item.get('contextMenu'); //TODO maybe add additional filtering (does an action makes sense?)
	  });
  }.property('currentToolState'),  
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
