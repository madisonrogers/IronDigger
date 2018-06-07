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

	$('form').on('submit', function(e){
		e.preventDefault();
	});

	// Add a new block
	$('.block-add').click(function() {
		var idStr = $(this).attr("id")
		var block = idStr.substr(idStr.indexOf("-")+1)
		var id = 'block-'+block
		var newId = 'block-'+(parseInt(block)+1)
		$('#'+id).clone(true).attr('id', newId).insertAfter('#'+id)
		// change all id's to have new 'block' variable
		//block-name-#
		$('#'+newId).find('#block-name-'+block).attr('id', 'block-name-'+(parseInt(block)+1))
		// add button #block-n
		$('#'+newId).find('#block-'+block).attr('id', newId)
		// block-n-ex-n
		$('#'+newId).find('#'+id+'-ex-1').attr('id', newId+'-ex-1')
		// block-n-ex-n-table
		$('#'+newId).find('#'+id+'-ex-1-table').attr('id', newId+'-ex-1-table')
		// block-n-ex-n-tr-n
		$('#'+newId).find('#'+id+'-ex-1-tr-1').attr('id', newId+'-ex-1-tr-1')
		// trblock-n-ex-n-tr-n
		$('#'+newId).find('#tr'+id+'-ex-1-tr-1').attr('id', 'tr'+newId+'-ex-1-tr-1')
		// addblock-1-ex-1
		$('#'+newId).find('#addblock-'+block+'-ex-1').attr('id', 'addblock-'+(parseInt(block)+1)+'-ex-1')
	});

	// Add a new exercise block
	$("[id^=addblock-").click(function() {
		var idStr = $(this).attr("id"); 
		// console.log(idStr)
		var ex = idStr.substr(idStr.lastIndexOf("-")+1)
		var block = idStr.substr(idStr.indexOf("-")+1,1)
		var $id = 'block-'+block+'-ex-'+ex;
		var $newId = 'block-'+block+'-ex-'+(parseInt(ex)+1)
		console.log('id: ' + $id)
		console.log('newId: ' + $newId)
		$( '#'+$id ).clone(true).attr('id', $newId).insertAfter('#'+$id);
		// change all id's to have new 'block' variable
		$('#'+idStr).attr('id', 'add'+$newId);
		$('#'+$newId).find('#block-'+block+'-ex-'+ex+'-table').attr('id', $newId+'-table')
		$('#'+$newId).find('#'+$id + '-tr-1').attr('id', $newId+'-tr-1')
		$('#'+$newId).find('#tr' + $id +'-tr-1').attr('id', 'tr'+$newId+'-tr-1')
	});

	var $TABLE = $('#table');
	var $BTN = $('#export-btn');
	var $EXPORT = $('#export');

	// Add a new table row
	$('.table-add').click(function () {
		var idStr = $(this).attr("id")
		// console.log(idStr)
		var tr = idStr.substr(idStr.lastIndexOf("-")+1)
		idStr = idStr.substr(0,idStr.lastIndexOf("-")-3)
		// console.log(idStr)
		var ex = idStr.substr(idStr.lastIndexOf("-")+1)
		var block = idStr.substr(idStr.indexOf("-")+1,1)
		// console.log('block: '+block)
		// console.log('ex:' +ex)
		var $id = '#block-'+block+'-ex-'+ex+'-tr-'+tr;
		var $newId = 'trblock-'+block+'-ex-'+ex+'-tr-'+(parseInt(tr)+1)
		var $clone = $('#block-'+block+'-ex-'+ex+'-table').find('#trblock-'+block+'-ex-'+ex+'-tr-'+tr).clone(true).removeClass('clone table-line').attr('id', $newId);
		$('#block-'+block+'-ex-'+ex+'-table').find('table').append($clone);
		// console.log($clone)
		// need the button to pass in the correct ex and block
		$('#block-'+block+'-ex-'+ex+'-tr-'+tr).attr('id', 'block-'+block+'-ex-'+ex+'-tr-'+(parseInt(tr)+1));
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