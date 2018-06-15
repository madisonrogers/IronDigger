// // controller file for users
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Team = mongoose.model('Team');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
    if (req.user) {
    return res.redirect('/');
    }
    console.log('in getSignup in userCtrl')
    res.render('account/signup', {
      title: 'Create Account'
    });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
    console.log('in postSignup in userCtrl')
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/signup');
    }

    var isAdmin = false
    var isCoach = false

    if (req.body.userType == 'Admin') {
        isAdmin = true
    } else if (req.body.userType == 'Coach') {
        isCoach = true
    } 

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: isAdmin,
        isCoach: isCoach,
        profile: {
          first: req.body.first,
          last: req.body.last,
          phone: req.body.phone,
          gender: req.body.gender
        },
        athlete: {
          sport: req.body.sport,    // this is the teamid
          maxBench: req.body.bench,
          maxClean: req.body.clean,
          maxSquat: req.body.squat,
          maxDeadlift: req.body.deadlift
        }
    });
    console.log(req.body);
    console.log(user);

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return err; }
        if (existingUser) {
          req.flash('errors', { msg: 'Account with that email address already exists.' });
          return res.redirect('/signup');
        }
        user.save((err) => {
          if (err) { return next(err); }
          // req.logIn(user, (err) => {
          //   if (err) {
          //     return next(err);
          //   }
          //   res.redirect('/');
          // });
          console.log('user saved')
        });
    });

    Team.findOne({_id: req.body.sport}, (err, team) => {
        if (err) {return err;}
        console.log(team.athletes)
        console.log(user)
        team.athletes.push(user._id);
        console.log(team.athletes)
        // team.athletes = newAthletesArr;
        team.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                res.redirect('/');
            });
        })
    })
};

// Get a user by id - GET
module.exports.getUserById = function(req, res) {
    console.log('reading one user');
    console.log('Finding user details', req.params);
    if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, user);
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
};

// Get all users - GET
module.exports.getAllUsers = function(req, res) {
    console.log('reading all users');
    User
        .find() // finds all the users
        .exec(function(err, user) {
            if (!user) {
                sendJsonResponse(res, 404, {
                    "message": "no users found"
                });
                return;
            } else if (err) {
                console.log(err)
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, user);
        });
};

// Add a phase to a user - PUT
module.exports.addPhase = function(req, res) {
	console.log('adding a phase to a user');
	if (req.params && req.params.userid) {
		User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(user.athlete)
                allPhases = user.athlete.phases.concat(req.body);
                user.athlete.phases = allPhases
                user.save((err) => {
			      	if (err) {
			        	return err;
			      	}
			      	sendJsonResponse(res, 200, user);
			      	console.log('User phase information was updated');
			    });
            });
	} else {
		console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
	}
}

// Delete a phase from a user - PUT
module.exports.deletePhase = function(req, res) {
	console.log('deleting phase from user');
	if(req.params && req.params.userid && req.params.phaseid) {
		// Get the user by userid
		User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                var phases = user.athlete.phases;
                var phaseToRemove;
                // find all phases except the one to delete and add to an array
                for(var i = 0; i < phases.length; i++) {
                	if (phases[i]._id == req.params.phaseid) {
                		phaseToRemove = phases[i];
                	}
                }

                if (phaseToRemove) {
                	console.log('in phases to remove');
                	// remove the phaseToRemove from phases array
                	var index = phases.indexOf(phaseToRemove);
					if (index > -1) {
					  phases.splice(index, 1);
					}
                	user.athlete.phases = phases
	                user.save((err) => {
				      	if (err) {
				        	return err;
				      	}
				      	sendJsonResponse(res, 200, user);
				      	console.log('Phase was deleted from the user');
				    });
                }
            });

	} else {
		console.log('No userid specified')
		sendJsonResponse(res, 404, {
			"message":"No userid in request"
		})
	}
}

// Get all Phases for a user - GET
module.exports.getAllPhases = function(req, res) {
	console.log('Getting phases for one user')
	if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                var phases = user.athlete.phases;
                sendJsonResponse(res, 200, phases);
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
}

