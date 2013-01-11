App.RecordListView = Ember.View.extend({
  templateName: 'recordList',
  title: "List",
  controls: null,
  image: null,
  desc: null,
  records: [],
  filter: "",
  noRecords: "No records to display",
  noFilteredRecords: "No record matches your search.",
  showFilter: function() {
	  return this.get("records.length")>4;
  }.property("records.length"),
  filteredRecords: function() {
	  var filter = this.get("filter");
	  var records = this.get("records");
	  if (Ember.empty(filter)) return records;
	  var searchWords = filter.w();
	  return records.filter(function(record){
        return searchWords.every(function(search){
		  return record.get("matchesSearch").call(record,search);
	    }); 
	  });
  }.property("filter","records.[]"),
  sortings: [
    Ember.Object.create({name:"forename",sortProperties:["id"]})
  ],
  sortedRecords: null,
  
  currentSorting: null,
  sortingChangable: function() {
	  return this.get("sortings.length")>1;
  }.property("sortings.length"),  
  sortingRelevant: function() {
	  return this.get("sortingChangable") && this.get("filteredRecords.length")>1 ;
  }.property("filteredRecords.length","sortingChangable"),
  init: function() {
	this._super();
	this.set("sortedRecords",Ember.ArrayProxy.create(Ember.SortableMixin,{
		view:this,
		contentBinding:"view.filteredRecords",
		sortPropertiesBinding:"view.currentSorting.sortProperties",
	}));
	this.set("currentSorting",this.get("sortings.0"));
  },
  clickedRecord: function(record) {
	  
  }
});
