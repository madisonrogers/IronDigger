/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  console.log(res.user);
  res.render('userhome', {
    title: 'Home'
  });
};
