<nav class="tool-nav nav-bar">
	<a class="back-button button-left" {{action goBack}}>
		<img src="images/icon-back.png" alt="back" />
	</a>
	<a class="tools-button button-center" href="#"{{action goToMain target="view"}}>{{view.currentToolCaption}}</a>
	<a class="context-button button-right" {{ action fadeContext target="view"}}>
		<img src="images/icon-context.png" alt="context" />
	</a>
</nav>

	{{#if view.contextMenuStates}}
	<ul class="context-menu clearfix">
	  {{#each ctx in view.contextMenuStates}}
	    <li><a {{action goToTool ctx content}} href="#">{{ctx.contextMenu}} </a></li>
	  {{/each}}

	  <!-- TODO ich habe die Suche aus dem tool-body herausgenommen um sie auch im Kontextmenü anzubieten. Kann man den Controller des Toolbodys zur suche ansprechen? -->
	  {{#if view.showSearch}}
	  <!-- <li>Search {{view Ember.TextField valueBinding="controller.filterText"}}</li> -->
	  {{/if}}

	</ul>
	{{/if}}
<div id="top">
{{outlet tool-body}}
