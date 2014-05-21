var model = require('../models/start');

module.exports.controller = function(app) {

	app.get('/chooseCar', function(req, res) {
		if(req.session.sessionID){
			model.chooseCar(req, res);
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});

	app.get('/chooseLocation', function(req, res) {
		if(req.session.sessionID){
			model.chooseLocation(req, res);
			app.post('/start', function(req, res){
				model.start(req, res);
				app.post('/startSession', function(req, res){
					model.startSession(req, res);
				});
			});
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});

}