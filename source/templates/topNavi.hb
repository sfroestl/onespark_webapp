<a class="home-button button-left" {{action goToProjects href=true}}>
	<img src="images/icon-os.png" alt="Home" />
</a>

{{#if content}}
<a class="projects-button button-center" {{action showProject href=true}}>{{title}}</a>
{{else}}
<a class="projects-button button-center" {{action goToProjects href=true}}>all projects</a>
{{/if}}

{{#if view.searchActive}}
<a class="search-button button-right active"{{action goToSearch href=true}}>
	<img src="images/icon-search.png" alt="Search" />
</a>
{{/if}}
{{#unless view.searchActive}}
<a class="search-button button-right"{{action goToSearch href=true}}>
	<img src="images/icon-search.png" alt="Search" />
</a>
{{/unless}}
{{!outlet search}}
