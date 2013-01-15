//create a subclass of a RESTAdapter which also handles authentication
DS.AuthenticatedRESTAdapter = DS.RESTAdapter.extend({

  ajax: function(url, type, hash) {
	var handlingSession = this.get("session");
    if (handlingSession) handlingSession.insertAuthenticationInRequest(hash); //if we have a handling session, use it to include authentication information

    var errorCallback = function(jqXHR, textStatus, errorThrown) {
		console.log("error at",url,":",jqXHR);
		if (textStatus=="error" && handlingSession)  {//Seems like an authentication Problem
			//App.router.send("unauthorizedRequest");
		}
	};
    if (hash.error) {	//is there allready an error handling
		if (Ember.isArray(hash.error)) {//execute this one first
			hash.error.unshift(errorCallback);	//if already a list, just add in front
		} else {
			hash.error = [errorCallback, hash.error]; //if a single callback, create a list with this error callback first
		}
	} else {
		hash.error = errorCallback; //no error handler yet, register this one
	}
		
    return DS.RESTAdapter.prototype.ajax.call(this,url, type, hash);
  }
});



