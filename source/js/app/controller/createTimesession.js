App.CreateTimesessionController = Ember.Controller.extend({
	startDate: null,
	startTime: null,
	endDate: null,
	endTime: null,

	create: function(task, user) {
		var errorMessageText = "";

		var aTask = task;
		var aUser = user;

		var start = null;
		var end = null;

		//validates StartDate and StartTime
		if(this.get("startDate")!=null){
			var regexDate = "^((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])$";
			var validDate = this.get("startDate").match(regexDate);
			if(validDate){
				start = new Date(this.get("startDate"));
				if(this.get("startTime")!=null){
					var timefield = this.get('startTime').match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
					if(timefield){
						start.setHours(timefield[1]);
						start.setMinutes(timefield[2]);
					}
					else{
						if(errorMessageText!="") errorMessageText = errorMessageText + ", wrong starttimeformat";
						else errorMessageText = "wrong starttimeformat";		
						start = null;
					} 
				}
			}
			else{
				if(errorMessageText!="") errorMessageText = errorMessageText + ", wrong startdateformat";
				else errorMessageText = "wrong startdateformat";
			} 
		}
		else{
			if(errorMessageText!="") errorMessageText = errorMessageText + ", startDate required";
			else errorMessageText = "startDate required";
		};

		//validates EndDate and EndTime
		if(this.get("endDate")!=null){
			var regexDate = "^((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])$";
			var validDate = this.get("endDate").match(regexDate);
			if(validDate){
				end = new Date(this.get("endDate"));
				if(this.get("endTime")!=null){
					var timefield = this.get('endTime').match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
					if(timefield){
						end.setHours(timefield[1]);
						end.setMinutes(timefield[2]);
					}
					else{
						if(errorMessageText!="") errorMessageText = errorMessageText + ", wrong endtimeformat";
						else errorMessageText = "wrong endtimeformat";
						end = null;
					} 
				}
			}
			else{
				if(errorMessageText!="") errorMessageText = errorMessageText + ", wrong enddateformat";
				else errorMessageText = "wrong enddateformat";
			} 
		}
		else{
			if(errorMessageText!="") errorMessageText = errorMessageText + ", endDate required";
			else errorMessageText = "endDate required";
		};

		if((end!=null)&&(start!=null)){
			if(start>=end){
				errorMessageText = "start after end";
			}
			else{
				var timeSession = App.store.createRecord(App.Time_session, {start: start, end: end, task: aTask, user: aUser});
				showFlashMessageFor(timeSession);
				App.store.commit();
				App.router.transitionTo('projectTasks.singletask.index', aTask);
			}
		};
		if (errorMessageText !=""){
			var fm = App.FlashMessage.create({
				text: errorMessageText,
			});
			errorMessageText = null;
		};
		this.set("startTime", null);
		this.set("endTime", null);
	},
});