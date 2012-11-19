
//=require ../libs/ember/ember-1.0.0-pre.2.js
//=require ../libs/ember-data-rev7.js
//=require ../libs/authenticated_adapter.js
//=require ./init.js
//=require_tree ./helpers
//=require_tree ./model
//=require_tree ./controller
//=require_tree ./view
//=require ./router
App.initialize();

App.session.addObserver("needsLogin", function(){
	if (App.session.get("needsLogin")) App.router.send("unauthorizedRequest");
});
App.router.addObserver("currentPath", function(){
	App.session.navigateAround();
});
