App = Ember.Application.create();

// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('projects'),
  //goHome:  Ember.Route.transitionTo('index'),
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('navigation', 'traversal');
      }
    }),
    users:  Ember.Route.extend({
      route: '/users',
      enter: function ( router ){
        console.log("The users sub-state was entered.");
      },
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('body', 'users');
        router.get('applicationController').connectOutlet('navigation', 'traversal');
      }
    }),
    projects:  Ember.Route.extend({
      route: '/projects',
      enter: function ( router ){
        console.log("The projects sub-state was entered.");
      },
      connectOutlets: function(router, context){
        //router.get('applicationController').connectOutlet('allProjects', App.Project.findAll());
        router.get('applicationController').connectOutlet('body', 'projects', App.Project.findAll());
        router.get('applicationController').connectOutlet('navigation', 'traversal');
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


// Controllers //////
App.ApplicationController = Ember.Controller.extend();

App.ProjectsController = Ember.ArrayController.extend();

App.UsersController = Ember.ArrayController.extend();

App.TraversalController = Em.ObjectController.extend();

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
