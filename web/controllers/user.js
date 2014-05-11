var model = require('../models/user');

module.exports.controller = function(app) {

	app.get('/myAccount', function(req, res) {
		if(req.session.sessionID){
			res.render('user/myAccount');
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

	app.get('/start', function(req, res) {
		if(req.session.sessionID){
			res.render('user/start');
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

}