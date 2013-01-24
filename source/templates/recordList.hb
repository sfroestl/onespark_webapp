<h2 class="list-head">
{{view.title}}
{{#if view.sortingRelevant}}
 <span class="sort-btn"><span class="sort-desc">sort by</span>
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
<ul class="record-list">
	{{#each record in view.sortedRecords}}
		{{#with record}}
			<li {{!bindAttr class="stateForCSS"}} class="list-elem clearfix">
				{{#if isLoaded}}
					<a href="#" {{action clickedRecord this target="view"}}>
					{{view view.image recordBinding="record"}}
					{{view view.desc recordBinding="record"}}
					</a>
					{{#if view.controls}}
					{{view view.controls recordBinding="record"}}
					{{/if}}
				{{else}}
					<a>
					  <span class="elem-image">
						<img src="images/icon-load.gif">
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
<ul class="record-list">
  {{#if view.records}}<li class="list-elem empty">{{view.noFilteredRecords}}</li>{{/if}}
  {{#unless view.records}}<li class="list-elem empty">{{view.noRecords}}</li>{{/unless}}
</ul>
{{/unless}}
