
<h2>{{view.title}}
{{#if view.sortingRelevant}}
 (sorted by
 {{#if view.sortingChangable}}
 {{view Ember.Select
       contentBinding="view.sortings"
       valueBinding="view.currentSorting"
       optionValuePath="content"
       optionLabelPath="content.name"}}
 {{/if}}
 {{#unless view.sortingChangable}}
 {{view.currentSorting.name}}
 {{/unless}}
 )
{{/if}}
</h2>
{{#if view.showFilter}}
  {{view Ember.TextField valueBinding="view.filter"}}
{{/if}}
{{#if view.filteredUsers}}
<ul class="user-list">
	{{#each user in view.sortedUsers}}
		{{#with user}}
				<li {{bindAttr class="stateForCSS"}}>
         			{{#if isLoaded}}
         			    {{#if view.controls}}
						<img {{bindAttr src="displayAvatarUrl"}}>{{displayName}} {{view view.controls userBinding="user"}}
						{{else}}
						<img {{bindAttr src="displayAvatarUrl"}}> <a {{action clickedUser this }}> {{displayName}}</a>					
						{{/if}}
         			{{else}}
						Loading...
         			{{/if}}
         		</li>      		
		{{/with}}
	{{/each}}
</ul>
{{/if}}
{{#unless view.filteredUsers}}
  {{#if view.users}}<p>{{view.noFilteredUsers}}</p>{{/if}}
  {{#unless view.users}}<p>{{view.noUsers}}</p>{{/unless}}
{{/unless}}
