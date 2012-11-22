<h2>Your own Projects</h2>
	<ul>
		{{#each project in controller}}
			{{#with project}}
				{{#if isLoaded}}
					<li>
	         			<a {{action showProject this href=true}}> {{title}} | {{due_date}}</a> 
	         		</li>
				{{else}}
					Loading.. {{! spinning circle GIF at this place would be nice :-)}}
         		{{/if}}
     		{{/with}}
		{{/each}}
	</ul>