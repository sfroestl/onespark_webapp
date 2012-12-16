App.UserListView = Ember.View.extend({
  templateName: 'userList',
  title: "User List",
  controls: null,
  users: [],
  filter: "",
  noUsers: "No users to display",
  noFilteredUsers: "No user matches your search.",
  showFilter: function() {
	  return this.get("users.length")>4;
  }.property("users.length"),
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
  sortings: [
    Ember.Object.create({name:"forename",sortProperties:["forenameOrUsername"]}),
    Ember.Object.create({name:"surname",sortProperties:["surnameOrUsername"]}),
  ],
  sortedUsers: null,
  
  currentSorting: null,
  sortingChangable: function() {
	  return this.get("sortings.length")>1;
  }.property("sortings.length"),  
  sortingRelevant: function() {
	  return this.get("sortingChangable") && this.get("filteredUsers.length")>1 ;
  }.property("filteredUsers.length","sortingChangable"),
  init: function() {
	this._super();
	this.set("sortedUsers",Ember.ArrayProxy.create(Ember.SortableMixin,{
		view:this,
		contentBinding:"view.filteredUsers",
		sortPropertiesBinding:"view.currentSorting.sortProperties",
	}));
	this.set("currentSorting",this.get("sortings.0"));
  }
});
