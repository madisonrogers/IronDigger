var blockCount = 1;
var editBlockCount = 1;
// var current_event;
var team_select = false;
var SELECTED_TEAM_NAME;
var SELECTED_TEAM_VAL;
var server = window.location.origin;
var CURR_DATE;
var CURRENT_EVENT;
var EDIT_EVENT = false;

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

const clearEditModal = () => {
	$("#editWorkoutModal")
		.find(".ew-clear")
		.empty();
	var $clone = $("#e-cloneblock-1")
		.clone(true)
		.attr("id", "block-1")
		.css("display", "block");
	$("#editWorkoutModal .ew-clear").append($clone);
	$("#editWorkoutModal #workoutTime").val("");
	$("#editWorkoutModal #workoutName").val("");
	editBlockCount = 1;
	//blockCount = 1;
	// change all id's to have new 'block' variable
	populateEditBlock("block-1", "block-1", "1");
	$(".alert").hide();
};

const clearChooseModal = () => {
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
	//blockCount = 1;
	// change all id's to have new 'block' variable
	//populateBlock("block-1", "block-1", "1");
	$(".alert").hide();
};

const editEvent = calEvent => {
	console.log('about to log calEvent')
	console.log(calEvent)
	CURR_DATE = calEvent;
	console.log("in editEvent");
	populateEditModal(calEvent);
};

