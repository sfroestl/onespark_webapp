App.Project = DS.Model.extend({
    title: DS.attr('string'),
    desc: DS.attr('string'),
    owner: DS.attr('string')
//    due_date: DS.attr('date')
});
/*
App.Project = Ember.Object.extend();
App.Project.reopenClass({
  allProjects: [],
  findAll: function(){
    console.log(">> Find all Projects");
    // reset the projects array
    this.allProjects = [];

    // GET all projects
    $.ajax({
      url: 'http://api.onespark.de/api/v1/user/projects',
      type: 'GET',
      dataType: 'json',
      accept: 'json',
      // Basic auth for bob:testbob
      //headers: {'Authorization': 'Basic Ym9iOnRlc3Rib2I='},
      headers: {'Authorization': App.session.get("sessionToken")},
      context: this,
      error: function(jqXHR, textStatus){
        console.log ("--> ERROR");
        App.session.unauthorizedRequest();
        
      },
      success: function(data) {
        console.log ("Response recieved!");
        console.log ("response: " + JSON.stringify(data, null, 4));
        App.session.successfulRequest();
        data.forEach(function(project){
          this.allProjects.addObject(App.Project.create(project))
        }, this)
      }
    });
    return this.allProjects;
  },
  find:  function(id){
    
    console.log(">> Find single Project");
    this.singleProject = [];

    //GET single Project
    $.ajax({
      url: 'http://api.onespark.de/api/v1/user/projects/'+id,
      type: 'GET',
      dataType: 'json',
      accept: 'json',
      headers: {'Authorization': App.User.getSessionToken()},
      context: this,
      success: function(data){
        console.log ("Response recieved!");
        console.log ("response: " + JSON.stringify(data, null, 4));
        this.singleProject = data;
      }

    });
    return this.singleProject;
  }
});
*/
