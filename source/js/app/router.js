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

  	goBack: function() {
		window.history.back();
	},
  	goToSearch: Ember.Route.transitionTo('loggedIn.search'),
		//Wechsel in eingeloggten (loggedIn) Status
		loginComplete: Ember.Route.transitionTo('root.loggedIn.projects.index'),
		//Wechsel in ausgeloggten (loggedOut.login) Status
		unauthorizedRequest: Ember.Route.transitionTo('root.loggedOut.login'),
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
		//showTask: Ember.Route.transitionTo('loggedIn.projects.singleproject.)
		goToNewProject: Ember.Route.transitionTo('loggedIn.projects.newProject'),
		goToUserProfile: Ember.Route.transitionTo('user.profile'),
		goToUserContacts: Ember.Route.transitionTo('user.contacts'),
		goToUserMessages: Ember.Route.transitionTo('user.messages'),
		search: Ember.Route.extend({
			route: '/search',
		}),

		account: Ember.Route.extend({
			route: '/account',
			connectOutlets: function(router, context){
				router.get('accountController').connectOutlet('body', 'user');
				router.get('applicationController').disconnectOutlet('topNavi');
			},
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
					router.get('createUpdateProjectController').empty();
					router.get('createUpdateProjectController').set("createFlag", true);
					router.get('createUpdateProjectController').set("updateFlag", false);
					router.get('applicationController').connectOutlet('body', 'createUpdateProject');
				},
				goCreate: function(router, evt) {
        			router.get('createUpdateProjectController').create();
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

			// Von wem ist das editProject? Kann das weg?
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
				}),

				projectTasks: Ember.Route.extend({
					route: '/tasks',
					toolName: 'tasks',

					index: Ember.Route.extend({
						route: '/',
						connectOutlets: function(router,project) {
							var aProject = router.get('topNaviController.content');
							router.get('applicationController').connectOutlet('body', 'tool');
							router.get('tasksController').set('tasks', aProject.get("tasks"));
							router.get('toolController').connectOutlet('tool-body', 'tasks');
						}
					}),
					goToSingleTask: Ember.Route.transitionTo("projectTasks.singletask"),

					singletask: Ember.Route.extend({
						route: '/:id',
						toolName: 'Task',	//irgendwie Tasktitel einfügen					
						connectOutlets: function(router,task) {
							//router.get('toolController').set('toolName', task);
							router.get('toolController').connectOutlet('tool-body', 'singleTask',task);
						}
					})
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
					
					index: Ember.Route.extend({
						route: '/',
						connectOutlets: function(router,project) {
							var aProject = router.get('topNaviController.content');
							router.get('applicationController').connectOutlet('body', 'tool',aProject);
							router.get('toolController').connectOutlet('tool-body', 'contributors',aProject);
						},
					}),
					goToNewContributor: Ember.Route.transitionTo("projectContributors.newContributor"),
					goToEditContributors: Ember.Route.transitionTo("projectContributors.editContributors"),
					newContributor: Ember.Route.extend({
						route: '/add',
						contextMenu: 'add Contributor',
						connectOutlets: function(router,project) {
							var aProject = router.get('topNaviController.content');
							router.get('applicationController').connectOutlet('body', 'tool',aProject);
							router.get('toolController').connectOutlet('tool-body', 'newContributor');
							router.get('newContributorController').set("project",aProject);
						},
						cancel: Ember.Route.transitionTo("projectContributors.index"),
						createContributor: function(router, evt) {
							router.get('newContributorController').save(evt.contexts[0],evt.contexts[1]); //no transition, so batch-adding is possible
						},						
					}),
					editContributors: Ember.Route.extend({
						route: '/edit',
						contextMenu: 'edit Contributors',
						connectOutlets: function(router,project) {
							var aProject = router.get('topNaviController.content');
							router.get('applicationController').connectOutlet('body', 'tool',aProject);
							router.get('toolController').connectOutlet('tool-body', 'editContributors',aProject);
						},
						cancel: Ember.Route.transitionTo("projectContributors.index"),
						removeAsContributor: function(router, evt) {
							router.get('editContributorsController').removeAsContributor(evt.contexts[0]); //no transition, so batch-adding is possible
						},						
					})
				}),

				projectEdit: Ember.Route.extend({
					route: '/edit',
					toolName: 'edit',
			        connectOutlets: function(router,project) {
						var aProject = router.get('topNaviController.content');
						if(App.get("session.sessionUserId")==aProject.get("owner.id")){
							router.get('applicationController').connectOutlet('body', 'tool',aProject);
							router.get('createUpdateProjectController').set("updateFlag", true);
							router.get('createUpdateProjectController').set("createFlag", false);
							router.get('createUpdateProjectController').fill(aProject);
							router.get('toolController').connectOutlet('tool-body', 'createUpdateProject',aProject);
						}
						else{
							var fm = App.FlashMessage.create({
								text: "You have no permission to edit this project"
							})

						}
					},
					goUpdate: function(router, evt){
						router.get('createUpdateProjectController').update(App.store.find(App.Project, evt.context.id));
					}
				}),

				projectTrash: Ember.Route.extend({
					route: '/trash',
					toolName: 'trash',
					connectOutlets: function(router,project) {
						var aProject = router.get('topNaviController.content');
						if(App.get("session.sessionUserId")==aProject.get("owner.id")){
							router.get('projectController').deleteProject(App.store.find(App.Project, aProject.id));
						}
						else{
							var fm = App.FlashMessage.create({
								text: "You have no permission to delete this project"
							})

						}
					}
				}),

				goToTool: function(router, context) {
					
					var c = context.contexts;
					c[0] = c[0].get('path') + (c[0].get("isLeaf") ? "" : ".index"); //the first object is the Route Object of the chosen tool
					//if it's not a leaf, append .index to the path
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
	            router.get('applicationController').disconnectOutlet('topNavi');
	        },
	        //Profilansicht
		   	profile:  Ember.Route.extend({
	          	route: '/profile',
	          	connectOutlets: function(router, context){
	          		router.set('profileController.user', App.get("session.sessionUser"));
	            	router.get('userController').connectOutlet('maincontent', 'profile');
	          	},
	          	goUpdate: function(router, evt) {
	        		router.get('profileController').update();
	        		//router.get('profileController.view').edit();
	     		},
	     		goDelete: function(router, evt) {
	        		router.get('profileController').deleteMe();
	     		},
	     		afterDelete: Ember.Route.transitionTo('loggedOut.login'),
	     		exit: function(router) {
			        router.get('profileController').resetFields();
			    }
		    }),
		    //Contacts
		    contacts: Ember.Route.extend({
		    	route: '/contacts',
		    	connectOutlets:function(router, context){
		    		router.get('contactsController').set('contacts', App.get("session.sessionUser.contacts"));
		    		router.get('userController').connectOutlet('maincontent', 'contacts');
		    	}
		    }),
		    //Messages
		    messages: Ember.Route.extend({
		    	route: '/messages',
		    	connectOutlets:function(router, context){
		    		router.get('userController').connectOutlet('maincontent', 'messages');
		    	}
		    })
	   	}),
		goToProfile: Ember.Route.transitionTo('user.profile')
   	}),

	//ausgeloggter Status
	loggedOut:  Ember.Route.extend({
		connectOutlets: function(router, context){
			 router.get('applicationController').connectOutlet('topNavi', 'brand' );
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
	        exit: function(router) {
				router.get('registerController').resetFields();
			}
		}),
		login:  Ember.Route.extend({
		  	route: '/login',
		  	connectOutlets: function(router, context){
		  		router.get('applicationController').connectOutlet('body', 'login');
			},
		  	goLoggedIn: function(router, context) { 
		  		router.get('loginController').login(); 
		  		//router.transitionTo('loggingIn');
			},
			goToRegister: Ember.Route.transitionTo('loggedOut.register')
		}),
		//pending Status, während eingeloggt wird und der ajax Aufruf die Antwort zurückliefert
		loggingIn:  Ember.Route.extend({
		  connectOutlets: function(router, context){
		  	router.get('applicationController').connectOutlet('body', 'loggingIn');
		  	router.get('accountController').set("content",App.session);
		  }
		}),
	})
  })
});