const populateEditModal = calEvent => {
	console.log(calEvent);
	var blocks = calEvent.blocks;
	
	//editBlockCount = blocks.length;
	var workoutName = calEvent.title;
	var date = calEvent.start;
	var time = calEvent.time;
	console.log(typeof(date));
	// set name, date, time
	$("#editWorkoutModal #workoutName").val(workoutName);
	$("#editWorkoutModal #workoutDate").val((typeof(date) === "string") ? date : date.format("l"));
	$("#editWorkoutModal #workoutTime").val(time);

	// populate the first block
	// block name
	$("#editWorkoutModal #workoutContainer")
		.find("#block-name-1")
		.text(blocks[0].name);
	// exercise name for first block first exercise
	$("#editWorkoutModal #workoutContainer")
		.find("#ex-name-1")
		.text(blocks[0].exercises[0].name);
	// exercise notes for first block first exercise
	$("#editWorkoutModal #workoutContainer")
		.find("#notes-1")
		.val(blocks[0].exercises[0].notes);

	// if there is one exercise
	if (blocks[0].exercises.length <= 1) {
		var ex = blocks[0].exercises[0]; 
		for (var i = 0; i < ex.sets.length; i++) {
			if (i < 1) {
				$("#editWorkoutModal #workoutContainer #block-1")
					.find("#trblock-1-ex-1-tr-" + (i + 1))
					.children()
					.each(function(j) {
						console.log(this);
						if (ex.sets[i] != undefined) {
							switch (j) {
								case 0:
									console.log("here");
									$(this).html(ex.sets[i].set);
									break;
								case 1:
									$(this).html(ex.sets[i].reps);
									break;
								case 2:
									$(this).html(ex.sets[i].percent);
									break;
							}
						}
					});
			} else {
				//k+2
				console.log("i was >= 1");
				var $clone = $(
					"#editWorkoutModal #workoutContainer #block-1-ex-1-table"
				)
					.find("#e-clonetrblock-1-ex-1-tr-1")
					.clone(true)
					.removeClass("clone table-line")
					.attr(
						"id",
						"trblock-1-ex-1-tr-" + (i + 1)
					);
				$(
					"#editWorkoutModal #workoutContainer #block-1-ex-1-table"
				)
					.find("table")
					.append($clone);
				// need the button to pass in the correct ex and block
				$(
					"#editWorkoutModal #workoutContainer #block-1-ex-1 #e-block-1-ex-1-tr-1"
				).attr(
					"id",
					"e-block-1-ex-1-tr-" + (i + 2)
				);

				$("#editWorkoutModal #workoutContainer #block-1")
					.find("#trblock-1-ex-1-tr-" + (i + 1))
					.children()
					.each(function(j) {
						console.log(this);
						if (ex.sets[i] != undefined) {
							switch (j) {
								case 0:
									console.log("here");
									$(this).html(ex.sets[i].set);
									break;
								case 1:
									$(this).html(ex.sets[i].reps);
									break;
								case 2:
									$(this).html(ex.sets[i].percent);
									break;
							}
						}
					});
				}
			}
	} else {
		// more than one exercise
		var ex = blocks[0].exercises;

		console.log(ex);

		// loop through exercises of first block
		for (var k = 0; k < ex.length; k++) {
			// cloning new exercise then populating it
			if (k > 0) {
				var $id = "block-" + 1 + "-ex-" + k;
				var $newId = "block-" + 1 + "-ex-" + (k + 1);
				console.log("id: " + $id);
				console.log("newId: " + $newId);

				// cloning an exercise block in editWorkoutModal
				$("#e-cloneblock-1-ex-1")
					.clone(true)
					.attr("id", $newId)
					.css("display", "block")
					.insertAfter("#editWorkoutModal #workoutContainer #" + $id);

				// Changing the Id of the add exercise button
				// $("#editWorkoutModal #workoutContainer #addblock-e-1-ex-" + k).attr(
				// 	"id",
				// 	"add" + $newId
				// );

				// Sets the id and name of the exercise name
				$(
					"#editWorkoutModal #block-1-ex-" +
						(k + 1) +
						" #clone-ex-name-1"
				)
					.attr("id", "ex-name-" + (k + 1))
					.text(blocks[0].exercises[k].name);

				// sets the id and text of the exercise notes
				$(
					"#editWorkoutModal #block-1-ex-" +
						(k + 1) +
						" #clone-notes-1"
				)
					.attr("id", "notes-" + (k + 1))
					.val(blocks[0].exercises[k].notes);

				var addButtonId = "addblock-e-1-ex-" + k;

				var newAdd = addButtonId.substr(0, addButtonId.length - 1);
				newAdd += k + 1;
				$("#editWorkoutModal #workoutContainer #" + addButtonId).attr(
					"id",
					newAdd
				);

				$("#editWorkoutModal #" + $newId)
					.find(".table-add#e-clone-block-1-ex-1-tr-1")
					.attr("id", "e-" + $newId + "-tr-1");
				$("#editWorkoutModal #" + $newId)
					.find("#clone-block-1-ex-1-table")
					.attr("id", $newId + "-table");
				$("#editWorkoutModal #" + $newId)
					.find("#clone-trblock-1-ex-1-tr-1")
					.attr("id", "tr" + $newId + "-tr-1");

				$("#editWorkoutModal")
					.find("#ex-name-" + (k + 1))
					.text(blocks[0].exercises[k].name);
				$("#editWorkoutModal")
					.find("#notes" + (k + 1))
					.val(blocks[0].exercises[k].notes);
			}

			for (var i = 0; i < ex[k].sets.length; i++) {
				if (k != 0) {
					if (i < 1) {
						$("#editWorkoutModal #workoutContainer #block-1")
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
							"#editWorkoutModal #workoutContainer #block-1-ex-" +
								(k + 1) +
								"-table"
						)
							.find("#e-clonetrblock-1-ex-1-tr-1")
							.clone(true)
							.removeClass("clone table-line")
							.attr(
								"id",
								"trblock-1-ex-" + (k + 1) + "-tr-" + (i + 1)
							);
						$(
							"#editWorkoutModal #workoutContainer #block-1-ex-" +
								(k + 1) +
								"-table"
						)
							.find("table")
							.append($clone);
						// need the button to pass in the correct ex and block
						$(
							"#editWorkoutModal #workoutContainer #block-1-ex-" +
								(k + 1) +
								" #e-clone-block-1-ex-1-tr-1"
						).attr(
							"id",
							"e-block-1-ex-" + (k + 1) + "-tr-" + (i + 1)
						);

						$("#editWorkoutModal #workoutContainer #block-1")
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
				} else {
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
							"#editWorkoutModal #workoutContainer #block-1-ex-" +
								(k + 1) +
								"-table"
						) // CHANGED TO e-clonetrblock from clonetrblock
							.find("#e-clonetrblock-1-ex-1-tr-1")
							.clone(true)
							.removeClass("clone table-line")
							.attr(
								"id",
								"trblock-1-ex-" + (k + 1) + "-tr-" + (i + 1)
							);
						$("#editWorkoutModal #workoutContainer #block-1-ex-" + (k + 1) + "-table")
							.find("table")
							.append($clone);
						// need the button to pass in the correct ex and block
						$(
							"#editWorkoutModal #workoutContainer #e-block-1-ex-" +
								(k + 1) +
								"-tr-" +
								i
						).attr(
							"id",
							"e-block-1-ex-" + (k + 1) + "-tr-" + (i + 1)
						);

						$("#editWorkoutModal #workoutContainer #block-1")
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
		}
	}

	// populate additional blocks
	for (var m = 1; m < blocks.length; m++) {
		var idStr = $(this).attr("id");
		var block = m;
		var id = "block-" + block;
		var newId = "block-" + (m + 1);
		console.log("id: " + id);
		console.log("newId: " + newId);
		$("#editWorkoutModal .form-group#e-cloneblock-1")
			.clone(true)
			.attr("id", newId)
			.css("display", "block")
			.insertAfter("#editWorkoutModal #workoutContainer #block-" + m);

		editBlockCount++; // increase the block count by 1
		populateEditBlock(id, newId, block);
		
		$("#editWorkoutModal #workoutContainer #block-" + (m + 1))
			.find("#block-name-1")
			.text(blocks[m].name);

		// loop through all the exercises and sets to populate the block
		// if there is one exercise
		if (blocks[m].exercises.length <= 1) {
			var ex = blocks[m].exercises[0];
			console.log(ex)
			$("#editWorkoutModal #workoutContainer #block-" + (m + 1))
				.find("#ex-name-1")
				.text(blocks[m].exercises[0].name);
			// exercise notes for first block first exercise
			$("#editWorkoutModal #workoutContainer #block-" + (m + 1))
				.find("#notes-1")
				.val(blocks[m].exercises[0].notes);

			// loop through the sets to add each row
			for (var i = 0; i < ex.sets.length; i++) {
				if (i < 1) { // This part works
					$("#editWorkoutModal #block-" + (m + 1))
						.find("#clonetrblock-1-ex-1-tr-1")
						.attr('id',"trblock-"+(m+1)+"-ex-1-tr-"+(i+1))
					// set the table button to have the right block number
					$("#editWorkoutModal #workoutContainer #block-" +(m+1)+ "-ex-1")
						.find("#e-block-1-ex-1-tr-1")
						.attr('id',"e-block-"+(m+1)+'-ex-1-tr-1')

					// set the add exercise button to have the correct block num
					$("#editWorkoutModal #workoutContainer #block-" +(m+1))
						.find("#addblock-e-1-ex-1")
						.attr('id','addblock-e-'+(m+1)+'-ex-1')

					$("#editWorkoutModal #block-" + (m + 1))
						.find(
							"#trblock-" +
								(m + 1) +
								"-ex-" +
								1 +
								"-tr-" +
								(i + 1)
						)
						.children()
						.each(function(j) {
							console.log(this);
							if (ex.sets[i] != undefined) {
								switch (j) {
									case 0:
										console.log("here");
										$(this).html(ex.sets[i].set);
										break;
									case 1:
										$(this).html(
											ex.sets[i].reps
										);
										break;
									case 2:
										$(this).html(
											ex.sets[i].percent
										);
										break;
								}
							}
						});
				} else {
					//k+2
					console.log("i was >= 1");
					var $clone = $(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1) +
							"-ex-" +
							(1) +
							"-table"
					)
						.find("#e-clonetrblock-1-ex-1-tr-1")
						.clone(true)
						.removeClass("clone table-line")
						.attr(
							"id",
							"trblock-" +
								(m + 1) +
								"-ex-" +
								(1) +
								"-tr-" +
								(i + 1)
						);
					$(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1) +
							"-ex-" +
							(1) +
							"-table"
					)
						.find("table")
						.append($clone);
					// need the button to pass in the correct ex and block
					$(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1) +
							"-ex-" +
							(1) +
							" #e-block-" +
							(m + 1) +
							"-ex-" +
							(1) +
							"-tr-" +
							i
					).attr(
						"id",
						"e-block-" +
							(m + 1) +
							"-ex-" +
							(1) +
							"-tr-" +
							(i + 1)
					);

					$(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1)
					)
						.find(
							"#trblock-" +
								(m + 1) +
								"-ex-" +
								(1) +
								"-tr-" +
								(i + 1)
						)
						.children()
						.each(function(j) {
							console.log(this);
							if (ex.sets[i] != undefined) {
								switch (j) {
									case 0:
										console.log("here");
										$(this).html(ex.sets[i].set);
										break;
									case 1:
										$(this).html(
											ex.sets[i].reps
										);
										break;
									case 2:
										$(this).html(
											ex.sets[i].percent
										);
										break;
								}
							}
						});
				}
			}
		} else {
			// more than one exercise
			var ex = blocks[m].exercises;

			console.log(ex);

			// loop through exercises of block
			for (var k = 0; k < ex.length; k++) {
				// exercise name for first block first exercise

				// cloning new exercise then populating it
				if (k > 0) {
					var $id = "block-" + (m + 1) + "-ex-" + k;
					var $newId = "block-" + (m + 1) + "-ex-" + (k + 1);
					console.log("id: " + $id);
					console.log("newId: " + $newId);

					// cloning an exercise block in editWorkoutModal
					$("#e-cloneblock-1-ex-1")
						.clone(true)
						.attr("id", $newId)
						.css("display", "block")
						.insertAfter(
							"#editWorkoutModal #workoutContainer #" + $id
						);

					// Changing the Id of the add exercise button
					$(
						"#editWorkoutModal #block-" +
							(m + 1) +
							" #addblock-e-" +
							1 +
							"-ex-" +
							1
					).attr("id", "addblock-e-" + (m + 1) + "-ex-" + (k + 1));

					// Sets the id and name of the exercise name
					$(
						"#editWorkoutModal #block-" +
							(m + 1) +
							"-ex-" +
							(k + 1) +
							" #clone-ex-name-1"
					)
						.attr("id", "ex-name-" + (k + 1))
						.text(blocks[m].exercises[k].name);

					// sets the id and text of the exercise notes
					$(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1) +
							"-ex-" +
							(k + 1) +
							" #clone-notes-1"
					)
						.attr("id", "notes-" + (k + 1))
						.val(blocks[m].exercises[k].notes);

					

					console.log(blocks[m].exercises[k].name);
					$("#editWorkoutModal #workoutContainer #block-" + (m + 1))
						.find("#ex-name-" + (k + 1))
						.text(blocks[m].exercises[k].name);
					// exercise notes for first block first exercise
					$("#editWorkoutModal #workoutContainer #block-" + (m + 1))
						.find("#notes-" + (k + 1))
						.val(blocks[m].exercises[k].notes);

					// console.log(buttonId);

					var addButtonId = "addblock-e-" + (m + 1) + "-ex-" + k;

					var newAdd = addButtonId.substr(0, addButtonId.length - 1);
					newAdd += k + 1;
					$(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1) +
							" #" +
							addButtonId
					).attr("id", newAdd);

					$("#editWorkoutModal #" + $newId)
						.find(".table-add#e-clone-block-1-ex-1-tr-1")
						.attr("id", "e-" + $newId + "-tr-1");
					$("#editWorkoutModal #" + $newId)
						.find("#clone-block-1-ex-1-table")
						.attr("id", $newId + "-table");
					$(
						"#editWorkoutModal #workoutContainer #block-" +
							(m + 1) +
							"-ex-" +
							(k + 1)
					)
						.find("#e-clone-block-1-ex-1-tr-1")
						.attr(
							"id",
							"e-block-" + (m + 1) + "-ex-" + (k + 1) + "-tr-1"
						);
					$("#editWorkoutModal #" + $newId)
						.find("#clone-trblock-1-ex-1-tr-1")
						.attr("id", "tr" + $newId + "-tr-1");

					// $("#editWorkoutModal #workoutContainer #block-"+(m+1))
					// 	.find("#clone-ex-name-1" )
					// 	.text(blocks[m].exercises[k].name);
					$("#editWorkoutModal")
						.find("#notes" + (k + 1))
						.val(blocks[m].exercises[k].notes);
				}

				for (var i = 0; i < ex[k].sets.length; i++) {
					if (k != 0) { // not the first exercise in a block
						if (i < 1) {
							// added #workoutContainer
							$("#editWorkoutModal #workoutContainer #block-" + (m + 1))
								.find(
									"#trblock-" +
										(m + 1) +
										"-ex-" +
										(k + 1) +
										"-tr-" +
										(i + 1)
								)
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
												$(this).html(
													ex[k].sets[i].reps
												);
												break;
											case 2:
												$(this).html(
													ex[k].sets[i].percent
												);
												break;
										}
									}
								});
						} else {
							//k+2
							console.log("i was >= 1");
							var $clone = $(
								"#editWorkoutModal #workoutContainer #block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-table"
							)
								.find("#e-clonetrblock-1-ex-1-tr-1")
								.clone(true)
								.removeClass("clone table-line")
								.attr(
									"id",
									"trblock-" +
										(m + 1) +
										"-ex-" +
										(k + 1) +
										"-tr-" +
										(i + 1)
								);
							$(
								"#editWorkoutModal #workoutContainer #block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-table"
							)
								.find("table")
								.append($clone);
							// need the button to pass in the correct ex and block
							$(
								"#editWorkoutModal #workoutContainer #block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									" #e-block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-tr-" +
									i
							).attr(
								"id",
								"e-block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-tr-" +
									(i + 1)
							);

							$(
								"#editWorkoutModal #workoutContainer #block-" +
									(m + 1)
							)
								.find(
									"#trblock-" +
										(m + 1) +
										"-ex-" +
										(k + 1) +
										"-tr-" +
										(i + 1)
								)
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
												$(this).html(
													ex[k].sets[i].reps
												);
												break;
											case 2:
												$(this).html(
													ex[k].sets[i].percent
												);
												break;
										}
									}
								});
						}
					} else { // first exercise in a block
						console.log(blocks[m].exercises[k].name);
						
						$(
							"#editWorkoutModal #workoutContainer #block-" +
								(m + 1)
						)
							.find("#ex-name-" + 1)
							.text(blocks[m].exercises[k].name);
						// exercise notes for first block first exercise
						$(
							"#editWorkoutModal #workoutContainer #block-" +
								(m + 1)
						)
							.find("#notes-" + (k + 1))
							.val(blocks[m].exercises[k].notes);
						if (i < 1) {
							// set the correct block-id of the button
							$("#editWorkoutModal #workoutContainer #block-"+(m+1)+"-ex-"+(k+1))
								.find("#e-block-1-ex-1-tr-1")
								.attr("id","e-block-"+(m+1)+"-ex-1-tr-1")

							$newId = 'block-'+(m+1)+'-ex-'+(k+1)
							// rename the first table row id
							$("#editWorkoutModal #" + $newId)
								.find("#clone-trblock-1-ex-1-tr-1")
								.attr("id", "trblock-"+(m+1)+"-ex-"+(k+1)+"-tr-1");

							$("#editWorkoutModal #block-" + (m + 1))
								.find(
									"#trblock-" +
										(m + 1) +
										"-ex-" +
										(k + 1) +
										"-tr-" +
										(i + 1)
								)
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
												$(this).html(
													ex[k].sets[i].reps
												);
												break;
											case 2:
												$(this).html(
													ex[k].sets[i].percent
												);
												break;
										}
									}
								});
						} else {
							//k+2
							console.log("i was >= 1");
							var $clone = $(
								"#editWorkoutModal #block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-table"
							)
								.find("#e-clonetrblock-1-ex-1-tr-1")
								.clone(true)
								.removeClass("clone table-line")
								.attr(
									"id",
									"trblock-" +
										(m + 1) +
										"-ex-" +
										(k + 1) +
										"-tr-" +
										(i + 1)
								);
							$(
								"#editWorkoutModal #block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-table"
							)
								.find("table")
								.append($clone);
							// need the button to pass in the correct ex and block
							$(
								"#editWorkoutModal #e-block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-tr-" +
									i
							).attr(
								"id",
								"e-block-" +
									(m + 1) +
									"-ex-" +
									(k + 1) +
									"-tr-" +
									(i + 1)
							);

							$("#editWorkoutModal #block-" + (m + 1))
								.find(
									"#trblock-" +
										(m + 1) +
										"-ex-" +
										(k + 1) +
										"-tr-" +
										(i + 1)
								)
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
												$(this).html(
													ex[k].sets[i].reps
												);
												break;
											case 2:
												$(this).html(
													ex[k].sets[i].percent
												);
												break;
										}
									}
								});
						}
					}
				}
			}
		}
	}
	$('#e-cloneblock-1-ex-1').hide()
	$("#editWorkoutModal").modal("toggle");
};

