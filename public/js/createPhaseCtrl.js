var last_selected_time;
var cloneCount = 1;
var blockCount = 1;

$(function() {

	//page is now ready, initialize the calendar...

	$('#calendar').fullCalendar({
	  	// put your options and callbacks here
	  	selectable: true,
	  	height: 'auto',
	  	contentHeight: 'auto',
	  	dayClick: function(date, jsEvent, view) {
			// console.log('Clicked on: ' + date.format());
			// console.log(last_selected_time);
			// console.log(date);
			last_selected_time = date;
		
			$('#workoutDate').val(date.format('l'));
			$('#workoutModal').modal('toggle');
			
		},
		// select: function(startDate, endDate) {
		// 	// This is where the modal will be created to create the phase
	 //    },
	    // we will be able to load in workouts from the DB
	    events: [
		    {
		      	title  : 'Softball Workout',
		      	start  : '2018-06-22T16:00:00',
		      	allDay: false
		    },
		    {
		    	title: 'Football Workout',
		    	start: '2018-06-22T02:30:00',
		    	allDay: false
		    }
		]
	})


	$("[id^=add-block-").click(function() {
		var num = $(this).attr("id"); 
		var block_button = num.substr(num.lastIndexOf("-")+1)
		console.log(block_button)
		$( ".block-1-ex-1" ).clone(true).attr('class', 'block-'+(blockCount)+'-ex-'+(++cloneCount)).insertAfter('.block-1-ex-'+(cloneCount-1));
	});

	var $TABLE = $('#table');
	var $BTN = $('#export-btn');
	var $EXPORT = $('#export');

	$('.table-add').click(function () {
		var $clone = $TABLE.find('tr.clone').clone(true).removeClass('clone table-line');
		$TABLE.find('table').append($clone);
	});

	$('.table-remove').click(function () {
		$(this).parents('tr').detach();
	});

	$('.table-up').click(function () {
		var $row = $(this).parents('tr');
		if ($row.index() === 1) return; // Don't go above the header
		$row.prev().before($row.get(0));
	});

	$('.table-down').click(function () {
		var $row = $(this).parents('tr');
		$row.next().after($row.get(0));
	});

	// A few jQuery helpers for exporting only
	jQuery.fn.pop = [].pop;
	jQuery.fn.shift = [].shift;

	$BTN.click(function () {
		var $rows = $TABLE.find('tr:not(:hidden)');
		var headers = [];
		var data = [];
		
		// Get the headers (add special header logic here)
		$($rows.shift()).find('th:not(:empty)').each(function () {
			headers.push($(this).text().toLowerCase());
		});
		
		// Turn all existing rows into a loopable array
		$rows.each(function () {
			var $td = $(this).find('td');
			var h = {};
			
			// Use the headers from earlier to name our hash keys
			headers.forEach(function (header, i) {
				h[header] = $td.eq(i).text();   
			});
			
			data.push(h);
		});
		
		// Output the result
		$EXPORT.text(JSON.stringify(data));
	});

});