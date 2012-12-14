App.RecordListView = Ember.View.extend({
  //set these
  title: "List",  
  records: null,
  noRecords: "No records to display.",
  noMatchingRecords: "No record matches your search.",  
  sortings: [Ember.Object.create({name:"none",sortProperties:[]})],
  recordRow: null,

  //override if needed
  showSorting: function() {
	  return this.get("records.length") > 1 && this.get("sortings.length")>1);  
  }.property("records.length","sortings.length"),
  showFilter: function() {
	  return this.get("records.length") >= 5;
  }.property("records.length"),
  
  
  //leave these alone
  sortedRecords: null,
  filter: "",
  templateName: 'recordList',  
  currentSorting: null;
  

  

  

  
  _filterRecords: function() {
	  var filter = this.get("filter");
	  var records = this.get("records");
	  if (Ember.empty(filter)) {
		  this.set("sortedRecords.content",records);
		  return;
	  }
	  var searchWords = filter.w();
	  var filtered = records.filter(function(item){
        return searchWords.every(function(search){
		  return item.matchesSearch(search);
	    }); 
	  });
	  this.set("sortedRecords.records",filtered);
  }.observes("filter","records.[]"),
  
  init: function() {
	  var sorted = Ember.ArrayProxy.create({
		  view:this,
		  sortPropertiesBinding: "view.currentSorting.sortProperties"
	  });
	  this.set("sortedRecords",sorted);
	  this.set("currentSorting",this.get("sortings.0"));
  }
});
