{{view Ember.Select
       contentBinding="controller.possiblePermissions"
       valueBinding="view.permission"
       optionValuePath="content.id"
       optionLabelPath="content.name"}}
{{#with view.permission}}
<button {{action createContributor view.user view.permission}}>add</button>
{{/with}}
