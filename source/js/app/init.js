App = Ember.Application.create();
DS.AuthenticatedRESTAdapter = DS.RESTAdapter.extend({
  ajax: function(url, type, hash) {
	App.session.insertAuthenticationInRequest(hash);
    return DS.RESTAdapter.prototype.ajax.call(this,url, type, hash);
  }
});

