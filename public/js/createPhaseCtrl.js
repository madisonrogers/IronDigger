var last_selected_time;
var blockCount = 1;
var current_event;

const clearModal = () => {
	$("#workoutModal")
		.find("#workoutContainer")
		.empty();
	var $clone = $("#cloneblock-1")
		.clone(true)
		.attr("id", "block-1")
		.css("display", "block");
	$("#workoutContainer").append($clone);
	$("#workoutTime").val("");
	$("#workoutName").val("");
	blockCount = 1;
	// change all id's to have new 'block' variable
	populateBlock("block-1", "block-1", "1");
	$(".alert").hide();
};

const editEvent = calEvent => {
	console.log("in editEvent");
	populateEditModal(calEvent);
};

const populateEditModal = calEvent => {
	var blocks = calEvent.blocks;
	var workoutName = calEvent.title;
	var date = calEvent.start;
	var time = calEvent.time;

	$("#editWorkoutModal #workoutName").val(workoutName);
	$("#editWorkoutModal #workoutDate").val(date.format("l"));
	$("#editWorkoutModal #workoutTime").val(time);

	// populate the first block
	$("#editWorkoutModal")
		.find("#block-name-1")
		.text(blocks[0].name);
	$("#editWorkoutModal")
		.find("#ex-name-1")
		.text(blocks[0].exercises[0].name);
	$("#editWorkoutModal")
		.find("#notes")
		.val(blocks[0].exercises[0].notes);

	if (blocks[0].exercises.length <= 1) {
		var ex = blocks[0].exercises[0];
		$("#editWorkoutModal #block-1")
			.find("#trblock-1-ex-1-tr-1")
			.children()
			.each(function(i) {
				console.log(this);
				$(this).val(ex.sets[0][i]);
			});
		// for(var s = 2; s <= ex.sets.length; s++) {

		// }
	} else {
		var ex = blocks[0].exercises;

		console.log(ex);

		for (var k = 0; k < ex.length; k++) {
			if (k > 0) {
				var $id = "block-" + 1 + "-ex-" + k;
				var $newId = "block-" + 1 + "-ex-" + (k + 1);
				console.log("id: " + $id);
				console.log("newId: " + $newId);

				$("#e-cloneblock-1-ex-1")
					.clone(true)
					.attr("id", $newId)
					.css("display", "block")
					.insertAfter("#editWorkoutModal #" + $id);
				// change all id's to have new 'block' variable

				$("#editWorkoutModal #addblock-1-ex-" + k).attr(
					"id",
					"add" + $newId
				);

				$("#editWorkoutModal #ex-name-1").attr(
					"id",
					"ex-name-" + (k + 1)
				);

				$("#editWorkoutModal #notes-1").attr(
					"id",
					"notes-" + (k + 1)
				);


				$("#editWorkoutModal #" + $newId)
					.find(".table-add#block-1-ex-1-tr-1")
					.attr("id", $newId + "-tr-1");
				$("#editWorkoutModal #" + $newId)
					.find("#block-1-ex-1-table")
					.attr("id", $newId + "-table");
				$("#editWorkoutModal #" + $newId)
					.find("#trblock-1-ex-1-tr-1")
					.attr("id", "tr" + $newId + "-tr-1");

				$("#editWorkoutModal")
					.find("#ex-name-" + (k+ 1))
					.text(blocks[0].exercises[k].name);
				$("#editWorkoutModal")
					.find("#notes" + (k+1))
					.val(blocks[0].exercises[k].notes);
			}

			for (var i = 0; i < ex[k].sets.length; i++) {
				if (i < 1) {
					$("#editWorkoutModal #block-1")
						.find("#trblock-1-ex-" + (k + 1) + "-tr-" + (i + 1))
						.children()
						.each(function(j) {
							console.log(this);
							if (ex[k].sets[i] != undefined) {
								switch (j) {
									case 0:
										console.log("here");
										$(this).html(ex[k].sets[i].set);
										break;
									case 1:
										$(this).html(ex[k].sets[i].reps);
										break;
									case 2:
										$(this).html(ex[k].sets[i].percent);
										break;
								}
							}
						});
				} else {

					//k+2
					console.log("i was >= 1");
					var $clone = $(
						"#editWorkoutModal #block-1-ex-" + 1 + "-table"
					)
						.find("#e-clonetrblock-1-ex-1-tr-1")
						.clone(true)
						.removeClass("clone table-line")
						.attr("id", "trblock-1-ex-" + (k + 1) + "-tr-" + (i));
					$("#editWorkoutModal #block-1-ex-" + (k + 1) + "-table")
						.find("table")
						.append($clone);
					// need the button to pass in the correct ex and block
					$("#editWorkoutModal #trblock-1-ex-" + (k + 1) + "-tr-" + i).attr(
						"id",
						"trblock-1-ex-" + (k + 1) + "-tr-" + (i + 1)
					);

					$("#editWorkoutModal #block-1")
						.find("#trblock-1-ex-" + (k + 1) + "-tr-" + (i + 1))
						.children()
						.each(function(j) {
							console.log(this);
							if (ex[k].sets[i] != undefined) {
								switch (j) {
									case 0:
										console.log("here");
										$(this).html(ex[k].sets[i].set);
										break;
									case 1:
										$(this).html(ex[k].sets[i].reps);
										break;
									case 2:
										$(this).html(ex[k].sets[i].percent);
										break;
								}
							}
						});
				}
			}
		}
		// for(var s = 2; s <= ex.sets.length; s++) {

		// }
	}
	// for(var e = 1; e <= blocks[0].exercises.length; e++) {

	// }

	// for(var b = 1; b <= blocks.length; b++) {
	// 	var block = blocks[b-1];

	// 	// for each block, clone the block element
	// 	// $('#e-cloneblock-1').clone(true).css('display', 'block').attr('id', 'block-'+b).insertAfter();
	// }

	$("#editWorkoutModal").modal("toggle");
};

