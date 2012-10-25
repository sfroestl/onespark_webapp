App = Ember.Application.create();

// Router //////
App.Router = Ember.Router.extend({
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router){
        router.get('applicationController').connectOutlet('allProjects', App.Project.findAll());
      }
    })
  })
});


// Views //////
App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});
App.AllProjectsView = Ember.View.extend({
  templateName: 'projects'
});


// Controllers //////
App.ApplicationController = Ember.Controller.extend();

App.AllProjectsController = Ember.ArrayController.extend();

// Models ///////
App.Project = Ember.Object.extend();
App.Project.reopenClass({
  allProjects: [],
  findAll: function(){
    console.log(">> Find all Projects")
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
