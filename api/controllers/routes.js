// Route GET and POST functions

/** 
 * GET /viewteamgroup 
*/
exports.getViewgroupteam = (req, res) => {
  res.render('viewgroupteam.pug', {
    title: 'View Group/Team'
  });
};

/**
 * POST /viewgroupteam.
 */
exports.postViewgroupteam = (req, res, next) => {
    res.redirect('/viewgroupteam.pug');
};