// Get all Workouts for a user - GET
module.exports.getAllWorkouts = function(req, res) {
	console.log('getting all workouts for a user')
	if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                var phases = user.athlete.phases;
                var workouts = [];
                for(var i = 0; i < phases.length; i++) {
                	for(var j = 0; j < phases[i].workouts.length; j++) {
                		workouts.push(phases[i].workouts[j]);
                	}
                }
                sendJsonResponse(res, 200, workouts);
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
}

// Get a workout from userid and workoutid - GET
module.exports.getWorkout = function(req, res) {
	console.log('getting one workout') 
	if (req.params && req.params.userid && req.params.workoutid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                var phases = user.athlete.phases;
                var workoutToReturn;
                for(var i = 0; i < phases.length; i++) {
                	for(var j = 0; j < phases[i].workouts.length; j++) {
                		if(phases[i].workouts[j]._id == req.params.workoutid) {
                			workoutToReturn = phases[i].workouts[j];
                		}
                	}
                }
                if(workoutToReturn) {
                	console.log('found the workout!')
                	sendJsonResponse(res, 200, workoutToReturn);
                } else {
                	console.log('No workout with that workoutid exists');
			        sendJsonResponse(res, 404, {
			            "message": "No workout with the specified workoutid exists"
			        });
                }
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
}

// Update a user's sets in a workout - PUT
// This function will take a userid, phaseid, workoutid, blockid, exerciseid, and setid as params and the new set in the body
module.exports.updateSet = function(req, res) {
	if (req.params && req.params.userid && req.params.workoutid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                // get the index of the phase that matches the phaseid
                var phase;
                var phaseIndex;
                for(var i = 0; i < user.athlete.phases.length; i++) {
                	if(user.athlete.phases[i]._id == req.params.phaseid) {
                		phase = user.athlete.phases[i];
                		phaseIndex = i;
                	}
                }

                if(phase) {
                	// get the index of the workout that matches the workoutid
                	var workout;
                	var workoutIndex;
                	for(var i = 0; i < phase.workouts.length; i++) {
                		if(phase.workouts[i]._id == req.params.workoutid) {
                			workout = phase.workouts[i];
                			workoutIndex = i;
                		}
                	}

                	if(workout) {
                		// get the index of the block that matches the blockid
                		var block;
                		var blockIndex;
                		for(var i = 0; i < workout.blocks.length; i++) {
                			if(workout.blocks[i]._id == req.params.blockid) {
	                			block = workout.blocks[i];
	                			blockIndex = i;
	                		}
                		}

                		if(block) {
                			// get the index of the exercise that matches the exerciseid
                			var exercise;
                			var exerciseIndex;
                			for(var i = 0; i < block.exercises.length; i++) {
                				if(block.exercises[i]._id == req.params.exerciseid) {
                					exercise = block.exercises[i]
                					exerciseIndex = i;
                				}
                			}

                			if(exercise) {
                				// find the set that matches the id and set it equal to the new set
                				var setIndex;
                				for(var i = 0; i < exercise.sets.length; i++) {
                					if(exercise.sets[i]._id == req.params.setid) {
                						setIndex = i;
                					}
                				}

                				console.log(setIndex);

                				if(setIndex > -1) {
                					// use the index's to reference the real set object in the user
                					// update all of the set information except the ObjectId
                					user.athlete.phases[phaseIndex].workouts[workoutIndex].blocks[blockIndex].exercises[exerciseIndex].sets[setIndex].setnumber = req.body.setnumber;
                					user.athlete.phases[phaseIndex].workouts[workoutIndex].blocks[blockIndex].exercises[exerciseIndex].sets[setIndex].reps = req.body.reps;
                					user.athlete.phases[phaseIndex].workouts[workoutIndex].blocks[blockIndex].exercises[exerciseIndex].sets[setIndex].percent = req.body.percent;
                					user.athlete.phases[phaseIndex].workouts[workoutIndex].blocks[blockIndex].exercises[exerciseIndex].sets[setIndex].calcweight = req.body.calcweight;
                					user.athlete.phases[phaseIndex].workouts[workoutIndex].blocks[blockIndex].exercises[exerciseIndex].sets[setIndex].actweight = req.body.actweight;

                					user.save((err) => {
								      	if (err) {
								        	return err;
								      	}
								      	sendJsonResponse(res, 200, user);
								      	console.log('User set information was updated');
								    });
                				} else {
                					console.log('no sets have the specified setid');
				                	sendJsonResponse(res, 404, {
							            "message": "no sets have the specified setid"
							        });
                				}

                			} else {
                				console.log('no exercises have the specified exerciseid');
			                	sendJsonResponse(res, 404, {
						            "message": "no exercises have the specified exerciseid"
						        });
                			}

                		} else {
                			console.log('no blocks have the specified blockid');
		                	sendJsonResponse(res, 404, {
					            "message": "no blocks have the specified blockid"
					        });
                		}

                	} else {
                		console.log('no workouts have the specified workoutid');
	                	sendJsonResponse(res, 404, {
				            "message": "no workouts have the specified workoutid"
				        });
                	}

                } else {
                	console.log('no phases have the specified phaseid');
                	sendJsonResponse(res, 404, {
			            "message": "no phases have the specified phaseid"
			        });
                }
            });
    } else {
    	console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
}

