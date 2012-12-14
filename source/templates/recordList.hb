{{#if view.showSorting}}
<h2>{{view.title}} 
  <span class="sorting">(sorted by {{view Ember.Select
       contentBinding="view.sortings"
       valueBinding="view.currentSorting"
       optionValuePath="content"
       optionLabelPath="content.name"}})
  </span>
</h2>
{{else}}
<h2>{{view.title}}</h2>
{{/if}}


{{#if view.showFilter}}
  {{view Ember.TextField valueBinding="view.filter"}}
{{/if}}

<ul class="record-list">
	{{#each record in view.sortedRecords}}
		{{#with record}}
				<li {{bindAttr class="stateForCSS"}}>
         			{{#if isLoaded}}
         			    {{view view.recordRow recordBinding="record"}}
         			{{else}}
						Loading...
         			{{/if}}
         		</li>      		
		{{/with}}
	{{/each}}
</ul>
