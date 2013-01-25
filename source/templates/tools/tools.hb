<ul>
	{{#each tool in view.availableTools}}
	<li {{action goToTool tool content}}>
		<a  >
			<!-- <span class="elem-image"></span> -->
			<span class="elem-desc">{{tool.toolName}}</span>
		</a>
	</li>
	{{/each}}
</ul>