// GET - get all exercises
// This function will take a userid and return a list of unique exercises the user has done
// the exercise object will hold dates at which the exercise was done and the sets on that date
module.exports.getAllExercises = function(req, res) {
	if (req.params && req.params.userid) {
        User
            .findById(req.params.userid)
            .exec(function(err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                var phases = user.athlete.phases;
                var workouts = [];
                for (var i = 0; i < phases.length; i++) {
                	// console.log(phases[i].workouts)
                	workouts.push.apply(workouts, phases[i].workouts);
                }
                // console.log(workouts)

                var blocks = [];
                for(var i = 0; i < workouts.length; i++) {
                    for(var j = 0; j < workouts[i].blocks.length; j++) {
                        workouts[i].blocks[j].date = workouts[i].date
                    }
                    blocks.push.apply(blocks, workouts[i].blocks)
                }

                var exercises = [];
                for(var i = 0; i < blocks.length; i++) {
                    for(var j = 0; j < blocks[i].exercises.length; j++) {
                        blocks[i].exercises[j].date = blocks[i].date
                    }
                    exercises.push.apply(exercises, blocks[i].exercises)
                }

                if(exercises.length > 0) {
                    var uniqueExercises = [];

                    var exObj = {
                        name: String,
                        sets: []
                    }

                    var setObj = {
                        actualweight: Number,
                        reps: String,
                        sets: Number,
                        date: String
                    }

                    for(var i = 0; i < exercises.length; i++) {
                        var unique = true;
                        var duplicateIndex;
                        for(var m = 0; m < uniqueExercises.length; m++) {
                            if(uniqueExercises[m].name == exercises[i].name) {
                                console.log("exercise exists")
                                unique = false;
                                duplicateIndex = m;
                                break;
                            }
                        }
                        if(unique) {
                            exObj.name = exercises[i].name;
                        }

                        for(var j = 0; j < exercises[i].sets.length; j++) {
                            setObj.actualweight = exercises[i].sets[j].actweight;
                            setObj.reps = exercises[i].sets[j].reps;
                            setObj.sets = exercises[i].sets[j].set;
                            setObj.date = exercises[i].date;
                            if(unique) {
                                exObj.sets.push(setObj);
                                var setObj = {
                                    actualweight: Number,
                                    reps: String,
                                    sets: Number,
                                    date: String
                                }
                            } else {
                                uniqueExercises[duplicateIndex].sets.push(setObj);
                                var setObj = {
                                    actualweight: Number,
                                    reps: String,
                                    sets: Number,
                                    date: String
                                }
                            }
                            
                        }
                        if(unique) {
                            uniqueExercises.push(exObj);
                            var exObj = {
                                name: String,
                                sets: []
                            }
                        }
                    }
                    console.log(uniqueExercises);

                    sendJsonResponse(res, 200, uniqueExercises);
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No exercises found"
                    })
                }
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }	
}





