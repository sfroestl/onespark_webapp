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
			router.get('loginController').logout();	
			router.transitionTo('root.index');
		},

		projects: Ember.Route.extend({

			route: '/projects',
			index: Ember.Route.extend({
				route: '/',
				connectOutlets: function(router, context){
					router.get('applicationController').connectOutlet('topNavi', 'topNavi');
					router.get('applicationController').connectOutlet('body', 'projects');
					router.get('applicationController').connectOutlet('footer','account',App.session);

				},
			}),

			newProject: Ember.Route.extend({
				route: '/new',
				connectOutlets: function(router, context){
					router.get('createUpdateProjectController').set("createFlag", true);
					router.get('createUpdateProjectController').set("updateFlag", false);
					router.get('applicationController').connectOutlet('body', 'createUpdateProject');
				},
				exit: function(router){
      				router.get('createUpdateProjectController').set("title", null);
      				router.get('createUpdateProjectController').set("description", null);
      				router.get('createUpdateProjectController').set("owner", null);
      				router.get('createUpdateProjectController').set("dueDate", null);
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

				projectOverview: Ember.Route.extend({
					route: '/overview',
					toolName: 'overview',
					index: Ember.Route.extend({
						route: '/',
						contextMenu: 'view',
						connectOutlets: function(router,project) {
							var aProject = router.get('topNaviController.content');
							router.get('applicationController').connectOutlet('body', 'tool',aProject);
							router.get('toolController').connectOutlet('tool-body', 'projectOverview',aProject);
						},
					}),

					projectEdit: Ember.Route.extend({
						route: '/edit',
						contextMenu: 'edit',
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
						exit: function(router){
		      				router.get('createUpdateProjectController').set("title", null);
		      				router.get('createUpdateProjectController').set("description", null);
		      				router.get('createUpdateProjectController').set("owner", null);
		      				router.get('createUpdateProjectController').set("dueDate", null);
		    			},

						goUpdate: function(router, evt){
							router.get('createUpdateProjectController').update(App.store.find(App.Project, evt.context.id));
						}
					}),

					projectDelete: Ember.Route.extend({
						route: '/delete',
						contextMenu: 'delete',
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
					})
				}),

				projectTasks: Ember.Route.extend({
					goToNewTask: Ember.Route.transitionTo('projectTasks.newTask'),

					route: '/tasks',
					toolName: 'tasks',

					index: Ember.Route.extend({
						route: '/',
						connectOutlets: function(router,project) {
							var aProject = router.get('topNaviController.content');
							router.get('applicationController').connectOutlet('body', 'tool',aProject);
							router.get('tasksController').set('tasks', aProject.get("tasks"));
							router.get('toolController').connectOutlet('tool-body', 'tasks');
						}
					}),

					goToSingleTask: function (router, event) {
							console.log(event);
						  var task = event.context;
						  console.log(task);
						  router.transitionTo('singletask.index', task.get("project"), task);
					},


					singletask: Ember.Route.extend({
						route: '/:id',
						modelType: 'App.Task',
						connectOutlets: function(router, context){
							router.get('singleTaskController').set("task", context);
						},		
						index: Ember.Route.extend({
							route: '/',	
							route: 'view',	
							connectOutlets: function(router,task) {
								var aTask = router.get('singleTaskController').get('task');
								router.get('toolController').connectOutlet('tool-body', 'singleTask',aTask);
							}
						}),

						editTask: Ember.Route.extend({
							route: '/edit',
							contextMenu: 'edit',
					        connectOutlets: function(router, task) {
					        	aTask = router.get('singleTaskController').get('content');
					        	//Rechteabfrage ausbauen mit Rechtesystem vom Backend
								if(App.get("session.sessionUserId")==aTask.get("creator.id")){
									router.get('createUpdateTaskController').set("updateFlag", true);
									router.get('createUpdateTaskController').set("createFlag", false);
									router.get('createUpdateTaskController').fill(aTask);
									//router.get('applicationController').connectOutlet('body', 'createUpdateTask', aTask);
									router.get('toolController').connectOutlet('tool-body', 'createUpdateTask',aTask);
								}
								else{
									var fm = App.FlashMessage.create({
										text: "You have no permission to edit this task"
									})
								}
							},
							cancel: Ember.Route.transitionTo("projectTasks.index"),
							exit: function(router){
			      				router.get('createUpdateTaskController').set("title", null);
			      				router.get('createUpdateTaskController').set("description", null);
			      				router.get('createUpdateTaskController').set("creator", null);
			      				router.get('createUpdateTaskController').set("dueDate", null);
			      				//router.get('createUpdateTaskController').set("project", null);
			      				router.get('createUpdateTaskController').set("estimatedHours", null);
			      				router.get('createUpdateTaskController').set("worker", null);
			      				//router.get('singleTaskController').set("content", null);

			     			},

							goUpdate: function(router, evt){
								router.get('createUpdateTaskController').update(evt.context);
								router.transitionTo('projectTasks.singletask.index', evt.context);
							},
						}),

						deleteTask: Ember.Route.extend({
							route: '/delete',
							contextMenu: 'delete',
							connectOutlets: function(router, task) {
								aTask = router.get('singleTaskController').get('content');
								if(App.get("session.sessionUserId")==aTask.get("creator.id")){
									router.get('singleTaskController').deleteTask(aTask);
								}
								else{
									var fm = App.FlashMessage.create({
										text: "You have no permission to delete this task"
									})
								}
							}
						}),

						completeTask: Ember.Route.extend({
							route: '/complete',
							contextMenu: 'complete',
						})

					}),

					newTask: Ember.Route.extend({
						route: '/new',
						enter: function(router){
							router.get('createUpdateTaskController').set("content", null);
						},
						connectOutlets: function(router, context){
							var aProject = router.get('topNaviController.content');
							router.get('createUpdateTaskController').set("createFlag", true);
							router.get('createUpdateTaskController').set("updateFlag", false);
							router.get('createUpdateTaskController').set("project", aProject);
							//router.get('applicationController').connectOutlet('body', 'createUpdateTask');
							router.get('toolController').connectOutlet('tool-body', 'createUpdateTask');
						},
						cancel: Ember.Route.transitionTo("projectTasks.index"),
						exit: function(router){
		      				//router.get('createUpdateTaskController').setProperties("title", null);
		      				router.get('createUpdateTaskController').set("title", null);
		      				router.get('createUpdateTaskController').set("description", null);
		      				router.get('createUpdateTaskController').set("creator", null);
		      				router.get('createUpdateTaskController').set("dueDate", null);
		      				//router.get('createUpdateTaskController').set("project", null);
		      				router.get('createUpdateTaskController').set("estimatedHours", null);
		      				router.get('createUpdateTaskController').set("worker", null);
		    			},

		    			goCreate: function(router, evt) {
		        			router.get('createUpdateTaskController').create();
		        			router.transitionTo('projectTasks.index');
		     			},
					}),
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
						contextMenu: 'view',
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
						contextMenu: 'add',
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
						contextMenu: 'edit',
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
