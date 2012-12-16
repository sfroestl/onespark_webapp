<h2>Tasks</h2>
<ul class="task-list">
	{{#each tasks}}
				<li {{bindAttr class="stateForCSS"}}>
         			{{#if isLoaded}}
						<a {{!action showTask this href=true}}>{{title}}{{#if dueDate}} (due {{view "App.FriendlyTimeView" timeBinding="dueDate"}}){{/if}}</a>
         			{{else}}
						Loading..
         			{{/if}}
         		</li>      		
	{{/each}}
</ul>
