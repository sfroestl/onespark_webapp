App.ToolView = Ember.View.extend({
  templateName: 'tool',
  currentToolName: function() {
	  var state = App.get('router.currentState');
	  while (!state.get("toolName")) {	//find a state (searching up to root) with a toolName-Property
	    var p = state.get("parentState");
	    if (p)
			state = p;
		else
			return null;
	  }
	  return state.get("toolName");
  }.property('App.router.currentState')
});

App.ToolsView = Ember.View.extend({
  templateName: 'tools',
  availableTools: function() {
	  console.log("detecting tools");
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
