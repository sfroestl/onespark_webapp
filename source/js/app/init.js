App = Ember.Application.create();
DS.AuthenticatedRESTAdapter = DS.RESTAdapter.extend({
  ajax: function(url, type, hash) {
    hash.headers || (hash.headers = {});
    hash.accept =  'json';
    hash.headers['Authorization'] = App.User.getSessionToken();
    console.log(hash);
    return DS.RESTAdapter.prototype.ajax.call(this,url, type, hash);
  }
});

App.store = DS.Store.create({
  revision: 7,
  adapter: DS.AuthenticatedRESTAdapter.create({
	url: 'http://api.onespark.de/api/v1/user',
    bulkCommit: false
  })
});
