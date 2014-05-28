var model = require('../models/appli');

module.exports.controller = function(app) {
	app.get('/appli/home', function(req, res) {
		res.render('appli/index');
	});

	app.get('/appli/amIConnected', function(req, res) {
		console.log(req.body.cookie);
		console.log(app.appliCookie);
		if(app.hasOwnProperty('appliCookie') && app.appliCookie.hasOwnProperty(req.body.cookie)){
			console.log(app.appliCookie[req.body[cookie]])
			console.log("yes");
			res.json({amIConnected: true});
		}
		else{
			console.log("no");
			res.json({amIConnected: false});
		}
	});

	app.post('/appli/connexion', function(req, res) {
		model.connexion(app, req, res);
	});

	app.get('/appli/chooseCar', function(req, res) {
		if(req.session.sessionID){
			model.chooseCar(app, req, res);
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});

	app.get('/appli/chooseLocation', function(req, res) {
		if(req.session.sessionID){
			model.chooseLocation(app, req, res);
			app.post('/start', function(req, res){
				model.start(app, req, res);
				app.post('/startSession', function(req, res){
					model.startSession(app, req, res);
				});
			});
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});

	app.get('/appli/stop', function(app, req, res) {
		if(req.session.sessionID){
			model.stop(req, res);
		}
		else{
			res.writeHead(301, {Location: '/'});
			res.end();
		}
	});
}