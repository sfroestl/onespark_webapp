<a class="home-button button-left" {{action goToProjects href=true}}>
	<img src="/images/icon-os.png" alt="Home" />
</a>

{{#if title}}
<a class="projects-button button-center" {{action showProject href=true}}>{{title}}</a>
{{else}}
	{{#if title}}
	<a class="projects-button button-center" {{action goToProjects href=true}}>add project</a>
	{{else}}
	<a class="projects-button button-center" {{action goToProjects href=true}}>all projects</a>
	{{/if}}
{{/if}}


<a class="search-button button-right"{{action goToSearch href=true}}>
	<img src="/images/icon-search.png" alt="Search" />
</a>
{{!outlet search}}
