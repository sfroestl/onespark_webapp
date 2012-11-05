App = Ember.Application.create();

// Expect credentials
App.USERNAME = "test";
App.PASSWORD = "test";

//Session
var logged = false;

// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('projects'),

  //in progress
  goLoggedOut: Ember.Route.transitionTo('loggedOut'),
  goRegister: Ember.Route.transitionTo('loggedOut'),


  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
        enter: function(router) {
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
      },
      goLoggedIn: function(router, evt) {
        console.log("Try login");
        router.get('outController').tryLogin();
        if(logged) {
          router.transitionTo('loggedIn');
        }
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

App.InController = Ember.Controller.extend();

App.RegisterController = Ember.Controller.extend();

App.RegisterController.registerInformation = Ember.Object.create({

  username: "",
  password: "",
  password_confirmation: "",
  email: "",
  valid: function() {
    return !(
      this.get('username').length > 0 && 
      this.get('password') == this.get('password_confirmation') && 
      this.get('password').length > 0 && 
      this.get('email').length > 0 
    );
  }.property("username","password","password_confirmation","email")

});

App.OutController = Ember.Controller.extend({

  username: '',
  password: '',
  isError: false,

  tryLogin: function() {
    console.log("InController: launched");
    var username = this.get("username");
    console.log("Check:" + username);
    console.log("Check:" + this.get("password"));

    if(this.get('username') === App.USERNAME &&
       this.get('password') === App.PASSWORD) {
      this.set('isError', false);
      this.set('username', '');
      this.set('password', '');
      logged = true;
      console.log("InController: everything ok");
    } else {
      this.set('isError', true);
      logged = false;
      console.log("InController: wrong username or password");
    }

    console.log("InController: loggedIn");
  }
});

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
