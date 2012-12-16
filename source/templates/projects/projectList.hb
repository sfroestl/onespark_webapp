<div class="project-list-head list-head">
	{{view.title}}
	<a href="" class="project-list-sort-btn">sort by: last changes</a>
</div>
<ul class="project-list">
	{{#each project in view.projects}}
		{{#with project}}
				<li {{! bindAttr class="stateForCSS"}} class="project-elem">
         			{{#if isLoaded}}
						<a {{action showProject this href=true}}>{{title}}
							{{#if dueDate}} 
							<span class="project-due-date">due {{view "App.FriendlyTimeView" timeBinding="dueDate"}}</span>
							{{/if}}
						</a>
         			{{else}}
						<a><img src="/images/icon-load.gif"> loading</a>
         			{{/if}}
         		</li>      		
		{{/with}}
	{{/each}}
</ul>
