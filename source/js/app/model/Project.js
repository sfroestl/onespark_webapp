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
      headers: {'Authorization': App.User.getSessionToken()},
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
