<span><a {{action goToProjects href=true}}>Home</a></span>
<span>
{{#if content}}
	<i><a {{action showProject href=true}}>{{title}}</a></i>
{{else}}
	all projects
{{/if}}
</span>
<span><a {{action goToSearch href=true}}>search</a><span><br/>
{{!outlet search}}