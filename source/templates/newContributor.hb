{{view App.UserSelectView usersBinding="controller.possibleUsers" userBinding="controller.user"}}
{{view Ember.Select
       contentBinding="controller.possiblePermissions"
       valueBinding="controller.permission"
       optionValuePath="content.id"
       optionLabelPath="content.name"}}
<button {{action goSave}}>save</button>
<a {{action "cancel" href="true"}}>cancel</a>
