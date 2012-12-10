<h2>{{view.title}}</h2>
<ul class="project-list">
	{{#each project in view.projects}}
		{{#with project}}
				<li {{bindAttr class="stateForCSS"}}>
         			{{#if isLoaded}}
						<a {{action showProject this href=true}}>{{title}}{{#if dueDate}} (due {{view "App.FriendlyTimeView" timeBinding="dueDate"}}){{/if}}</a>
         			{{else}}
						Loading..
         			{{/if}}
         		</li>      		
		{{/with}}
	{{/each}}
</ul>
