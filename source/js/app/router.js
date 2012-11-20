// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('root.index'),

  //in progress
  // goRegister: Ember.Route.transitionTo('loggedOut'),
  unauthorizedRequest: function(router) {
	var loginController = router.get('loginController');
	loginController.set("oldPosition",router.get("currentPath"));
	router.transitionTo("root.login");
  },
  goLoggedOut: function(router, evt) {
    router.transitionTo('root.index');
    App.session.logout();
  },
  root: Ember.Route.extend({

  	showProject:  Ember.Route.transitionTo('root.singleproject'),

  	index: Ember.Route.extend({
		route: '/',
		enter: function ( router ){ console.log("The projects sub-state was entered."); },
		connectOutlets: function(router, context){ 
			router.get('applicationController').connectOutlet('body', 'projects', App.store.findAll(App.Project)); 
			router.get('accountController').set("content",App.session);
			router.get('applicationController').connectOutlet('footer','account');
		}
	  }),
	  singleproject: Ember.Route.extend({
		route: '/projects/:id',
		enter: function(router){ console.log("The singleproject sub-state was entered."); },
		deserialize:  function(router, context){
		  return App.store.find(App.Project, context.id );
		},
		serialize:  function(router, context){
		  return {
			id: context.id
		  }
		},
		connectOutlets:  function(router, aProject){
		  router.get('applicationController').connectOutlet('body', 'project', aProject);
		}
	  }),
	login:  Ember.Route.extend({
	  route: '/login',
	  enter: function ( router ){ console.log("The login sub-state was entered."); },
	  connectOutlets: function(router, context){router.get('applicationController').connectOutlet('body', 'login'); },
	  goLoggedIn: function(router, context) { router.get('loginController').login(); }
	}),
	users:  Ember.Route.extend({
	  route: '/users',
	  enter: function ( router ){ console.log("The users sub-state was entered."); },
	  connectOutlets: function(router, context){ router.get('applicationController').connectOutlet('body', 'users'); }
	})
  })
});
