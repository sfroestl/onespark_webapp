// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('projects.index'),

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
	  showProject:  Ember.Route.transitionTo('projects.singleproject'),
	  route: '/projects',
	  index: Ember.Route.extend({
		route: '/',
		enter: function ( router ){ console.log("The projects sub-state was entered."); },
		connectOutlets: function(router, context){ router.get('applicationController').connectOutlet('body', 'projects', App.Project.findAll()); }
	  }),
	  singleproject: Ember.Route.extend({
		route: '/projects/:id',
		enter: function(router){ console.log("The singleproject sub-state was entered."); },
		deserialize:  function(router, context){
		  return App.Project.find( context.id );
		},
		serialize:  function(router, context){
		  return {
			id: context.id
		  }
		},
		connectOutlets:  function(router, aProject){
		  router.get('applicationController').connectOutlet('body', 'project', aProject);
		}
	  })
	})
        
=======

    loggedIn: Ember.Route.extend({
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('session', 'in');
        router.get('inController').connectOutlet('navigation', 'traversal');
        router.get('inController').set('sessionUser', App.User.getSessionUser());
      },
      goLoggedOut: function(router, evt) {
        console.log("Try logout");
        router.get('inController').logout();
        console.log("Session: " + App.User.signedIn);
        router.transitionTo('loggedOut');

      },
        users:  Ember.Route.extend({
          route: '/users',
          enter: function ( router ){
            console.log("The users sub-state was entered.");
          },
          connectOutlets: function(router, context){
          router.get('inController').connectOutlet('body', 'users');
          router.get('inController').connectOutlet('navigation', 'traversal');
         }
        }),

    }),

    loggedOut: Ember.Route.extend({
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('session', 'out');
        router.get('outController').connectOutlet('login', 'loginForm');
      },
      goLoggedIn: function(router, evt) {
        console.log("Try login");
        router.get('loginFormController').login();
        console.log("Session: " + App.User.signedIn);
        if(App.User.signedIn) {
          router.transitionTo('loggedIn');
        }
      }
    })
>>>>>>> master



  })
});
