App.UserListView = Ember.View.extend({
  templateName: 'userList',
  title: "User List",
  controls: null,
  users: [],
  filter: "",
  showFilter: false,
  filteredUsers: function() {
	  var filter = this.get("filter");
	  var users = this.get("users");
	  if (Ember.empty(filter)) return users;
	  var searchWords = filter.w();
	  return users.filter(function(user){
        return searchWords.every(function(search){
		  return user.get("matchesSearch").call(user,search);
	    }); 
	  });
  }.property("filter","users.[]"),
});
