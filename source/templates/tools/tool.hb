<nav class="tool-nav nav-bar">
	<a class="back-button button-left" {{action goBack}}>
		<img src="images/icon-back.png" alt="back" />
	</a>
	<a class="tools-button button-center" href="#"{{action goToMain target="view"}}>{{view.currentToolCaption}}</a>
	{{#if view.showContextMenu}}
	<a class="context-button button-right" {{action goToContext}}>
		<img src="images/icon-context.png" alt="context" />
	</a>
    {{/if}}
</nav>

	{{#if view.contextMenuStates}}
	<ul class="context-menu">
	  {{#each ctx in view.contextMenuStates}}
	    <li><a {{action goToTool ctx content}} href="#">{{ctx.contextMenu}} </a></li>
	  {{/each}}
	</ul>
	{{/if}}
<div id="top">
{{outlet tool-body}}
