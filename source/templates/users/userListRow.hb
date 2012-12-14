{{#if parentView.controls}}
	<img {{bindAttr src="displayAvatarUrl"}}>{{displayName}} {{view parentView.controls userBinding="record"}}
{{else}}
	<img {{bindAttr src="displayAvatarUrl"}}> <a {{action clickedUser this }}> {{displayName}}</a>					
{{/if}}
