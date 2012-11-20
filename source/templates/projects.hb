<h2>Owned Projects:</h2>
	<ul>
		{{#each project in controller}}
			{{#with project}}
        		<li>
         			<a {{action showProject this href=true}}> {{title}} | {{due_date}}</a> 
         		</li>
     		{{/with}}
		{{/each}}
	</ul>

	<h2>Contributed Projects:</h2>