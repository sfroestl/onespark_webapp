<h2>{{view.title}}</h2>
{{#if view.showFilter}}
  {{view Ember.TextField valueBinding="view.filter"}}
{{/if}}
<ul class="user-list">
	{{#each user in view.filteredUsers}}
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
