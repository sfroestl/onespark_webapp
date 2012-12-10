{{view Ember.TextField valueBinding="view.filter"}}
{{view Ember.Select
       contentBinding="view.filteredUsers"
       valueBinding="view.user"
       optionValuePath="content"
       optionLabelPath="content.displayName"}}
