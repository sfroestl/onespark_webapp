<ul>
	{{#each tool in view.availableTools}}
	<li>
		<a  {{action goToTool tool content}}>
			<!-- <span class="elem-image"></span> -->
			<span class="elem-desc">{{tool.toolName}}</span>
		</a>
	</li>
	{{/each}}
</ul>