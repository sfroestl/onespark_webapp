// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToProjects:  Ember.Route.transitionTo('root.loggedIn.projects.index'),


  /*unauthorizedRequest: function(router) {
	var loginController = router.get('loginController');
	loginController.set("oldPosition",router.get("currentPath"));
	router.transitionTo("root.login");
  },*/

  root: Ember.Route.extend({

  	
  	goToSearch: Ember.Route.transitionTo('loggedIn.search'),

  	index: Ember.Route.extend({


		route: '/',
		enter: function ( router ){
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
		
		showProject:  Ember.Route.transitionTo('loggedIn.projects.singleproject.tools'), //TODO: change to Overview when available
		goToNewProject: Ember.Route.transitionTo('loggedIn.projects.newProject'),
		
		search: Ember.Route.extend({
			route: '/search',
		}),

		goLoggedOut: function(router, evt) {
			router.get('loginController').set('password', ""); //reset password		
			router.transitionTo('root.index');
			App.session.logout();
		},

		projects: Ember.Route.extend({

			route: '/projects',
			index: Ember.Route.extend({
				route: '/',
				connectOutlets: function(router, context){
					router.get('applicationController').connectOutlet('topNavi', 'topNavi');
					router.get('projectsController').set('ownedProjects', App.get("session.sessionUser.ownedProjects"));
					router.get('projectsController').set('collaboratedProjects', App.get("session.sessionUser.collaboratedProjects"));
					router.get('applicationController').connectOutlet('body', 'projects');
					router.get('applicationController').connectOutlet('footer','account',App.session);

				},
			}),

			newProject: Ember.Route.extend({
				route: '/new',
				connectOutlets: function(router, context){
					router.get('applicationController').connectOutlet('body', 'newProject');
				},
				goSave: function(router, evt) {
        			router.get('newProjectController').save();
        			router.transitionTo('projects.index');
     			},
			}),
	
		 	singleproject: Ember.Route.extend({
				
				route: '/:project_id',
				modelType: 'App.Project',
				connectOutlets: function(router, context){
					router.get('applicationController').connectOutlet('topNavi', 'topNavi',context);
				},
				exit: function(router){
					//Inhalt von topNaviController leeren, damit Inhalt von Navigation neu geladen wird
	      			router.get('topNaviController').set('content', null)
	    		},
				tools: Ember.Route.extend({
					route: '/',
					connectOutlets:  function(router){
					  var aProject = router.get('topNaviController.content');
					  router.get('applicationController').connectOutlet('body', 'tools', aProject);
					  router.get('applicationController').connectOutlet('footer', 'account',App.session);
					}
				}),

				editProject: Em.Route.extend({
			          route: 'edit',

			          cancelEdit: function(router) {
			            router.transitionTo('projects.index');
			          },

			          connectOutlets: function(router) {
			            var contactController = router.get('contactController');
			            contactController.connectOutlet('editContact', contactController.get('content'));
			            router.get('editContactController').enterEditing();
			          },

			          exit: function(router) {
			            router.get('editContactController').exitEditing();
			          }
        		}),

				projectOverview: Ember.Route.extend({
					route: '/overview',
					toolName: 'overview',
			        connectOutlets: function(router,project) {
						var aProject = router.get('topNaviController.content');
						router.get('applicationController').connectOutlet('body', 'tool',aProject);
						router.get('toolController').connectOutlet('tool-body', 'projectOverview',aProject);
					},

					goDelete: function(router, evt){
						router.get('projectOverviewController').deleteProject(evt.context);
					},

					goProjectsIndex: Ember.Route.transitionTo('projects.index'),

				}),

				projectTasks: Ember.Route.extend({
					route: '/tasks',
				}),

				projectPostings: Ember.Route.extend({
					route: '/postings',
				}),

				projectFiles: Ember.Route.extend({
					route: '/files',
				}),

				projectContributors: Ember.Route.extend({
					route: '/contributors',
					toolName: 'Contributors',
			        connectOutlets: function(router,project) {
						var aProject = router.get('topNaviController.content');
						router.get('applicationController').connectOutlet('body', 'tool',aProject);
						router.get('toolController').connectOutlet('tool-body', 'contributors',aProject);
					}
				}),

				projectEdit: Ember.Route.extend({
					route: '/edit',
				}),

				projectTrash: Ember.Route.extend({
					route: '/trash',
				}),
				goToTool: function(router, context) {
					
					var c = context.contexts;
					c[0] = c[0].get('path'); //the first object is the Route Object of the chosen tool
					//Call the transitionTo mehtod of the Router
					//note that router.transitionTo actually retrieves the function
					//apply needs two parameters:
					//the first is the calling context, e.g. router.transitionTo.apply(a) is like writing a.transitionTo()
					//the second is an array of parameters:
					//	first is the target state
					//	second is the ember router context, given to connectOutlets in target state
					router.transitionTo.apply(router,c);
				},
				goToTools: Ember.Route.transitionTo("singleproject.tools")
			}),
		}),

		//Userview, user kapselt alle unteren Userviews (Profile, Edit, ...)
		user:  Ember.Route.extend({
			route: '/user',
	        connectOutlets: function(router, context){
	            router.get('applicationController').connectOutlet('body', 'user');
	            router.get('applicationController').connectOutlet('footer', 'account');
	            router.get('applicationController').disconnectOutlet('topNavi');
	        },
	        //Profilansicht
		   	profile:  Ember.Route.extend({
	          	route: '/profile',
	          	connectOutlets: function(router, context){
	          		router.set('profileController.user', App.get("session.sessionUser"));
	            	router.get('userController').connectOutlet('userbody', 'profile');
	          	}
	        }),
	       	//Update Profil
			updateprofile:  Ember.Route.extend({
		        route: '/edit',
		        enter: function(router){
					router.get('userController').loadContent();
	    		},
		        connectOutlets: function(router, context){
		          	router.set('profileController.user', App.get("session.sessionUser"));
		          	router.get('userController').connectOutlet('userbody', 'update_profile');
		        },
		       	goUpdate: function(router, evt) {
        			router.get('userController').update();
        			router.transitionTo('user.profile');
     			}
		    }),
		   	//Delete Profil
			deleteme:  Ember.Route.extend({
		        route: '/delete',
		        connectOutlets: function(router, context){
		          	router.get('userController').connectOutlet('userbody', 'delete_user');
		        },
		       	goDelete: function(router, evt) {
        			router.get('userController').deleteMe();
        			//router.transitionTo('root.index');
					//App.session.logout();
     			},
     			afterDelete: Ember.Route.transitionTo('loggedOut.login')
		    }),
	        goToUpdateProfile: Ember.Route.transitionTo('updateprofile'),
	        goToDeleteMe: Ember.Route.transitionTo('deleteme')
	   	}),
		goToProfile: Ember.Route.transitionTo('user.profile')
   	}),

	//ausgeloggter Status
	loggedOut:  Ember.Route.extend({
		connectOutlets: function(router, context){
			 router.get('applicationController').disconnectOutlet('topNavi');
		},
		register: Ember.Route.extend({
			route: '/register',
		  	connectOutlets: function(router, context){
			  	router.get('applicationController').connectOutlet('body', 'register');
			},
			goRegister: function(router, evt) {
        		router.get('registerController').register();
     		},
	        goToLogin: Ember.Route.transitionTo('loggedOut.login'),
		}),
		login:  Ember.Route.extend({
		  route: '/login',
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'login');
		},
		  	goLoggedIn: function(router, context) { router.get('loginController').login(); router.transitionTo('loggingIn');},
		  	goToRegister: Ember.Route.transitionTo('loggedOut.register')
		}),
		//pending Status, während eingeloggt wird und der ajax Aufruf die Antwort zurückliefert
		loggingIn:  Ember.Route.extend({
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'loggingIn');
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