const populateBlock = (id, newId, block) => {
	console.log("inside populate block");
	console.log(id);
	console.log(newId);
	console.log(block);

	$("#" + newId)
		.find("#block-name-" + block)
		.attr("id", "block-name-" + blockCount);
	// add button #block-n
	console.log($("#" + newId).find("#block-1"));
	$("#" + newId)
		.find("#block-1")
		.attr("id", newId);
	// block-n-ex-n
	$("#" + newId)
		.find("#block-1-ex-1")
		.attr("id", newId + "-ex-1");
	// block-n-ex-n-tr-n
	$("#" + newId)
		.find(".table-add#block-1-ex-1-tr-1")
		.attr("id", newId + "-ex-1-tr-1");
	// block-n-ex-n-table
	$("#" + newId)
		.find("#block-1-ex-1-table")
		.attr("id", newId + "-ex-1-table");
	// block-n-ex-n-tr-n
	$("#" + newId)
		.find("#block-1-ex-1-tr-1")
		.attr("id", newId + "-ex-1-tr-1");
	// trblock-n-ex-n-tr-n
	$("#" + newId)
		.find("#trblock-1-ex-1-tr-1")
		.attr("id", "tr" + newId + "-ex-1-tr-1");
	// addblock-1-ex-1
	$("#" + newId)
		.find("#addblock-1-ex-1")
		.attr("id", "addblock-" + blockCount + "-ex-1");
};

const newEvent = date => {
	$("#workoutDate").val(date.format("l"));
	$("#workoutModal").modal("toggle");
	CURR_DATE = date;
};

const parseCreateWorkout = () => {
	var $date = $("#workoutDate").val();
	var $time = $("#workoutTime").val();
	var $name = $("#workoutName").val();

	var workout = {
		name: $name,
		blocks: [],
		time: $time,
		date: $date
	};

	var block = {
		name: String,
		exercises: []
	};

	var exercise = {
		name: String,
		notes: String,
		sets: []
	};

	blocks = [];
	// get blocks
	for (var i = 1; i <= blockCount; i++) {
		var ex = [];
		var blockObj = $("#block-" + i);
		var blockName = $("#block-name-" + i).text();

		var exercises = blockObj
			.children("[id^=block-" + i + "-ex-]")
			.each(function() {
				exercise = {};
				var exerciseName = $(this)
					.find("[id^=ex-name-]")
					.text();
				var exerciseNotes = $(this)
					.find(".form-control.ex1")
					.val();
				var idStr = $(this).attr("id");
				var exerciseNum = idStr.substr(idStr.lastIndexOf("-") + 1);
				var sets = getSets(i, exerciseNum);

				exercise.name = exerciseName;
				exercise.notes = exerciseNotes;
				exercise.sets = sets;
				ex.push(exercise);
			});

		block.name = blockName;
		block.exercises = ex;
		blocks.push(block);

		block = {};
		ex = [];
	}
	workout.blocks = blocks;
	return workout;
};

