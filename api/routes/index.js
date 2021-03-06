var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');
var teamCtrl = require('../controllers/teamCtrl');
var groupCtrl = require('../controllers/groupCtrl');
var phaseCtrl = require('../controllers/phaseCtrl');
var workoutCtrl = require('../controllers/workoutCtrl');

// userCtrl routes
router.get('/getUser/:userid', userCtrl.getUserById);
router.get('/allUsers', userCtrl.getAllUsers);
router.put('/addPhase/:userid', userCtrl.addPhase);
router.put('/deletePhase/:userid/:phaseid', userCtrl.deletePhase);
router.get('/allPhases/:userid', userCtrl.getAllPhases);
router.get('/allWorkouts/:userid', userCtrl.getAllWorkouts);
router.get('/workout/:userid/:workoutid', userCtrl.getWorkout);
router.put('/updateSet/:userid/:phaseid/:workoutid/:blockid/:exerciseid/:setid', userCtrl.updateSet);
router.get('/allExercises/:userid', userCtrl.getAllExercises);
router.put('/updateMaxes/:userid', userCtrl.updateMaxes);
router.put('/updateWorkout/:userid/:phaseid/:workoutid', userCtrl.updateWorkout);


// teamCtrl routes
router.get('/getTeam/:teamid', teamCtrl.getTeamById);
router.post('/createTeam', teamCtrl.createTeam);
router.get('/allTeams', teamCtrl.getAllTeams);
router.put('/updateTeam/:teamid', teamCtrl.updateTeam);
router.put('/addUserToTeam/:teamid/:userid', teamCtrl.addUser);
router.get('/getathletesteam/:teamid', teamCtrl.getAllAthletes)//passed

// groupCtrl routes
router.get('/getGroup/:teamid/:groupid', groupCtrl.getGroupById);//passed
router.get('/getathletesgroup/:teamid/:groupid', groupCtrl.getAllAthletes)//passed
router.get('/allGroups/:teamid', groupCtrl.getAllGroups);//passed
router.post('/createGroup/:teamid', groupCtrl.createGroup);//passed
router.put('/updateGroup/:teamid/:groupid', groupCtrl.updateGroup);//passed
router.delete('/deleteGroup/:teamid/:groupid', groupCtrl.deleteGroup);//passed
router.put('/addUserToGroup/:teamid/:groupid/:userid', groupCtrl.addUser);//passed

//phaseCtrl routes
//router.get('/getPhaseTeam/:teamid/:userid', phaseCtrl.getAthletePhaseByIdTeam);//needs to be tested
router.get('/allPhasesTeam/:teamid', phaseCtrl.getPhasesByTeam);//needs to be written
router.get('/allPhasesGroup/:teamid/:groupid', phaseCtrl.getPhasesByGroup);
router.post('/:teamid/phase', phaseCtrl.createPhaseTeam);//works as intended
router.post('/:teamid/:groupid/phase', phaseCtrl.createPhaseGroup);

// workoutCtrl routes
router.put('/addExercise/:workoutid/:blockid', workoutCtrl.addExercise); // works
router.post('/createWorkout', workoutCtrl.createWorkout); // works
router.get('/getWorkout/:workoutid', workoutCtrl.getWorkout); // works
router.put('/updateWorkout/:workoutid', workoutCtrl.updateWorkout); // works
router.get('/recentWorkouts', workoutCtrl.getLast25Workouts);
router.get('/allWorkouts', workoutCtrl.getAllWorkouts); // works
router.get('/allBlocks/:workoutid', workoutCtrl.getAllBlocks); // works
router.get('/getBlock/:workoutid/:blockid', workoutCtrl.getBlock); // works
router.get('/allExercises/:workoutid/:blockid', workoutCtrl.getAllExercises); // works
router.get('/getExercise/:workoutid/:blockid/:exerciseid', workoutCtrl.getExercise); // works
router.get('/allSets/:workoutid/:blockid/:exerciseid', workoutCtrl.getAllSets); // works
router.get('/getSet/:workoutid/:blockid/:exerciseid/:setid', workoutCtrl.getSet); // works


module.exports = router;
