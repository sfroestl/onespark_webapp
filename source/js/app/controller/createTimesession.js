App.CreateTimesessionController = Ember.Controller.extend({
	startDate: null,
	startTime: null,
	endDate: null,
	endTime: null,

	create: function(task, user) {
		var startDatePick = this.get('startDate').split("-");
		var startTimePick = this.get('startTime').split(":");
		var newStart = new Date(startDatePick[0], startDatePick[1], startDatePick[2],startTimePick[0],startTimePick[1], 0, 0);
		console.log(newStart);
		if (isNaN(newStart)) {
			newStart = null;
		};
		console.log(newStart);

		var endDatePick = this.get('endDate').split("-");
		var endTimePick = this.get('endTime').split(":");
		var newEnd = new Date(endDatePick[0], endDatePick[1], endDatePick[2], endTimePick[0], endTimePick[1], 0, 0);
		console.log(newEnd);
		if(isNaN(newEnd)){
			newEnd = null;
		};
		console.log(newEnd);

		var aTask = task;
		console.log(aTask);

		var aUser = user;
		console.log(aUser);

		var timeSession = App.store.createRecord(App.Time_session, {start: newStart, end: newEnd, task: aTask, user: aUser});
		showFlashMessageFor(timeSession);

		App.store.commit();
		//new Date(year, month, day, hours, minutes, seconds, milliseconds)

		// 		var str="How are you doing today?";
		// var n=str.split(" ");
	},
});