const getSets = (block, ex) => {
	var $rows = $("#block-" + block + "-ex-" + ex + "-table").find(
		"tr:not(:hidden)"
	);
	var headers = [];
	var data = [];
	// Get the headers (add special header logic here)
	$($rows.shift())
		.find("th:not(:empty)")
		.each(function() {
			headers.push(
				$(this)
					.text()
					.toLowerCase()
			);
		});

	// Turn all existing rows into a loopable array
	$rows.each(function() {
		var $td = $(this).find("td");
		var h = {};

		// Use the headers from earlier to name our hash keys
		headers.forEach(function(header, i) {
			h[header] = $td.eq(i).text();
		});

		data.push(h);
	});

	// Output the result
	return data;
};

$(function() {
	// hide the clone-able block.
	$("#cloneblock-1").hide();
	$("#cloneblock-1-ex-1").hide();
	$("#e-cloneblock-1").hide();
	$("#e-cloneblock-1-ex-1").hide();
	$(".alert").hide();

	//page is now ready, initialize the calendar...

	$("#calendar").fullCalendar({
		// put your options and callbacks here
		selectable: true,
		height: "auto",
		contentHeight: "auto",
		dayClick: function(date, jsEvent, view) {
			console.log(date.format("LLL"));

			console.log(view);
			newEvent(date);
		},
		// we will be able to load in workouts from the DB
		events: [
			{
				title: "Softball Workout",
				start: "2018-06-22T16:00:00",
				allDay: false,
				blocks: []
			},
			{
				title: "Football Workout",
				start: "2018-06-22T02:30:00",
				allDay: false,
				blocks: []
			}
		],

		eventClick: function(calEvent, jsEvent, view) {
			console.log(calEvent);
			console.log("Coordinates: " + jsEvent.pageX + "," + jsEvent.pageY);
			console.log(view);
			// change the border color just for fun
			$(this).css("border-color", "red");
			var current_event = calEvent;
			editEvent(calEvent);
		}
	});

	$("form").on("submit", function(e) {
		e.preventDefault();
	});

	// Add a new block
	$(".block-add").click(function() {
		var idStr = $(this).attr("id");
		var block = idStr.substr(idStr.indexOf("-") + 1);
		var id = "block-" + block;
		var newId = "block-" + (blockCount + 1);
		console.log("id: " + id);
		console.log("newId: " + newId);
		$("#cloneblock-1")
			.clone(true)
			.attr("id", newId)
			.css("display", "block")
			.insertAfter("#block-" + blockCount);
		blockCount++;
		populateBlock(id, newId, block);
		// change all id's to have new 'block' variable
	});

	$("#createWorkout").click(function() {
		console.log("#createWorkout clicked");
		date = CURR_DATE;
		console.log(date.format("l"));
		const workout = parseCreateWorkout();
		if (workout.name && workout.time) {
			var time = workout.time;
			var hour = time.substr(0, time.indexOf(":"));
			var min = time.substr(time.indexOf(":") + 1);
			console.log("hour: " + hour + " min: " + min);

			date.add(parseInt(hour), "hour");
			date.add(parseInt(min), "minute");

			console.log(date.format("LLL"));

			workout.title = workout.name;
			workout.start = date;
			workout.end = date;
			workout.allDay = false;
			workout.time = time;
			console.log(workout.start.format("l"));
			$("#calendar").fullCalendar("renderEvent", workout, true);
			$("#workoutModal").modal("hide");
			clearModal();
			//date = '';
		} else {
			// put some error handling
			$(".alert").css("display", "block");
		}
	});

	// Add a new exercise block
	$("[id^=addblock-").click(function() {
		var idStr = $(this).attr("id");
		console.log(idStr);
		var ex = idStr.substr(idStr.lastIndexOf("-") + 1);
		var block = idStr.substr(idStr.indexOf("-") + 1, 1);
		console.log("ex: " + ex);
		console.log("block: " + block);

		var $id = "block-" + block + "-ex-" + ex;
		var $newId = "block-" + block + "-ex-" + (parseInt(ex) + 1);
		console.log("id: " + $id);
		console.log("newId: " + $newId);
		$("#cloneblock-1-ex-1")
			.clone(true)
			.attr("id", $newId)
			.css("display", "block")
			.insertAfter("#" + $id);
		// change all id's to have new 'block' variable
		console.log(
			$("#" + $newId)
				.find("#block-2-ex-1-tr-1")
				.attr("id", $newId + "-tr-1")
		);
		$("#" + idStr).attr("id", "add" + $newId);

		$("#" + $newId)
			.find(".table-add#block-1-ex-1-tr-1")
			.attr("id", $newId + "-tr-1");
		$("#" + $newId)
			.find("#block-1-ex-1-table")
			.attr("id", $newId + "-table");
		$("#" + $newId)
			.find("#trblock-1-ex-1-tr-1")
			.attr("id", "tr" + $newId + "-tr-1");
	});

	var $TABLE = $("#table");
	var $BTN = $("#export-btn");
	var $EXPORT = $("#export");

	// Add a new table row
	$(".table-add").click(function() {
		var idStr = $(this).attr("id");
		var tr = idStr.substr(idStr.lastIndexOf("-") + 1);
		// console.log('tr: '+tr)
		idStr = idStr.substr(0, idStr.lastIndexOf("-") - 3);
		var ex = idStr.substr(idStr.lastIndexOf("-") + 1);
		var block = idStr.substr(idStr.indexOf("-") + 1, 1);
		var $id = "#block-" + block + "-ex-" + ex + "-tr-" + tr;
		var $newId =
			"trblock-" + block + "-ex-" + ex + "-tr-" + (parseInt(tr) + 1);
		var $clone = $("#block-" + block + "-ex-" + ex + "-table")
			.find("#trblock-" + block + "-ex-" + ex + "-tr-" + tr)
			.clone(true)
			.removeClass("clone table-line")
			.attr("id", $newId);
		$("#block-" + block + "-ex-" + ex + "-table")
			.find("table")
			.append($clone);
		// need the button to pass in the correct ex and block
		$("#block-" + block + "-ex-" + ex + "-tr-" + tr).attr(
			"id",
			"block-" + block + "-ex-" + ex + "-tr-" + (parseInt(tr) + 1)
		);
	});

	$(".table-remove").click(function() {
		var idStr = $(this)
			.parents("tr")
			.attr("id");
		var row = idStr.substr(idStr.lastIndexOf("-") + 1);
		var block = idStr.substr(idStr.indexOf("-") + 1, 1);
		idStr = idStr.substr(idStr.indexOf("-") + 3);
		var ex = idStr.substr(idStr.indexOf("-") + 1, 1);
		if (
			$(this)
				.parents("tr")
				.siblings().length > 2
		) {
			var highestRow = 1;
			// subtract 1 from all the row indexes higher than the deleted row
			for (
				var i = 0;
				i <
				$(this)
					.parents("tr")
					.siblings().length;
				i++
			) {
				var rowObj = $(this)
					.parents("tr")
					.siblings()[i];
				// console.log(rowObj)
				var currRowStr = rowObj.id;
				if (currRowStr != "header") {
					var currRow = currRowStr.substr(
						currRowStr.lastIndexOf("-") + 1
					);
					var c = rowObj.className;
					highestRow = currRow;
					if (currRow > row && c != "clone") {
						// console.log('currRow: ' + currRow)
						// console.log('subtracting 1 from id')
						rowObj.id =
							currRowStr.substr(
								0,
								currRowStr.lastIndexOf("-") + 1
							) +
							(currRow - 1);
					}
				}
			}
			// subract 1 from the button id
			// console.log('highestRow: ' + highestRow)
			if (highestRow < row) {
				var newButtonId =
					"block-" + block + "-ex-" + ex + "-tr-" + (row - 1);
				$(this)
					.parents()
					.find(
						".table-add#" +
							"block-" +
							block +
							"-ex-" +
							ex +
							"-tr-" +
							row
					)
					.attr("id", newButtonId);
			} else {
				var newButtonId =
					"block-" + block + "-ex-" + ex + "-tr-" + (highestRow - 1);
				$(this)
					.parents()
					.find(
						".table-add#" +
							"block-" +
							block +
							"-ex-" +
							ex +
							"-tr-" +
							highestRow
					)
					.attr("id", newButtonId);
			}

			// delete row
			$(this)
				.parents("tr")
				.detach();
		}
	});

	$(".table-up").click(function() {
		var $row = $(this).parents("tr");
		if ($row.index() === 1) return; // Don't go above the header
		$row.prev().before($row.get(0));
	});

	$(".table-down").click(function() {
		var $row = $(this).parents("tr");
		$row.next().after($row.get(0));
	});

	// A few jQuery helpers for exporting only
	jQuery.fn.pop = [].pop;
	jQuery.fn.shift = [].shift;
});
