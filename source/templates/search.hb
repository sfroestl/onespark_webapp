<p>Search {{view Ember.TextField valueBinding="controller.query"}}</p>
{{view App.UserListView
  title="Matching Users"
  recordsBinding="controller.allUsers"
  filterBinding="controller.query"
  showFilter=false
  noRecords="There are no users to display."
  noFilteredRecords="Your search didn't match anyone."}}
{{view App.ProjectListView
  title="Matching Projects"
  recordsBinding="controller.allProjects"
  filterBinding="controller.query"
  showFilter=false
  noRecords="There are no projects to display."
  noFilteredRecords="Your search didn't match any project."}}
{{view App.TaskListView
  title="Matching Tasks"
  recordsBinding="controller.allTasks"
  filterBinding="controller.query"
  showFilter=false
  noRecords="There are no tasks to display."
  noFilteredRecords="Your search didn't match any task."}}
