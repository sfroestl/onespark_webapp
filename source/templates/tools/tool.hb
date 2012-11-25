<div class="tool-navigation">
	<a class="back-button" {{action goBack}}>Back</a>
	<a class="tools-button" {{action goToTools href=true}}>{{view.currentToolName}}</a>
	<a class="context-button" {{action goToContext}}>Context</a>
</div>
{{outlet tool-body}}
