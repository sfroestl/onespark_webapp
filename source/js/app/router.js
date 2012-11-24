// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToProjects:  Ember.Route.transitionTo('root.index'),


  /*unauthorizedRequest: function(router) {
	var loginController = router.get('loginController');
	loginController.set("oldPosition",router.get("currentPath"));
	router.transitionTo("root.login");
  },*/

  root: Ember.Route.extend({

  	showProject:  Ember.Route.transitionTo('loggedIn.projects.singleproject'),
  	goToSearch: Ember.Route.transitionTo('loggedIn.search'),

  	index: Ember.Route.extend({


		route: '/',
		enter: function ( router ){
			console.log("The projects sub-state was entered.");
			Ember.run.next(function() {
                if (App.session.get('signedIn')) {
                    router.transitionTo('loggedIn.projects.index');
                } else {
                    router.transitionTo('loggedOut.login');
                }
            });
        },
    }),

  	loggedIn: Ember.Route.extend({
		search: Ember.Route.extend({
			route: '/search',
			enter: function(router){ console.log("The Search sub-state was entered."); },
		}),

		goLoggedOut: function(router, evt) {
			router.get('loginController').set('password', ""); //reset password
			router.transitionTo('root.index');
			App.session.logout();
		},

		projects: Ember.Route.extend({
			route: '/projects',
			enter: function(router){
				console.log("The projects sub-state was entered.");
			},
			index: Ember.Route.extend({
				route: '/',
				enter: function(router){
					console.log("The projects-index sub-state was entered.");
				},
				connectOutlets: function(router, context){
					router.get('applicationController').connectOutlet('topNavi', 'topNavi');
					router.get('projectsController').set('ownedProjects', App.get("session.sessionUser.ownedProjects"));
					router.get('projectsController').set('collaboratedProjects', App.get("session.sessionUser.collaboratedProjects"));
					router.get('applicationController').connectOutlet('body', 'projects');
					router.get('applicationController').connectOutlet('footer','account',App.session);

				},
			}),
		 	singleproject: Ember.Route.extend({
				route: '/:project_id',
				modelType: 'App.Project',
				exit: function(router){
					//Inhalt von topNaviController leeren, damit Inhalt von Navigation neu geladen wird
	      			router.get('topNaviController').set('content', null)
	    		},

				connectOutlets:  function(router, aProject){
				  router.get('applicationController').connectOutlet('topNavi', 'topNavi', aProject);
				  router.get('applicationController').connectOutlet('body', 'project', aProject);
				  router.get('accountController').set("content", App.session);
				  router.get('applicationController').connectOutlet('footer', 'account');
				},

				projectOverview: Ember.Route.extend({
					route: '/overview',
					enter: function ( router ){
			            	console.log("The ProjectOverview sub-state was entered.");
			        },
				}),

				projectTasks: Ember.Route.extend({
					route: '/tasks',
					enter: function ( router ){
			            	console.log("The ProjectTasks sub-state was entered.");
			        },
				}),

				projectPostings: Ember.Route.extend({
					route: '/postings',
					enter: function ( router ){
			            	console.log("The ProjectPostings sub-state was entered.");
			        },
				}),

				projectFiles: Ember.Route.extend({
					route: '/files',
					enter: function ( router ){
			            	console.log("The ProjectFiles sub-state was entered.");
			        },
				}),

				projectContributors: Ember.Route.extend({
					route: '/contributors',
					enter: function ( router ){
			            	console.log("The ProjectContributors sub-state was entered.");
			        },
				}),

				projectEdit: Ember.Route.extend({
					route: '/edit',
					enter: function ( router ){
			            	console.log("The ProjectEdit sub-state was entered.");
			        },
				}),

				projectTrash: Ember.Route.extend({
					route: '/trash',
					enter: function ( router ){
			            	console.log("The ProjectTrash sub-state was entered.");
			        },
				}),

			}),
			goToProjectOverview: Ember.Route.transitionTo('singleproject.projectOverview'),
			goToProjectTasks: Ember.Route.transitionTo('singleproject.projectTasks'),
			goToProjectPostings: Ember.Route.transitionTo('singleproject.projectPostings'),
			goToProjectFiles: Ember.Route.transitionTo('singleproject.projectFiles'),
			goToProjectContributors: Ember.Route.transitionTo('singleproject.projectContributors'),
			goToProjectEdit: Ember.Route.transitionTo('singleproject.projectEdit'),
			goToProjectTrash: Ember.Route.transitionTo('singleproject.projectTrash'),
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
	   	}),
	   	goToProfile: Ember.Route.transitionTo('user.profile')
   	}),

	//ausgeloggter Status
	loggedOut:  Ember.Route.extend({
		register: Ember.Route.extend({
			route: '/register',
		  	enter: function ( router ){ console.log("The register sub-state was entered."); },
		  	connectOutlets: function(router, context){
			  	router.get('applicationController').connectOutlet('body', 'register');
			 //  	router.get('applicationController').connectOutlet('body2', 'empty');
				// router.get('applicationController').connectOutlet('body3', 'empty');
			},
			goRegister: function(router, evt) {
        		router.get('registerController').register();
     		},
	        goToLogin: Ember.Route.transitionTo('loggedOut.login'),
		}),
		login:  Ember.Route.extend({
		  route: '/login',
		  enter: function ( router ){ console.log("The login sub-state was entered."); },
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'login');
		 //  	router.get('applicationController').connectOutlet('body2', 'empty');
			// router.get('applicationController').connectOutlet('body3', 'empty');
		},
		  	goLoggedIn: function(router, context) { router.get('loginController').login(); router.transitionTo('loggingIn');},
		  	goToRegister: Ember.Route.transitionTo('loggedOut.register')
		}),
		//pending Status, während eingeloggt wird und der ajax Aufruf die Antwort zurückliefert
		loggingIn:  Ember.Route.extend({
		  enter: function ( router ){ console.log("The logginIn-state was entered."); },
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'loggingIn');
		 //  	router.get('applicationController').connectOutlet('body2', 'empty');
			// router.get('applicationController').connectOutlet('body3', 'empty');
		  	router.get('accountController').set("content",App.session);
		  }
		}),
		//Wechsel in eingeloggten (loggedIn) Status
		loginComplete: Ember.Route.transitionTo('root.loggedIn.projects.index'),
		//Wechsel in ausgeloggten (loggedOut.login) Status
		unauthorizedRequest: Ember.Route.transitionTo('login')
	})
  })
});
