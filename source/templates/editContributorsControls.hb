{{view Ember.Select
       contentBinding="controller.possiblePermissions"
       valueBinding="view.permission"
       optionValuePath="content.id"
       optionLabelPath="content.name"}}
<button {{action removeAsContributor record}}>remove</button>
