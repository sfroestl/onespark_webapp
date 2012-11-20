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
                if (App.User.isSignedIn()) {
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
//<<<<<<< HEAD
			//router.get('accountController').set("content",);
			router.get('applicationController').connectOutlet('body2', 'empty'),
			router.get('applicationController').connectOutlet('footer','account',App.session);
		},

	  singleproject: Ember.Route.extend({
	  		 	goToProjectNavi: Ember.Route.transitionTo('root.index'),
	 //  	goToProjectOverview: Ember.Route.transitionTo('root.singleproject.projectOverview'),
		// goToProjectTasks: Ember.Route.transitionTo('root.singleproject.projectTasks'),
		// goToProjectPostings: Ember.Route.transitionTo('root.singleproject.projectPostings'),
		// goToProjectContributors: Ember.Route.transitionTo('root.singleproject.projectContributors'),
		// goToProjectEdit: Ember.Route.transitionTo('root.singleproject.projectEdit'),
		 //goToProjectTrash: Ember.Route.transitionTo('projectTrash'),
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
		  router.get('applicationController').connectOutlet('body2', 'projectnavi');
		  router.get('accountController').set("content",App.session);
		  router.get('applicationController').connectOutlet('footer','account');
		},

		// projectOverview: Ember.Route.extend({}),

		// projectTasks: Ember.Route.extend({}),

		// projectPostings: Ember.Route.extend({}),

		// projectFiles: Ember.Route.extend({}),

		// projectContributors: Ember.Route.extend({}),

		// projectEdit: Ember.Route.extend({}),

/*		 projectTrash: Ember.Route.extend({
		 	route: '/trash',
		 	enter: function (router){console.log("The project-trash sub-sub-state was entered.")}

		 })*/
		// 		  })
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
		  router.get('accountController').set("content",App.session);},
		  loginComplete: Ember.Route.transitionTo('root.loggedIn'),
		  unauthorizedRequest: Ember.Route.transitionTo('login')
		})
	 })
// =======
// 			//router.get('applicationController').connectOutlet('body2', 'empty'),
// 			//router.get('accountController').set("content",App.session);
// 			//router.get('applicationController').connectOutlet('footer','account');
// 		}
// 	  }),
// 	singleproject: Ember.Route.extend({
// 	 	goToProjectNavi: Ember.Route.transitionTo('root.index'),
// 	 //  	goToProjectOverview: Ember.Route.transitionTo('root.singleproject.projectOverview'),
// 		// goToProjectTasks: Ember.Route.transitionTo('root.singleproject.projectTasks'),
// 		// goToProjectPostings: Ember.Route.transitionTo('root.singleproject.projectPostings'),
// 		// goToProjectContributors: Ember.Route.transitionTo('root.singleproject.projectContributors'),
// 		// goToProjectEdit: Ember.Route.transitionTo('root.singleproject.projectEdit'),
// 		 //goToProjectTrash: Ember.Route.transitionTo('projectTrash'),
// 		route: '/projects/:id',
// 		//index: Ember.Route.extend({
// 		//	route: '/',
// 			enter: function(router){ console.log("The singleproject sub-state was entered."); },
// 			deserialize:  function(router, context){
// 			  return App.store.find(App.Project, context.id );
// 			},
// 			serialize:  function(router, context){
// 			  return {
// 				id: context.id
// 			  }
// 			},
// 			connectOutlets:  function(router, aProject){
// 			  router.get('applicationController').connectOutlet('body', 'projecttitle', aProject);
// 			  router.get('applicationController').connectOutlet('body2', 'projectnavi');
// 			  router.get('applicationController').connectOutlet('footer','account');

// 			},

// 		// projectOverview: Ember.Route.extend({}),

// 		// projectTasks: Ember.Route.extend({}),

// 		// projectPostings: Ember.Route.extend({}),

// 		// projectFiles: Ember.Route.extend({}),

// 		// projectContributors: Ember.Route.extend({}),

// 		// projectEdit: Ember.Route.extend({}),

// /*		 projectTrash: Ember.Route.extend({
// 		 	route: '/trash',
// 		 	enter: function (router){console.log("The project-trash sub-sub-state was entered.")}

// 		 })*/
// 		// 		  })

// 	}),
// 	  //Login ist root untergeordnet
// 	login:  Ember.Route.extend({
// 	  route: '/login',
// 	  enter: function ( router ){ console.log("The login sub-state was entered."); },
// 	  connectOutlets: function(router, context){router.get('applicationController').connectOutlet('body', 'login'); },
// 	  goLoggedIn: function(router, context) { router.get('loginController').login(); }
// 	}),
// 	//users ist root untergeordnet
// 	users:  Ember.Route.extend({
// 	  route: '/users',
// 	  enter: function ( router ){ console.log("The users sub-state was entered."); },
// 	  connectOutlets: function(router, context){ router.get('applicationController').connectOutlet('body', 'users'); }
// 	})

// >>>>>>> ember-data
  })
});
