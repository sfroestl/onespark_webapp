// Router //////
App.Router = Ember.Router.extend({
  enableLogging:  true,
  goToUsers:  Ember.Route.transitionTo('users'),
  goToProjects:  Ember.Route.transitionTo('projects'),

  //in progress
  // goRegister: Ember.Route.transitionTo('loggedOut'),


  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
        enter: function(router) {
              Ember.run.next(function() {
                if (App.User.isSignedIn()) {
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
        router.get('inController').set('sessionUser', App.User.getSessionUser());
      },
      goLoggedOut: function(router, evt) {
        console.log("Try logout");
        router.get('inController').logout();
        console.log("Session: " + App.User.signedIn);
        router.transitionTo('loggedOut');

      },
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
    }),

    loggedOut: Ember.Route.extend({
      connectOutlets: function(router, context){
        router.get('applicationController').connectOutlet('session', 'out');
      },
      goLoggedIn: function(router, evt) {
        console.log("Try login");
        router.get('outController').login();
        console.log("Session: " + App.User.signedIn);
        if(App.User.signedIn) {
          router.transitionTo('loggedIn');
        }
      }
    })



  })
});
