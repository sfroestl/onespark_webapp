<div class="task-details">
{{#if title}}
<ul class="clearfix">
	<li>
		<span class="label">title:</span>
		<span>{{title}}</span>
	</li>
{{/if}}

{{#if project}}
	<li>
		<span class="label">parent-project:</span>
		<span>{{project.title}}</span>
	</li>
{{/if}}

{{#if desc}}
	<li>
		<span class="label">description:</span>
		<span>{{desc}}</span>
	</li>
{{/if}}

{{#if dueDate}}
	<li>
		<span class="label">due:</span>
		<span>{{view "App.FriendlyTimeView" timeBinding="dueDate"}}</span>
	</li>
{{/if}}

{{#if completed}}
	<li>
		<span class="label">completed by:</span>
		<span>{{completedBy.displayName}}</span>
	</li>
	<li>
		<span class="label">completed at:</span>
		<span>{{view "App.FriendlyTimeView" timeBinding="completedAt"}}</span>
	</li>
{{else}}
	<li>
		<span class="label">completed:</span>
		<span>false</span>
	</li>
{{/if}}

{{#if estimatedHours}}
	<li>
		<span class="label">estimated Hours:</span>
		<span>{{estimatedHours}}</span>
	</li>
{{/if}}

{{#if workedSessionTime}}
	<li>
		<span class="label">workedTime:</span>
		<span>{{workedSessionTime}}</span>
	</li>
{{/if}}

{{#if creator}}
	<li>
		<span class="label">creator:</span>
		<span>{{creator.displayName}}</span>
	</li>
{{/if}}

{{#if worker}}
	<li>
		<span class="label">worker:</span>
		<span>{{worker.username}}</span>
	</li>
{{/if}}
</ul>
</div>
{{#if isWorker}}
{{#unless completed}}
{{#unless aktiveTimeSession}}
{{#if timesessions.isLoaded}}
<a {{action goStartTimeSession}} class="btn-timer list-elem clearfix">
	<span class="add-img"><img src="images/icon-timer.png"></span>
	<span class="add-txt">start working & count time</span>
</a>
{{/if}}
{{/unless}}
{{/unless}}
{{/if}}

{{view App.TimeSessionListView title="Active TimeSession" recordsBinding="openTimesessions" noRecords="no active session."}}
{{view App.TimeSessionListView title="Time Session History" recordsBinding="historyTimesessions" noRecords="no completed sessions."}}
