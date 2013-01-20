<h1>Add TimeSession</h1>	
<form>
	<fieldset>
	<label for="startdate">start-date</label>
	{{view Ember.TextField valueBinding="startDate" id="startdate" type="date" placeholder="YYYY-MM-DD"}}
	</fieldset>
	<fieldset>
	<label for="starttime">start-time</label>
	{{{view Ember.TextField valueBinding="startTime" id="starttime" placeholder="HH:mm"}}
	</fieldset>
	<fieldset>
	<label for="enddate">end-date</label>
	{{view Ember.TextField valueBinding="endDate" id="enddate" type="date" placeholder="YYYY-MM-DD"}}
	</fieldset>
	<fieldset>
	<label for="starttime">end-time</label>
	{{{view Ember.TextField valueBinding="endTime" id="endtime" placeholder="HH:mm"}}
	</fieldset>
	<fieldset>
	<button {{action cancel}} class="btn-cancel">cancel</button>
	<button {{action goCreate content}} class="btn-submit">add</button>
	</fieldset>
</form>