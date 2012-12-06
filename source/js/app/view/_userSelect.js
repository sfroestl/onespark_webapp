App.UserSelectView = Ember.View.extend({
  templateName: 'userSelect',
  filter: "",
  users: [],
  filteredUsers: function() {
	  var filter = this.get("filter");
	  var users = this.get("users");
	  if (Ember.empty(filter)) return users;
	  var searchWords = filter.w();
	  return users.filter(function(user){
        return searchWords.every(function(search){
		  return user.matchesSearch(search);
	    }); 
	  });
  }.property("filter","users.[]"),
  user:null
});
