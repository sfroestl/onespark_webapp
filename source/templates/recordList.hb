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
{{#if view.filteredRecords}}
<ul class="user-list">
	{{#each record in view.sortedRecords}}
		{{#with record}}
			<li {{!bindAttr class="stateForCSS"}} class="tool-elem clearfix">
				{{#if isLoaded}}
					<a {{action clickedRecord this target="view"}}> 
					{{view view.image recordBinding="record"}}
					{{view view.desc recordBinding="record"}}
					</a>
					{{#if view.controls}}
					{{view view.controls recordBinding="record"}}
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
{{#unless view.filteredRecords}}
  {{#if view.records}}<p>{{view.noFilteredRecords}}</p>{{/if}}
  {{#unless view.records}}<p>{{view.noRecords}}</p>{{/unless}}
{{/unless}}
