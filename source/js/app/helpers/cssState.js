DS.Model.reopen({
	stateForCSS: function() {
		console.log(this);
		var currentState = this.get("stateManager.currentPath");
		Ember.assert("Unexpected State:" + currentState , currentState.startsWith("rootState."));
		currentState = currentState.slice(10); //cut away "rootState."
		return currentState.replace(/\./g,"-"); // replace . by "-" to avoid conflicts with css-selectors
	}.property('stateManager.currentPath')
});
