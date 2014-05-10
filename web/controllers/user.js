var model = require('../models/user');

module.exports.controller = function(app) {

	app.get('/myAccount', function(req, res) {
	  res.render('user/myAccount');
	});

	app.get('/start', function(req, res) {
	  res.render('user/start');
	});

}