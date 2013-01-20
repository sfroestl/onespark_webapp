App.TopNaviView = Em.View.extend({
	templateName:  'topNavi',
	tagName: 'nav',
	classNames: ['project-nav', 'nav-bar'],
	searchActive: function() {
		return App.get("router.currentState.path")=="root.loggedIn.search";
	}.property("App.router.currentState")
});
