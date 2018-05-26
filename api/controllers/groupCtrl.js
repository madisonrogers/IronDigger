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
    if (req.params && req.params.teamid && req.params.groupid) {
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
                            Group
                                .findById(req.params.groupid)
                                .exec(function(err, group) {
                                    if (!group) {
                                        sendJsonResponse(res, 404, {
                                            "message": "groupid not found"
                                        });
                                        return;
                                    } else if (err) {
                                        console.log(err)
                                        sendJsonResponse(res, 404, err);
                                        return;
                                    }
                                    sendJsonResponse(res, 200, group);
                                });

                        }
                    }
                );
        } else {
            sendJsonResponse(res, 404, {
                "message": "Not found, teamid required"
            });
        }

    } else {
        console.log('Team or group id is incorrect');
        sendJsonResponse(res, 404, {
            "message": "Team or group id is incorrect"
        });
    }
}

// Get all groups - GET, needs to be changed
module.exports.getAllGroups = function(req, res) {

}

// Update a group by ID - PUT, probably needs to be changed
module.exports.updateGroup = function(req, res) {

}

// Delete a group by Id - DELETE, needs to be changed
module.exports.deleteGroup = function(req, res) {

}

//Get all athletes - GET
module.exports.getAllAthletes = function(req, res) {

}


// Add a user to a group - PUT
module.exports.addUser = function(req, res) {
    console.log('adding a user to a group');
    if (req.params && req.params.teamid && req.params.groupid && req.params.userid) {


        console.log(req.params.groupid)
        Group
            .findById(req.params.groupid)
            .exec(function(err, group) {
                if (!group) {
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


                        //       newAthletesArr = group.athletes.concat([user])
                        // group.athletes = newAthletesArr
                        var athlete_id = user._id;

                        group.athletes.push(athlete_id);

                        group.save((err) => {
                            if (err) {
                                return err;
                            }
                            req.flash('success', { msg: 'The user has been added to the group' });
                            console.log('The user has been added to the group');
                        });
                        sendJsonResponse(res, 200, group);
                    })
            });
    } else {
        console.log('No userid specified');
        sendJsonResponse(res, 404, {
            "message": "No userid in request"
        });
    }
}