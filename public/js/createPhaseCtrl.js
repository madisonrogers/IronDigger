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

	// set name, date, time
	$("#editWorkoutModal #workoutName").val(workoutName);
	$("#editWorkoutModal #workoutDate").val(date.format("l"));
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

		populateBlock(id, newId, block);

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
			// change all id's to have new 'block' variable
			// console.log(
			// 	$("#" + $newId)
			// 		.find("#block-2-ex-1-tr-1")
			// 		.attr("id", $newId + "-tr-1")
			// );
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
