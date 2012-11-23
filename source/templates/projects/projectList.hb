<h2>{{view.title}}</h2>
<ul class="project-list">
	{{#each project in view.projects}}
		{{#with project}}
				<li {{bindAttr class="project.stateForCSS"}}>
         			{{#if isLoaded}}
						<a {{action showProject this href=true}}> {{title}} {{#if dueDate}}| {{due_date}}{{/if}}</a> 
         			{{else}}
						Loading.. {{! spinning circle GIF at this place would be nice :-)}}
         			{{/if}}
         		</li>      		
		{{/with}}
	{{/each}}
</ul>
