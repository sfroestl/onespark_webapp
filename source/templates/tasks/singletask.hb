<div class="task-details">
{{#if title}}
	<p>
		<span>title:</span>
		<span>{{title}}</span>
	</p>
{{/if}}

{{#if project}}
	<p>
		<span>parent-project:</span>
		<span>{{project.title}}</span>
	</p>
{{/if}}

{{#if desc}}
	<p>
		<span>description:</span>
		<span>{{desc}}</span>
	</p>
{{/if}}

{{#if dueDate}}
	<p>
		<span>due:</span>
		<span>{{view "App.FriendlyTimeView" timeBinding="dueDate"}}</span>
	</p>
{{/if}}

{{#if completed}}
	<p>
		<span>completed by:</span>
		<span>{{completedBy.displayName}}</span>
	</p>
	<p>
		<span>completed at:</span>
		<span>{{view "App.FriendlyTimeView" timeBinding="completedAt"}}</span>
	</p>
{{else}}
	<p>
		<span>completed:</span>
		<span>false</span>
	</p>
{{/if}}

{{#if estimatedHours}}
	<p>
		<span>estimated Hours:</span>
		<span>{{estimatedHours}}</span>
	</p>
{{/if}}

{{#if workedSessionTime}}
	<p>
		<span>workedTime:</span>
		<span>{{workedSessionTime}}</span>
	</p>
{{/if}}

{{#if creator}}
	<p>
		<span>creator:</span>
		<span>{{creator.displayName}}</span>
	</p>
{{/if}}

{{#if worker}}
	<p>
		<span>worker:</span>
		<span>{{worker.username}}</span>
	</p>
{{/if}}


{{#if isWorker}}
{{#unless completed}}
{{#unless aktiveTimeSession}}
{{#if timesessions.isLoaded}}
<button {{action goStartTimeSession}} class="btn-submit">start TimeSession</button>
{{/if}}
{{/unless}}
{{/unless}}
{{/if}}
</div>
{{view App.TimeSessionListView title="Active TimeSession" recordsBinding="openTimesessions" noRecords="no active session."}}
{{view App.TimeSessionListView title="Time Session History" recordsBinding="historyTimesessions" noRecords="no completed sessions."}}
