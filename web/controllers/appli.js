var model = require('../models/appli');

module.exports.controller = function(app) {
	app.get('/appli/home', function(req, res) {
		res.render('appli/index');
	});

	app.get('/appli/amIConnected', function(req, res) {
		console.log("amIConnected");
		console.log(req.session.sessionID);
		console.log(req.sessionID);
		if(req.session.sessionID){
			console.log("yes");
			res.json({amIConnected: true});
		}
		else{
			console.log("no");
			res.json({amIConnected: false});
		}
	});

	app.post('/appli/connexion', function(req, res) {
		model.connexion(req, res);
	});

	app.get('/appli/chooseCar', function(req, res) {
		if(req.session.sessionID){
			model.chooseCar(req, res);
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});

	app.get('/appli/chooseLocation', function(req, res) {
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

	app.get('/appli/stop', function(req, res) {
		if(req.session.sessionID){
			model.stop(req, res);
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});
}