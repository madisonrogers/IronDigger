$(function() {

	//page is now ready, initialize the calendar...

	$('#calendar').fullCalendar({
	  	// put your options and callbacks here
	  	selectable: true,
	  	height: 'auto',
	  	contentHeight: 'auto',
	  	dayClick: function(date, jsEvent, view) {
		    alert('Clicked on: ' + date.format());
		},
		select: function(startDate, endDate) {
			// This is where the modal will be created to create the phase
	      	alert('selected ' + startDate.format() + ' to ' + endDate.format());
	    },
	    // we will be able to load in workouts from the DB
	    events: [
		    {
		      	title  : 'Softball Workout',
		      	start  : '2018-05-22T16:00:00',
		      	allDay: false
		    },
		    {
		    	title: 'Football Workout',
		    	start: '2018-05-22T02:30:00',
		    	allDay: false
		    }
		]
	})

});