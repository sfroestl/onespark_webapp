<nav class="tool-nav nav-bar">
	<a class="back-button button-left" {{action goBack}}>
		<img src="/images/icon-back.png" alt="back" />
	</a>
	<a class="tools-button button-center" {{action goToTools href=true}}>{{view.currentToolName}}</a>
	<a class="context-button button-right" {{action goToContext}}>
		<img src="/images/icon-context.png" alt="context" />
	</a>

</nav>

	{{#if view.contextMenuStates}}
	<ul class="context-menu">
	  {{#each ctx in view.contextMenuStates}}
	    <li {{action goToTool ctx content}}>{{ctx.contextMenu}}</li>
	  {{/each}}
	</ul>
	{{/if}}
{{outlet tool-body}}
