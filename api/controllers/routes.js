// Route GET and POST functions

var request = require('request');
var apiOptions = {
    server: "http://localhost:8080"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://nameless-basin-42853.herokuapp.com";
}

/** 
 * GET /teams 
 */
exports.getViewgroupteam = (req, res) => {
    console.log('inside getViewgroupteam in routes.js');
    

    getTeams(req, res, function(req, res, responseData) {
        renderViewgroupteam(req, res, responseData);
    });
};

var getTeams = (req, res, callback) => {
    var requestOptions, path;
    console.log('inside getTeams');
    path = "/api/allTeams";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {

                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};


var renderViewgroupteam = (req, res, responseData) => {
    console.log('inside renderViewgroupteam');

		console.log(responseData);
    res.render('teams.pug', {
        title: 'View Group/Team',
        teams: responseData
    });
}

/**
 * POST /viewgroupteam.
 */
exports.postViewgroupteam = (req, res, next) => {
    res.redirect('/teams.pug');
};

// GET /createphase
exports.getCreatephase = (req, res) => {
	res.render('createphase.pug', {
		title: 'Create Phase'
	});
};

// POST /createphase
exports.postCreatephase = (req, res, next) => {
	res.redirect('/createphase.pug');
};

