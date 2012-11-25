<div class="tool-navigation">
	<a class="back-button" {{action goBack}}>Back</a>
	<a class="tools-button" {{action gotoTools}}>{{view.currentToolName}}</a>
	<a class="context-button" {{action gotoContext}}>Context</a>
</div>
{{outlet tool-body}}
