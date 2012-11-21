// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToProjects:  Ember.Route.transitionTo('root.index'),
  goToProfile: Ember.Route.transitionTo('user.profile'),

  
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
			//router.get('applicationController').connectOutlet('body', 'projects', App.store.findAll(App.Project)); 
			router.get('applicationController').connectOutlet('body', 'projects'); 
			router.get('projectsController').connectOutlet('ownedProjects', 'ownedProjects', App.User.ownedProjects);
			router.get('projectsController').connectOutlet('contribProjects', 'contribProjects', App.User.collaboratedProjects);
			//router.get('applicationController').connectOutlet('body2', 'empty');
			//router.get('applicationController').connectOutlet('body3', 'empty');
			router.get('applicationController').connectOutlet('footer','account',App.session);
		},

	  singleproject: Ember.Route.extend({
	  		 	goToProjectNavi: Ember.Route.transitionTo('root.index'),
	 			//goToProjectOverview: Ember.Route.transitionTo('projectOverview'),
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
		  router.get('applicationController').connectOutlet('body', 'projecttitle', aProject);
		  router.get('applicationController').connectOutlet('body2', 'projectnavi');
		  router.get('applicationController').connectOutlet('body3', 'empty');
		  router.get('accountController').set("content",App.session);
		  router.get('applicationController').connectOutlet('footer','account');
		},

		// projectOverview: Ember.Route.extend({
		// 	console.log("The ProjectOverview sub-state was entered.");
		// }),

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

		//Userview, user kapselt alle unteren Userviews (Profile, Edit, ...)
		user:  Ember.Route.extend({
			route: '/user',
			enter: function ( router ){
	            	console.log("The user state was entered.");
	        },
	        connectOutlets: function(router, context){
	            router.get('applicationController').connectOutlet('body', 'user');
	            router.get('userController').connectOutlet('navigation', 'traversal');
	        },
	        //Profilansicht
		   	profile:  Ember.Route.extend({
	          	route: '/profile',
	          	enter: function ( router ){
	            	console.log("The profile sub-state was entered.");
	          	},
	          	connectOutlets: function(router, context){
	            	router.get('userController').connectOutlet('userbody', 'profile');      
	          	}
	        })
	   	})
	}),	  

	//ausgeloggter Status
	loggedOut:  Ember.Route.extend({
		login:  Ember.Route.extend({
		  route: '/login',
		  enter: function ( router ){ console.log("The login sub-state was entered."); },
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'login');
		  	router.get('applicationController').connectOutlet('body2', 'empty');
			router.get('applicationController').connectOutlet('body3', 'empty'); 
		},
		  goLoggedIn: function(router, context) { router.get('loginController').login(); router.transitionTo('loggingIn');}
		}),
		//pending Status, während eingeloggt wird und der ajax Aufruf die Antwort zurückliefert
		loggingIn:  Ember.Route.extend({
		  enter: function ( router ){ console.log("The logginIn-state was entered."); },
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'loggingIn');
		  	router.get('applicationController').connectOutlet('body2', 'empty');
			router.get('applicationController').connectOutlet('body3', 'empty');
		  	router.get('accountController').set("content",App.session);
		  }
		}),
		//Wechsel in eingeloggten (loggedIn) Status
		loginComplete: Ember.Route.transitionTo('root.loggedIn'),
		//Wechsel in ausgeloggten (loggedOut.login) Status
		unauthorizedRequest: Ember.Route.transitionTo('login')
	 })
  })
});
