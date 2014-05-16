var model = require('../models/start');

module.exports.controller = function(app) {

	app.get('/start', function(req, res) {
		console.log(req.session.sessionID);
		if(req.session.sessionID){
			model.chooseCar(req, res);
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

}