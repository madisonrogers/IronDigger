var last_selected_time;
var blockCount = 1;

$(function() {
	// hide the clone-able block.
	$('#cloneblock-1').hide();
	$('#cloneblock-1-ex-1').hide();

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
		var newId = 'block-'+(blockCount+1)
		$('#cloneblock-1').clone(true).attr('id', newId).css('display','block').insertAfter('#block-'+blockCount)
		blockCount++;
		// change all id's to have new 'block' variable
		//block-name-#
		$('#'+newId).find('#block-name-'+block).attr('id', 'block-name-'+blockCount)
		// add button #block-n
		console.log($('#'+newId).find('#block-'+block))
		$('#'+newId).find('#block-'+block).attr('id', newId)
		// block-n-ex-n
		$('#'+newId).find('#'+id+'-ex-1').attr('id', newId+'-ex-1')
		// block-n-ex-n-tr-n
		$('#'+newId).find('.table-add#'+id+'ex-1-tr-1').attr('id', newId+'ex-1-tr-1')
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
		$( '#cloneblock-1-ex-1' ).clone(true).attr('id', $newId).css('display','block').insertAfter('#'+$id);
		// change all id's to have new 'block' variable
		$('#'+idStr).attr('id', 'add'+$newId);
		$('#'+$newId).find('#block-1-ex-1-tr-1').attr('id', $newId+'-tr-1')
		$('#'+$newId).find('#block-1-ex-1-table').attr('id', $newId+'-table')
		$('#'+$newId).find('#block-1-ex-1-tr-1').attr('id', $newId+'-tr-1')
		$('#'+$newId).find('#trblock-1-ex-1-tr-1').attr('id', 'tr'+$newId+'-tr-1')
	});

	var $TABLE = $('#table');
	var $BTN = $('#export-btn');
	var $EXPORT = $('#export');

	// Add a new table row
	$('.table-add').click(function () {
		var idStr = $(this).attr("id")
		var tr = idStr.substr(idStr.lastIndexOf("-")+1)
		// console.log('tr: '+tr)
		idStr = idStr.substr(0,idStr.lastIndexOf("-")-3)
		var ex = idStr.substr(idStr.lastIndexOf("-")+1)
		var block = idStr.substr(idStr.indexOf("-")+1,1)
		var $id = '#block-'+block+'-ex-'+ex+'-tr-'+tr;
		var $newId = 'trblock-'+block+'-ex-'+ex+'-tr-'+(parseInt(tr)+1)
		var $clone = $('#block-'+block+'-ex-'+ex+'-table').find('#trblock-'+block+'-ex-'+ex+'-tr-'+tr).clone(true).removeClass('clone table-line').attr('id', $newId);
		$('#block-'+block+'-ex-'+ex+'-table').find('table').append($clone);
		// need the button to pass in the correct ex and block
		$('#block-'+block+'-ex-'+ex+'-tr-'+tr).attr('id', 'block-'+block+'-ex-'+ex+'-tr-'+(parseInt(tr)+1));
	});

	$('.table-remove').click(function () {
		var idStr = $(this).parents('tr').attr('id')
		var row = idStr.substr(idStr.lastIndexOf("-")+1)
		var block = idStr.substr(idStr.indexOf('-')+1,1)
		idStr = idStr.substr(idStr.indexOf('-')+3)
		var ex = idStr.substr(idStr.indexOf('-')+1,1)
		// console.log('idStr: ' + idStr)
		// console.log('block: ' + block)
		// console.log('ex: ' + ex)
		// console.log('row: ' + row)
		// console.log('idStr: '+idStr)
		// only delete row if there are more than one, so there will never be no rows
		console.log($(this).parents('tr').siblings())
		if ($(this).parents('tr').siblings().length > 2) {
			var highestRow = 1;
			// subtract 1 from all the row indexes higher than the deleted row
			for(var i = 0; i < $(this).parents('tr').siblings().length; i++) {
				var rowObj = $(this).parents('tr').siblings()[i]
				// console.log(rowObj)
				var currRowStr = rowObj.id
				if(currRowStr != 'header') {
					var currRow = currRowStr.substr(currRowStr.lastIndexOf("-")+1)
					var c = rowObj.className
					highestRow = currRow;
					if(currRow > row && c != 'clone' ) {
						// console.log('currRow: ' + currRow)
						// console.log('subtracting 1 from id')
						rowObj.id = currRowStr.substr(0, currRowStr.lastIndexOf("-")+1) + (currRow-1)
					}
				}
				
			}
			// subract 1 from the button id
			// console.log('highestRow: ' + highestRow)
			if(highestRow < row) {
				var newButtonId = 'block-'+block+'-ex-'+ex+'-tr-'+(row-1)
				$(this).parents().find('.table-add#'+'block-'+block+'-ex-'+ex+'-tr-'+(row)).attr('id', newButtonId)
			} else {
				var newButtonId = 'block-'+block+'-ex-'+ex+'-tr-'+(highestRow-1)
				$(this).parents().find('.table-add#'+'block-'+block+'-ex-'+ex+'-tr-'+(highestRow)).attr('id', newButtonId)
			}
			
			// delete row
			$(this).parents('tr').detach();
		}
		
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