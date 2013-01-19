<hr/>
<table>
{{#if title}}
	<tr>
		<td>title:</td>
		<td>{{title}}</td>
	</tr>
{{/if}}

{{#if project}}
	<tr>
		<td>parent-project:</td>
		<td>{{project.title}}</td>
	</tr>
{{/if}}

{{#if desc}}
	<tr>
		<td>description:</td>
		<td>{{desc}}</td>
	</tr>
{{/if}}

{{#if dueDate}}
	<tr>
		<td>due:</td>
		<td>{{view "App.FriendlyTimeView" timeBinding="dueDate"}}</td>
	</tr>
{{/if}}

{{#if completed}}
	<tr>
		<td>completed by:</td>
		<td>{{completedBy.displayName}}</td>
	</tr>
	<tr>
		<td>completed at:</td>
		<td>{{view "App.FriendlyTimeView" timeBinding="completedAt"}}</td>
	</tr>
{{else}}
	<tr>
		<td>completed:</td>
		<td>false</td>
	</tr>
{{/if}}

{{#if estimatedHours}}
	<tr>
		<td>estimated Hours:</td>
		<td>{{estimatedHours}}</td>
	</tr>
{{/if}}

{{#if workedSessionTime}}
	<tr>
		<td>workedTime:</td>
		<td>{{workedSessionTime}}</td>
	</tr>
{{/if}}

{{#if creator}}
	<tr>
		<td>creator:</td>
		<td>{{creator.displayName}}</td>
	</tr>
{{/if}}

{{#if worker}}
	<tr>
		<td>worker:</td>
		<td>{{worker.username}}</td>
	</tr>
{{/if}}
</table>

{{#if isWorker}}
{{#unless completed}}
{{#unless aktiveTimeSession}}
{{#if timesessions.isLoaded}}
<button {{action goStartTimeSession}} class="btn-submit">start TimeSession</button>
{{/if}}
{{/unless}}
{{/unless}}
{{/if}}

{{view App.TimeSessionListView title="Active TimeSession" recordsBinding="openTimesessions" noRecords="no active session."}}
{{view App.TimeSessionListView title="Time Session History" recordsBinding="historyTimesessions" noRecords="no completed sessions."}}
