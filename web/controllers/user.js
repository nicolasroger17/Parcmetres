var model = require('../models/user');

module.exports.controller = function(app) {

	/**
	* a home page route
	*/
	app.get('/myAccount', function(req, res) {
	  // any logic goes here
	  res.render('user/myAccount')
	});


}