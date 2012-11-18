// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('projects'),

  //in progress
  // goRegister: Ember.Route.transitionTo('loggedOut'),


  root: Ember.Route.extend({

	
	
    index: Ember.Route.extend({
	  	enter: function(router) { router.set('applicationController.content', App.session); },
	connectOutlets: function(router, context){ router.get('applicationController').connectOutlet('navigation', 'traversal'); },
      route: '/',
    }),
	users:  Ember.Route.extend({
	  route: '/users',
	  enter: function ( router ){ console.log("The users sub-state was entered."); },
	  connectOutlets: function(router, context){ router.get('applicationController').connectOutlet('body', 'users'); }
	}),
	projects:  Ember.Route.extend({
	  route: '/projects',
	  enter: function ( router ){ console.log("The projects sub-state was entered."); },
	  connectOutlets: function(router, context){ router.get('applicationController').connectOutlet('body', 'projects', App.Project.findAll()); }
	})



  })
});
