// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('root.index'),

  
  //in progress
  // goRegister: Ember.Route.transitionTo('loggedOut'),
  /*unauthorizedRequest: function(router) {
	var loginController = router.get('loginController');
	loginController.set("oldPosition",router.get("currentPath"));
	router.transitionTo("root.login");
  },*/
  goLoggedOut: function(router, evt) {
    router.transitionTo('root.index');
    App.session.logout();
  },
  root: Ember.Route.extend({

  	showProject:  Ember.Route.transitionTo('loggedIn.singleproject'),

  	index: Ember.Route.extend({
		
		
		route: '/',
		enter: function ( router ){ console.log("The projects sub-state was entered."); 
		Ember.run.next(function() {
                if (App.session.get('signedIn')) {
                    router.transitionTo('loggedIn');
                } else {
                    router.transitionTo('loggedOut.login');
                }
            });
        },
    }),
  	loggedIn: Ember.Route.extend({
		route: '/',
		connectOutlets: function(router, context){ 
			router.get('applicationController').connectOutlet('body', 'projects', App.store.findAll(App.Project)); 
			//router.get('accountController').set("content",);
			router.get('applicationController').connectOutlet('footer','account',App.session);
		},

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
		  router.get('accountController').set("content",App.session);
		}
	  }),
	}),	  
	loggedOut:  Ember.Route.extend({
		login:  Ember.Route.extend({
		  route: '/login',
		  enter: function ( router ){ console.log("The login sub-state was entered."); },
		  connectOutlets: function(router, context){router.get('applicationController').connectOutlet('body', 'login'); },
		  goLoggedIn: function(router, context) { router.get('loginController').login(); router.transitionTo('loggingIn');}
		}),
		loggingIn:  Ember.Route.extend({
		  enter: function ( router ){ console.log("The logginIn-state was entered."); },
		  connectOutlets: function(router, context){router.get('applicationController').connectOutlet('body', 'loggingIn');
		  router.get('accountController').set("content",App.session);}
		}),
		loginComplete: Ember.Route.transitionTo('root.loggedIn'),
		unauthorizedRequest: Ember.Route.transitionTo('login')
	 })
  })
});
