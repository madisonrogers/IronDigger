var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Create a new team - POST
module.exports.createTeam = function(req, res) {
    console.log('creating new team');
    const team = new Team({
        name: req.body.name,
        athletes: req.body.athletes,
        groups: req.body.groups
    });

    team.save((err) => {
        if (err) {
            sendJsonResponse(res, 404, err);
            return err;
        } else {
            sendJsonResponse(res, 200, team);
            console.log('team successfully added')
        }
    })
};

// Get a team by ID - GET
module.exports.getTeamById = function(req, res) {
    console.log('reading one team');
    console.log('Finding team details', req.params);
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
                sendJsonResponse(res, 200, team);
            });
    } else {
        console.log('No teamid specified');
        sendJsonResponse(res, 404, {
            "message": "No teamid in request"
        });
    }
}

// Get all teams - GET
module.exports.getAllTeams = function(req, res) {
    console.log('getting all teams');
    Team
        .find()
        .exec(function(err, team) {
            if (!team) {
                sendJsonResponse(res, 404, {
                    "message": "No teams found"
                });
                return;
            } else if (err) {
                console.log(err)
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, team);
        });
}

//Get all athletes
//Get all athletes - GET
module.exports.getAllAthletes = function(req, res) {
    console.log('reading all athletes from group');

    if (req.params.teamid) {
        Team
            .findById(req.params.teamid)
            .exec(
                function(err, team) {
                    if (err) {
                        sendJsonResponse(res, 400, err);
                    } else {
                        if (!team) {
                            sendJsonResponse(res, 404, {
                                "message": "teamid not found"
                            });
                        } else {
                            console.log('team found');

                            if (!team.athletes) {

                                sendJsonResponse(res, 400, { "message": "No athletes found" })
                            } else {

                                var athletes = team.athletes;
                                console.log(athletes);

                                
                                User
                                    .find({ _id: { $in: athletes } })
                                    .exec(function(err, users) {
                                        console.log(users)
                                        users.forEach(function(user) {
                                            console.log(user); // do something here
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
            "message": "Not found, teamid required"
        });

    }
}




// Update a team by ID - PUT
module.exports.updateTeam = function(req, res) {
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
                team.name = req.body.name;
                team.athletes = req.body.athletes;
                team.groups = req.body.groups;
                team.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    req.flash('success', { msg: 'Team information has been updated.' });
                    console.log('team information was updated');
                });
                sendJsonResponse(res, 200, team);
            });
    } else {
        console.log('No teamid specified');
        sendJsonResponse(res, 404, {
            "message": "No teamid in request"
        });
    }
}

module.exports.addUser = function(req, res) {
    if (req.params && req.params.teamid && req.params.userid) {
        console.log(req.params.teamid)
        Team
            .findById(req.params.teamid)
            .exec(function(err, team) {
                if (!team) {
                    sendJsonResponse(res, 404, err);
                    return;
                } else if (err) {
                    console.log(err)
                    sendJsonResponse(res, 404, err);
                    return;
                }
                User
                    .findById(req.params.userid)
                    .exec(function(err, user) {
                        if (!user) {
                            sendJsonResponse(res, 404, {
                                "message": "groupid not found"
                            });
                            return;
                        } else if (err) {
                            console.log(err)
                            sendJsonResponse(res, 404, err);
                            return;
                        }

                        console.log('inside of addUser about to log user');
                        console.log(user);
                        console.log(user._id);
                        var athlete_id = user._id;

                        team.athletes.push(athlete_id);

                        //newAthletesArr = team.athletes.concat([user])
                        //team.athletes = newAthletesArr
                        team.save((err) => {
                            if (err) {
                                return err;
                            }
                            req.flash('success', { msg: 'The user has been added to the group' });
                            console.log('The user has been added to the group');
                        });
                        sendJsonResponse(res, 201, team);
                    })
            });
    } else {
        console.log('No teamid specified');
        sendJsonResponse(res, 404, {
            "message": "No teamid in request"
        });
    }
}
