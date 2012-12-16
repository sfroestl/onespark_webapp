<h2 class="list-head">
{{view.title}}
{{#if view.sortingRelevant}}
 <span class="sort-btn">sorted by
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
 </span>
{{/if}}
</h2>

{{#if view.showFilter}}
  {{view Ember.TextField valueBinding="view.filter"}}
{{/if}}
{{#if view.filteredUsers}}
<ul class="user-list">
	{{#each user in view.sortedUsers}}
		{{#with user}}
				<li {{!bindAttr class="stateForCSS"}} class="tool-elem clearfix">
         	{{#if isLoaded}}
            <a {{action clickedUser this }}> 
         		{{#if view.controls}}
            <span class="elem-image">
						  <img {{bindAttr src="displayAvatarUrl"}} >
            </span>
            <span class="elem-desc">
              {{displayName}}
            </span>
            {{view view.controls userBinding="user"}}
						{{else}}
            <span class="elem-image">
						  <img {{bindAttr src="displayAvatarUrl"}}> 
            </span>
            <span class="elem-desc">
              {{displayName}}
            </span>
            </a>					
					  {{/if}}
         	{{else}}
						<a>
              <span class="elem-image">
              <img src="/images/icon-load.gif">
              </span>
              <span class="elem-desc">
              loading
              </span>
            </a>
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