const populateBlock = (id, newId, block) => {
	console.log("inside populate block");
	console.log(id);
	console.log(newId);
	console.log(block);

	$("#" + newId)
		.find("#block-name-1")
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

const populateEditBlock = (id, newId, block) => {
	// #e-addblock-1
	$("editWorkoutModal #workoutContainer #" + newId)
		.find("#block-name-1")
		.attr("id", "block-name-" + editBlockCount);
	// #block-1-ex-1
	$('#editWorkoutModal #workoutContainer #'+newId)
		.find("#block-1-ex-1")
		.attr("id", newId + "-ex-1");
	// #block-1-ex-1-table
	$("#editWorkoutModal #workoutContainer #" + newId)
		.find("#block-1-ex-1-table")
		.attr("id", newId + "-ex-1-table");
	// #e-block-1-ex-1-tr-1
	$("#editWorkoutModal #workoutContainer #" + newId)
		.find("#e-block-1-ex-1-tr-1")
		.attr("id", "e-"+newId + "-ex-1-tr-1");
	// #trblock-1-ex-1-tr-1
	$("#editWorkoutModal #workoutContainer #" + newId)
		.find("#trblock-1-ex-1-tr-1")
		.attr("id", "tr" + newId + "-ex-1-tr-1");
	// #addblock-e-1-ex-1
	$("#editWorkoutModal #workoutContainer #" + newId)
		.find("#addblock-e-1-ex-1")
		.attr("id", "addblock-e-" + editBlockCount + "-ex-1");
}

const newEvent = date => {

	$('#chooseWorkout').modal("toggle");
	console.log('about to log date in newEvent')
	console.log(date);
	//going to write the logic for the choose workout modal in a choose workout click handler



	// $("#workoutDate").val(date.format("l"));
	// $("#workoutModal").modal("toggle");
	CURR_DATE = date;
};

const parseCreateWorkout = () => {
	console.log('inside of parseCreateWorkout')
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

const parseEditWorkout = () => {
	console.log('inside of parseEditWorkout')
	var $date = $("#editWorkoutModal #workoutDate").val();
	var $time = $("#editWorkoutModal #workoutTime").val();
	var $name = $("#editWorkoutModal #workoutName").val();

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
	console.log("editBlockCount: " + editBlockCount)
	for (var i = 1; i <= editBlockCount; i++) {
		var ex = [];
		var blockObj = $("#editWorkoutModal #workoutContainer #block-" + i);
		var blockName = $("#editWorkoutModal #workoutContainer #block-"+i+" #block-name-1").text();

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
				var sets = getEditSets(i, exerciseNum);

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
	console.log(blocks)
	console.log(workout);
	return workout;
};

const getEditSets = (block, ex) => {
	var $rows = $("#editWorkoutModal #block-" + block + "-ex-" + ex + "-table").find(
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

const archiveWorkout = (workout) => {
	
	//ajax call for archiving workout
	$(function(){
		var path = "/api/createWorkout";
		console.log('archiveWorkout');
		console.log('workout');
		$.ajax({
			type:'POST',
			contentType: 'application/json',
			url: server + path,
			data: JSON.stringify({name: workout.name, title: workout.title, start: workout.start, end: workout.end, date: workout.date, allDay: workout.allDay, blocks: workout.blocks, time: workout.time}),				
	        success: function(data) {
	            console.log(data);
	            console.log('SUCCESS')
	        }
		});
	});
}

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
			CURRENT_EVENT = date;
			if(team_select){
				console.log('team selected')
				$('#chooseTeamAlert').css('display', 'none');
				newEvent(date);
			} else {
				console.log('team not selected')
				$('#chooseTeamAlert').css('display', 'block');
			}
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
			CURRENT_EVENT = calEvent;
			EDIT_EVENT = true;
			editEvent(calEvent);
		}
	});

	$("form").on("submit", function(e) {
		e.preventDefault();
	});

	$( "#teamGroupSelect" ).change(function() {
		console.log('teamGroupSelect changed');

		let selectedTeamName = $( "#teamGroupSelect option:selected" ).text();
		let selectedTeamValue = $( "#teamGroupSelect option:selected" ).val()
		console.log(selectedTeamName);
		console.log(selectedTeamValue);
		if(selectedTeamName !== '') {
			team_select = true;
			SELECTED_TEAM_NAME = selectedTeamName;
			SELECTED_TEAM_VAL =selectedTeamValue;
			
		}
	});

	$( "#recentWorkouts" ).change(function() {
		console.log('recentWorkouts changed');

		let selectedWorkoutName = $( "#recentWorkouts option:selected" ).text();
		let selectedWorkoutValue = $( "#recentWorkouts option:selected" ).val();
		console.log(selectedWorkoutName);
		console.log(selectedWorkoutValue);
			//ajax call for archiving workout
			$(function(){
				var path = "/api//getWorkout/" + selectedWorkoutValue;
				console.log('getting workout');
				// console.log('workout');
				$.ajax({
					type: 'GET',
					url: server + path,
					success: function(res) {
						console.log(res);
						$("#chooseWorkout").modal("hide");
						editEvent(res);
					}
				});
			});

	});

	$('#chooseCreate').click(function() {
		$("#workoutDate").val(CURR_DATE.format("l"));
		$("#chooseWorkout").modal("hide");
		$("#workoutModal").modal("toggle");
		
	})



	// Add a new block
	$(".block-add").click(function() {
		var idStr = $(this).attr("id");
		if(idStr.substr(0,1) == 'e'){ // && EDIT_EVENT){
			var block = idStr.substr(idStr.lastIndexOf("-") + 1);
			var id = "block-" + block;
			var newId = "block-" + (editBlockCount + 1);
			console.log("id: " + id);
			console.log("newId: " + newId);
			$("#e-cloneblock-1")
				.clone(true)
				.attr("id", newId)
				.css("display", "block")
				.insertAfter("#editWorkoutModal #block-" + editBlockCount);
			editBlockCount++;
			populateEditBlock(id, newId, block);
		} 
		// else if(idStr.substr(0,1) == 'e' && !EDIT_EVENT){
		// 	var block = idStr.substr(idStr.lastIndexOf("-") + 1);
		// 	var id = "block-" + block;
		// 	var newId = "block-" + (editBlockCount);
		// 	console.log("id: " + id);
		// 	console.log("newId: " + newId);
		// 	$("#e-cloneblock-1")
		// 		.clone(true)
		// 		.attr("id", newId)
		// 		.css("display", "block")
		// 		.insertAfter("#editWorkoutModal #block-" + (editBlockCount - 1));
		// 	editBlockCount++;
		// 	populateEditBlock(id, newId, block);
		// } 
		else {
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
		}
	});

	$("[id^=createWorkout]").click(function() {
		console.log("#createWorkout* clicked");
		console.log($(this).attr('id'))
		var id = $(this).attr('id');
		var mode = id.substr(id.length-1);
		date = CURR_DATE;
		//console.log(date.format("l"));
		console.log(mode)
		let workout = {};
		if(mode !== "e"){
			workout = parseCreateWorkout();
		} else {
			workout = parseEditWorkout();
		}
		console.log(workout);
		if (workout.name && workout.time && mode !== 'e') {
			var time = workout.time;
			var hour = time.substr(0, time.indexOf(":"));
			var min = time.substr(time.indexOf(":") + 1);
			console.log("hour: " + hour + " min: " + min);

			date.add(parseInt(hour), "hours");
			date.add(parseInt(min), "minutes");

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
		} else if(workout.name && workout.time && mode === 'e' && !EDIT_EVENT) {
			var time = workout.time;
			var hour = time.substr(0, time.indexOf(":"));
			var min = time.substr(time.indexOf(":") + 1);
			console.log("hour: " + hour + " min: " + min);
			console.log(date)
			date = moment(date);
			date.add(parseInt(hour), "hours");
			date.add(parseInt(min), "minutes");

			console.log(date.format("LLL"));

			workout.title = workout.name;
			workout.start = date;
			workout.end = date;
			workout.allDay = false;
			workout.time = time;
			console.log(workout.start.format("l"));
			$("#calendar").fullCalendar("renderEvent", workout, true);
			$("#editWorkoutModal").modal("hide");
			clearEditModal();
		} else if(workout.name && workout.time && mode === 'e' && EDIT_EVENT){
			var time = workout.time;
			var hour = time.substr(0, time.indexOf(":"));
			var min = time.substr(time.indexOf(":") + 1);
			console.log("hour: " + hour + " min: " + min);
			hour = Number(hour);
			min = Number(min);

			date.start.add(hour, "hours");
			date.start.add(min, "minutes");

			console.log(date.start.format("LLL"));

			workout.title = workout.name;
			workout.start = date.start;
			workout.end = date.start;
			workout.allDay = false;
			workout.time = time;
			CURRENT_EVENT.blocks = workout.blocks;
			CURRENT_EVENT.date = workout.date;
			CURRENT_EVENT.end = workout.end;
			CURRENT_EVENT.name = workout.name;
			CURRENT_EVENT.start = workout.start;
			CURRENT_EVENT.time = workout.time;
			CURRENT_EVENT.title = workout.title;
			console.log(workout.start.format("l"));
			console.log(workout)
			console.log(CURRENT_EVENT);
			//let merged = {...workout, ...CURRENT_EVENT};
			// console.log(merged);
			$("#calendar").fullCalendar("updateEvent", CURRENT_EVENT);
			$("#editWorkoutModal").modal("hide");
			CURRENT_EVENT = {};
			CURR_DATE = '';
			EDIT_EVENT = false;
			clearEditModal();
		}
		else{
			// console.log
			// put some error handling
			$(".alert").css("display", "block");
		}
	});

	$('[id^=archiveWorkout]').click(function() {
		console.log('#archiveWorkout clicked')
		date = CURR_DATE;
		console.log(date.format('l'));
		const workout = parseCreateWorkout()
		if(workout.name && workout.time) {
			var time = workout.time
			var hour = time.substr(0, time.indexOf(':'))
			var min = time.substr(time.indexOf(':')+1)
			console.log('hour: ' + hour + ' min: ' + min)
			
			date.add(parseInt(hour),'hour')
			date.add(parseInt(min),'minute')
			
			console.log(date.format('LLL'));
			console.log(date);

			workout.title = workout.name;
			workout.name = workout.name;
			workout.allDay =false;
			workout.start = date;
			workout.end = date;
			console.log(workout.start.format('l'))
			console.log(workout)



			archiveWorkout(workout);
			$('#calendar').fullCalendar('renderEvent',workout,true);
			$('#workoutModal').modal('hide');
			clearModal()
			//date = '';
		} else {
			// put some error handling
			$('.alert').css('display','block')
		}
	});

	// clear modal button pressed
	$("#closeModal").click(function() {
		console.log('close modal pressed');
		clearModal();
	});

	$('#closeEditModal').click(function() {
		console.log('close edit modal pressed');
		clearEditModal();
	});

	// close and clear modals when 'x' is pressed
	$('#e-close').click(function() {
		$("#editWorkoutModal").modal("toggle");
		clearEditModal();
	});

	$('#close').click(function() {
		$("#workoutModal").modal("toggle");
		clearModal();
	});

	// Add a new exercise block
	$("[id^=addblock-").click(function() {
		var idStr = $(this).attr("id");
		if (idStr.substr(idStr.indexOf("-") + 1, 1) != "e") {
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
		} else {
			console.log(idStr);
			var ex = idStr.substr(idStr.lastIndexOf("-") + 1);
			var block = idStr.substr(idStr.indexOf("-") + 3, 1);
			console.log("ex: " + ex);
			console.log("block: " + block);

			var $id = "block-" + block + "-ex-" + ex;
			var $newId = "block-" + block + "-ex-" + (parseInt(ex) + 1);
			console.log("id: " + $id);
			console.log("newId: " + $newId);
			$("#e-cloneblock-1-ex-1")
				.clone(true)
				.attr("id", $newId)
				.css("display", "block")
				.insertAfter("#editWorkoutModal #workoutContainer #" + $id);
			var buttonId = idStr.substr(0, idStr.length - 1);
			buttonId += parseInt(ex) + 1;

			console.log(buttonId);

			$("#editWorkoutModal #workoutContainer #" + idStr).attr(
				"id",
				buttonId
			);

			$("#editWorkoutModal #workoutContainer #" + $newId)
				.find(".table-add#e-clone-block-1-ex-1-tr-1")
				.attr("id", 'e-'+$newId + "-tr-1");
			$("#editWorkoutModal #workoutContainer #" + $newId)
				.find("#clone-block-1-ex-1-table")
				.attr("id", $newId + "-table");
			$("#editWorkoutModal #workoutContainer  #" + $newId)
				.find("#clone-trblock-1-ex-1-tr-1")
				.attr("id", "tr" + $newId + "-tr-1");
		}
	});

	var $TABLE = $("#table");
	var $BTN = $("#export-btn");
	var $EXPORT = $("#export");

	// Add a new table row
	$(".table-add").click(function() {
		var idStr = $(this).attr("id");
		if (idStr.substr(0, 1) == "e") {
			var tr = idStr.substr(idStr.lastIndexOf("-") + 1);
			// console.log('tr: '+tr)
			idStr = idStr.substr(2, idStr.lastIndexOf("-") - 5);
			var ex = idStr.substr(idStr.lastIndexOf("-") + 1);
			var block = idStr.substr(idStr.indexOf("-") + 1, 1);
			var $id = "#block-" + block + "-ex-" + ex + "-tr-" + tr;
			var $newId =
				"trblock-" + block + "-ex-" + ex + "-tr-" + (parseInt(tr) + 1);
			var $clone = $(
				"#editWorkoutModal #workoutContainer #block-" +
					block +
					"-ex-" +
					ex +
					"-table"
			)
				.find("#trblock-" + block + "-ex-" + ex + "-tr-" + tr)
				.clone(true)
				.removeClass("clone table-line")
				.attr("id", $newId);
			$(
				"#editWorkoutModal #workoutContainer #block-" +
					block +
					"-ex-" +
					ex +
					"-table"
			)
				.find("table")
				.append($clone);
			// need the button to pass in the correct ex and block
			$(
				"#editWorkoutModal #workoutContainer #e-block-" +
					block +
					"-ex-" +
					ex +
					"-tr-" +
					tr
			).attr(
				"id",
				"e-block-" + block + "-ex-" + ex + "-tr-" + (parseInt(tr) + 1)
			);
		} else {
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
		}
	});

	$(".table-remove").click(function() {
		var id = $(this).attr("id");
		if (id == "e") {
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
				var newButtonId = "";
				if (highestRow < row) {
					newButtonId =
						"e-block-" + block + "-ex-" + ex + "-tr-" + (row - 1);
					$(this)
						.parents()
						.find(
							"#editWorkoutModal #workoutContainer .table-add#" +
								"e-block-" +
								block +
								"-ex-" +
								ex +
								"-tr-" +
								row
						)
						.attr("id", newButtonId);
				} else {
					newButtonId =
						"e-block-" +
						block +
						"-ex-" +
						ex +
						"-tr-" +
						(highestRow - 1);
					$(this)
						.parents()
						.find(
							"#editWorkoutModal #workoutContainer .table-add#" +
								"e-block-" +
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
		} else {
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
						"block-" +
						block +
						"-ex-" +
						ex +
						"-tr-" +
						(highestRow - 1);
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
		}
	});

	$('.block-delete').click(function() {
		console.log('in block delete')
		console.log($(this).parents())
		var id = $(this).attr('id')
		if(id.substr(0,1) == 'e') {
			if(editBlockCount > 1) {
				var deletedBlock = $(this).parents('[id^=block-]').attr('id')
				var blockNum = deletedBlock.substr(deletedBlock.lastIndexOf('-')+1)
				if(blockNum == editBlockCount) {
					// subtract one from the block count
					editBlockCount--;
				}
				$(this).parents('[id^=block-]').detach()
			}
		} else {
			if(blockCount > 1) {
				var deletedBlock = $(this).parents('[id^=block-]').attr('id')
				var blockNum = deletedBlock.substr(deletedBlock.indexOf('-')+1)
				if(blockNum == blockCount) {
					// subtract one from the block count
					blockCount--;
				}
				$(this).parents('[id^=block-]').detach()
			}
		}
	});

	$('.ex-remove').click(function() {
		// find a way to not delete the last exercise
		console.log('in delete ex')
		id = $(this).attr('id');
		if(id.substr(0,1) == 'e') {
			var exRemove = $(this).parents('[id^=block-]' && '[id*=-ex-]')
			var exNum = $(exRemove).attr('id').substr($(exRemove).attr('id').lastIndexOf('-')+1)
			var blockNum = $(exRemove).attr('id').substr($(exRemove).attr('id').indexOf('-')+1,1)
			var addExButton = $(this).parents().find('#editWorkoutModal #workoutContainer #block-'+blockNum+' [id^=addblock-]')
			var buttonNum = $(addExButton).attr('id').substr($(addExButton).attr('id').lastIndexOf('-')+1)
			var buttonId = $(addExButton).attr('id').substr(0,$(addExButton).attr('id').lastIndexOf('-')+1)
			if(buttonNum == exNum) {
				// need to subtract one from the add exercise button so more exercises can be added
				var newId = $(addExButton).attr('id').substr(0, $(addExButton).attr('id').lastIndexOf('-')+1)
				$(addExButton).attr('id', newId+(parseInt(buttonNum)-1))
				$(exRemove).detach()
			} else {
				var siblings = $(exRemove).siblings('[id^=block-]' && '[id*=-ex-]')
				for(var i = 0; i < siblings.length; i++) {
					var sibNum = parseInt(siblings[i].id.substr(siblings[i].id.lastIndexOf('-')+1))
					var sibId = siblings[i].id.substr(0,siblings[i].id.lastIndexOf('-')+1)
					if(sibNum > exNum) {
						$(exRemove).siblings("[id^="+siblings[i].id+"]").attr('id',sibId+(sibNum-1))
					}
				}
				// subtract 1 from the button num
				$(addExButton).attr('id', buttonId+(parseInt(buttonNum)-1))
				// just delete the exercise
				$(exRemove).detach()
			}
		} else {
			var exRemove = $(this).parents('[id^=block-]' && '[id*=-ex-]')
			var exNum = $(exRemove).attr('id').substr($(exRemove).attr('id').lastIndexOf('-')+1)
			var blockNum = $(exRemove).attr('id').substr($(exRemove).attr('id').indexOf('-')+1,1)
			var addExButton = $(this).parents().find('#workoutModal #workoutContainer #block-'+blockNum+' [id^=addblock-]')
			var buttonNum = $(addExButton).attr('id').substr($(addExButton).attr('id').lastIndexOf('-')+1)
			var buttonId = $(addExButton).attr('id').substr(0,$(addExButton).attr('id').lastIndexOf('-')+1)
			if(buttonNum == exNum) {
				// need to subtract one from the add exercise button so more exercises can be added
				var newId = $(addExButton).attr('id').substr(0, $(addExButton).attr('id').lastIndexOf('-')+1)
				$(addExButton).attr('id', newId+(parseInt(buttonNum)-1))
				$(exRemove).detach()
			} else {
				var siblings = $(exRemove).siblings('[id^=block-]' && '[id*=-ex-]')
				for(var i = 0; i < siblings.length; i++) {
					var sibNum = parseInt(siblings[i].id.substr(siblings[i].id.lastIndexOf('-')+1))
					var sibId = siblings[i].id.substr(0,siblings[i].id.lastIndexOf('-')+1)
					if(sibNum > exNum) {
						$(exRemove).siblings("[id^="+siblings[i].id+"]").attr('id',sibId+(sibNum-1))
					}
				}
				// subtract 1 from the button num
				$(addExButton).attr('id', buttonId+(parseInt(buttonNum)-1))
				// just delete the exercise
				$(exRemove).detach()
			}
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

	$('body', $(this)).tooltip({
		selector: '[data-toggle="tooltip"]',
		trigger: 'hover'
	});
	$('[data-toggle="tooltip"]').click(function(){
		$(this).tooltip('hide')
	})
});
