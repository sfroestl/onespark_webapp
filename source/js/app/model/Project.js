App.Project = DS.Model.extend({
    title: DS.attr('string'),
    desc: DS.attr('string'),
    dueDate: DS.attr('date'),
    owner: DS.belongsTo('App.User'),
    coworkers: DS.hasMany('App.ProjectCoworker'),
    flashMessageName: function() {
		return "project \""+this.get("title")+"\"";
	}.property("title"),
    canChangeContributors: function(user) {
		user = user.get("originalModel");
		var owner =  this.get("owner.originalModel");
		if (user == owner) return true;
		return !!this.get("coworkers").find(function(c){
			return (c.get("permission") == 3) && (c.get("user") == user);
		});
	},
    contributors: function() {
		return this.get('coworkers').map(function(item) {
			return App.CoworkerOfProject.create({projectCoworker: item});
		});
	}.arrayProperty('coworkers.[]'),
    tasks: DS.hasMany('App.Task'),
	
	peopleInvolved: function() {
		var result = new Ember.Set();
		result.add(this.get("owner"));
		result.addEach(this.get("coworkers").mapProperty("user"));
		result.addEach(this.get("tasks").mapProperty("worker"));
		return result.toArray();
	}.arrayProperty("owner","coworkers.@each.user","tasks.@each.worker"),
	
	matchesSearch: function(word) {
		word = word.toLowerCase();
		var title = this.get("title");
		var desc = this.get("desc");
		var displayName = this.get("displayName");
		return (!!title && (title.toLowerCase().indexOf(word)!=-1)) ||
		(!!desc && desc.toLowerCase().indexOf(word)!=-1);
	},
});
DS.AuthenticatedRESTAdapter.map('App.Project', {
  owner: {key: 'owner_id'},
	coworkers: { key: 'project_coworker_ids' },
	dueDate: { key: 'due_date'},
    tasks: { key: 'task_ids'}
});
