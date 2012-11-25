<ul class="tool-list">
{{#each tool in view.availableTools}}
 <li {{action goToTool tool content}}>{{tool.toolName}}</li>
{{/each}}
</ul>
