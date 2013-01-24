
{{#if controller.admins}}
{{view App.UserListView
  title="Admins"
  recordsBinding="controller.admins"
  filterBinding="controller.filterText"
  showFilter=false
  noRecords="This project doesn't have any admins yet."
  noFilteredRecords="Your search didn't match any contributor."}}
{{/if}}
{{view App.UserListView
  title="Writers"
  recordsBinding="controller.writers"
  filterBinding="controller.filterText"
  showFilter=false
  noRecords="This project doesn't have any contributors yet."
  noFilteredRecords="Your search didn't match any contributor."}}
{{#if controller.readers}}
{{view App.UserListView
  title="Viewers"
  recordsBinding="controller.readers"
  filterBinding="controller.filterText"
  showFilter=false
  noRecords="This project doesn't have any viewers yet."
  noFilteredRecords="Your search didn't match any contributor."}}
{{/if}}

