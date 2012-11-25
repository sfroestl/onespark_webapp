<h2>{{view.title}}</h2>
<ul class="user-list">
	{{#each user in view.users}}
		{{#with user}}
				<li {{bindAttr class="stateForCSS"}}>
         			{{#if isLoaded}}
						{{displayAvatarUrl}} <a {{action showUser this href=true}}> {{displayName}}</a> 
         			{{else}}
						Loading...
         			{{/if}}
         		</li>      		
		{{/with}}
	{{/each}}
</ul>
