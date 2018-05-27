var mongoose = require('mongoose');
// var Group = mongoose.model('Group');
var Team = mongoose.model('Team');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Create a new group - POST
module.exports.createGroup = function(req, res) {
    console.log('creating new group');

    const group = {
        name: req.body.name,
        athletes: req.body.athletes
    };



    // Get the team and add the new group to it
    if (req.params && req.params.teamid) {
        Team
            .findById(req.params.teamid)
            .exec(function(err, team) {
                if (!team) {
                    sendJsonResponse(res, 404, {
                        "message": "teamid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                team.groups.push(group);

                console.log(team);
                team.save((err) => {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 200, team);
                    console.log('The new group has been added to the team');
                });
            });
    } else {
        console.log('No teamid specified');
        sendJsonResponse(res, 404, {
            "message": "No teamid in request"
        });
    }
};

// Get a group by ID - GET - needs to be changed
module.exports.getGroupById = function(req, res) {
    console.log('reading one group');
    console.log('Finding group details', req.params);

    if (req.params.teamid) {

        if (req.params.teamid && req.params.groupid) {

            Team
                .findById(req.params.teamid)
                .select('groups')
                .exec(
                    function(err, team) {
                        if (err) {
                            sendJsonResponse(res, 400, err);
                        } else {
                            //console.log(req.body);
                            //console.log(res);
                            //console.log(user);
                            thisGroup = team.groups.id(req.params.groupid);
                            if (!thisGroup) {
                                sendJsonResponse(res, 404, {
                                    "message": "groupid not found"
                                });
                            } else {
                                console.log('group found');
                                sendJsonResponse(res, 200, thisGroup);
                            }

                        }
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "Not found, teamid and groupid required"
            });
        }


    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, teamid required"
        });
    }
}

// Get all groups - GET, needs to be changed
module.exports.getAllGroups = function(req, res) {

    if (req.params.teamid) {

        Team
            .findById(req.params.teamid)
            .select('groups')
            .exec(
                function(err, team) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        //console.log(req.body);
                        //console.log(res);
                        //console.log(user);
                        if (team.groups)
                            sendJsonResponse(res, 200, team.groups)
                        else
                            sendJsonResponse(res, 404, { "message": "No groups found." })

                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, teamid and groupid required"
        });
    }



}

// Update a group by ID - PUT, probably needs to be changed
module.exports.updateGroup = function(req, res) {
    console.log('reading one group');
    console.log('Finding group details', req.params);

    if (req.params.teamid) {

        if (req.params.teamid && req.params.groupid) {

            Team
                .findById(req.params.teamid)
                .select('groups')
                .exec(
                    function(err, team) {
                        if (err) {
                            sendJsonResponse(res, 400, err);
                        } else {
                            //console.log(req.body);
                            //console.log(res);
                            //console.log(user);
                            var thisGroup = team.groups.id(req.params.groupid);
                            if (!thisGroup) {
                                sendJsonResponse(res, 404, {
                                    "message": "groupid not found"
                                });
                            } else {
                                thisGroup.name = req.body.name;
                                thisGroup.athletes = req.body.athletes;
                                thisGroup.phases = req.body.phases;
                            }

                            //saves team 
                            team.save(function(err, team) {
                                // var thisPhase;
                                if (err) {
                                    console.log(err);
                                    sendJsonResponse(res, 400, err);
                                } else {


                                    //console.log(thisAssignment);
                                    sendJsonResponse(res, 201, thisGroup);
                                }
                            });

                        }
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "Not found, teamid and groupid required"
            });
        }


    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, teamid required"
        });
    }
}

// Delete a group by Id - DELETE, needs to be changed
module.exports.deleteGroup = function(req, res) {

    if (req.params.teamid) {

        if (req.params.teamid && req.params.groupid) {

            Team
                .findById(req.params.teamid)
                .select('groups')
                .exec(
                    function(err, team) {
                        if (err) {
                            sendJsonResponse(res, 400, err);
                        } else {
                            //console.log(req.body);
                            //console.log(res);
                            //console.log(user);
                            var thisGroup = team.groups.id(req.params.groupid);
                            var index = team.groups.indexOf(thisGroup);

                            console.log(thisGroup)
                            console.log(index)



                            if (!thisGroup) {
                                sendJsonResponse(res, 404, {
                                    "message": "groupid not found"
                                });
                            } else {
                                console.log('group found');
                                team.groups.splice(index, 1);
                                //saves team 
                                team.save(function(err, team) {
                                    // var thisPhase;
                                    if (err) {
                                        console.log(err);
                                        sendJsonResponse(res, 400, err);
                                    } else {
                                        team.groups.splice(index);
                                        sendJsonResponse(res, 204, team.groups)
                                        //console.log(thisAssignment);

                                    }
                                });
                            }

                        }
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "Not found, teamid and groupid required"
            });
        }


    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, teamid required"
        });
    }
}

