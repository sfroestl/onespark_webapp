<a {{action goToNewTask href=true}} class="new-task-button task-elem clearfix">
	<span class="add-img"><img src="/images/icon-add.png"></span>
	<span class="add-txt">add task</span>
</a>

<h2>open tasks</h2>

<ul class="task-list">
	{{#each tasks}}
				<li {{bindAttr class="stateForCSS"}}>
         			{{#if isLoaded}}
						<a {{action goToSingleTask this href=true}}>{{title}}{{#if dueDate}} (due {{view "App.FriendlyTimeView" timeBinding="dueDate"}}){{/if}}</a>
         			{{else}}
						Loading..
         			{{/if}}
         		</li>      		
	{{/each}}
</ul>
