App = Ember.Application.create();

// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('projects'),

  //in progress
  goLoggedIn: Ember.Route.transitionTo('loggedIn'),
  goLoggedOut: Ember.Route.transitionTo('loggedOut'),

  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
        enter: function(router) {
            var logged = false;/* get from appropriated source... */
            Ember.run.next(function() {
                if (logged) {
                    router.transitionTo('loggedIn');
                } else {
                    router.transitionTo('loggedOut');
                }
            });
        }
    }),

    loggedIn: Ember.Route.extend({
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('session', 'in');
        router.get('inController').connectOutlet('navigation', 'traversal');
      }
    }),

    loggedOut: Ember.Route.extend({
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('session', 'out');
        //router.get('applicationController').connectOutlet('navigation', 'traversal');
      }
    }),

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
    projects:  Ember.Route.extend({
      route: '/projects',
      enter: function ( router ){
        console.log("The projects sub-state was entered.");
      },
      connectOutlets: function(router, context){
        //router.get('applicationController').connectOutlet('allProjects', App.Project.findAll());
        router.get('inController').connectOutlet('body', 'projects', App.Project.findAll());
        router.get('inController').connectOutlet('navigation', 'traversal');
      }
    })
  })
});


// Views //////
App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

App.ProjectsView = Ember.View.extend({
  templateName: 'projects'
});

App.UsersView = Ember.View.extend({
  templateName: 'users'
});

App.TraversalView = Em.View.extend({
  templateName:  'traversal'
});

App.OutView = Ember.View.extend({
  templateName: 'out'
});

App.InView = Ember.View.extend({
  templateName: 'in'
});


// Controllers //////
App.ApplicationController = Ember.Controller.extend();

App.ProjectsController = Ember.ArrayController.extend();

App.UsersController = Ember.ArrayController.extend();

App.TraversalController = Em.ObjectController.extend();

App.OutController = Ember.Controller.extend();

App.InController = Ember.Controller.extend();

// Models ///////
App.Project = Ember.Object.extend();
App.Project.reopenClass({
  allProjects: [],
  findAll: function(){
    console.log(">> Find all Projects")
    // reset the projects array
    this.allProjects = []

    // GET all projects
    $.ajax({
      url: 'http://api.onespark.de/api/v1/projects',
      type: 'GET',
      dataType: 'json',
      accept: 'json',
      // Basic auth for bob:testbob
      headers: {'Authorization': 'Basic Ym9iOnRlc3Rib2I='},
      context: this,
      success: function(data) {
        console.log ("Response recieved!");
        console.log ("response: " + JSON.stringify(data, null, 4));
        data.forEach(function(project){
          this.allProjects.addObject(App.Project.create(project))
        }, this)
      }
    });
    return this.allProjects;
  }
});

App.initialize();