// var getAthletes = function(req, res, group, athletes_arr, athletes) {
//     //return new Promise(function(resolve, reject) {

//         if (!group) {
//             //reject(group);
//             sendJsonResponse(res, 404, { "message": "Group not found" })
//         } else {



//         }

//         //resolve(athletes_arr);


//     //})
// }





//Get all athletes - GET
module.exports.getAllAthletes = function(req, res) {
    console.log('reading all athletes from group');

    console.log('WTF IS GOING ON')
    if (req.params.teamid) {

        if (req.params.teamid && req.params.groupid) {

            Team
                .findById(req.params.teamid)
                .select('groups')
                .exec(
                    function(err, team) {
                        if (err) {
                            sendJsonResponse(res, 400, err);
                        } else {
                            //console.log(req.body);
                            //console.log(res);
                            //console.log(user);
                            thisGroup = team.groups.id(req.params.groupid);
                            var athletes_arr = [];
                            if (!thisGroup) {
                                sendJsonResponse(res, 404, {
                                    "message": "groupid not found"
                                });
                            } else {
                                console.log('group found');

                                if (!thisGroup.athletes) {

                                    sendJsonResponse(res, 400, { "message": "No athletes found" })
                                } else {

                                    var athletes = thisGroup.athletes;
                                    console.log(athletes);

                                    // getAthletes(req, res, thisGroup, athletes_arr, athletes).then(function(athletes_arr) {

                                    //     console.log('it worked')
                                    //     console.log(athletes_arr)
                                    //     sendJsonResponse(res, 200, athletes_arr);
                                    // }).catch(function(error) {
                                    //     console.log(error);
                                    // })
                                    // getAthletes(req, res, thisGroup, athletes_arr, athletes, function(athletes_arr){
                                    //     console.log('inside the callback');
                                    // });

                                    User
                                        .find({ _id: { $in: athletes } })
                                        .exec(function(err, users){
                                            console.log(users)
                                            users.forEach(function(user){
                                              console.log(user);// do something here
                                              });
                                            sendJsonResponse(res, 200, users)
                                        });


                                }
                            }
                        }


                    }
                );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, teamid and groupid required"
        });
    }


} else {
    sendJsonResponse(res, 404, {
        "message": "Not found, teamid required"
    });
}
}


var doAddUser = (req, res, team, group) => {
    if (!team) {
        sendJsonResponse(res, 404, "teamid not found");
    } else {
        console.log('inside of doAddPhaseGroup');

        if (!group) {
            sendJsonResponse(res, 404, "groupid not found")
        } else {

            console.log(team);
            console.log(group);
            console.log(req.body);
            //var d = new Date();

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

                    console.log('inside of addUser about to log user');
                    //console.log(user);
                    // console.log(user._id);
                    // var athlete_id = user._id;

                    //team.athletes.push(athlete_id);
                    //user.athlete.phases.push(phase); //pushes phase to the user in the users collection

                    group.athletes.push(user._id);

                    team.save(function(err, team) {
                        // var thisPhase;
                        if (err) {
                            console.log(err);
                            sendJsonResponse(res, 400, err);
                        } else {
                            //console.log(thisAssignment);
                            sendJsonResponse(res, 201, group);
                        }
                    });
                })

        }



    }
}


// Add a user to a group - PUT
module.exports.addUser = function(req, res) {
    if (req.params.teamid) {

        if (req.params.teamid && req.params.groupid) {

            Team
                .findById(req.params.teamid)
                .select('groups')
                .exec(
                    function(err, team) {
                        if (err) {
                            sendJsonResponse(res, 400, err);
                        } else {
                            //console.log(req.body);
                            //console.log(res);
                            //console.log(user);
                            thisGroup = team.groups.id(req.params.groupid);
                            if (!thisGroup) {
                                sendJsonResponse(res, 404, {
                                    "message": "groupid not found"
                                });
                            } else {
                                console.log('group found');
                                doAddUser(req, res, team, thisGroup);
                            }

                        }
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "Not found, teamid and groupid required"
            });
        }


    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, teamid required"
        });
    }
}