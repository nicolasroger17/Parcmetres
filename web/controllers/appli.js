var model = require('../models/appli');

module.exports.controller = function(app) {
	app.get('/appli/home', function(req, res) {
		res.render('appli/index');
	});

	app.get('/appli/amIConnected', function(req, res) {
		if(isConnected(app, req)){
			res.json({amIConnected: true});
		}
		else{
			res.json({amIConnected: false});
		}
	});

	app.post('/appli/connexion', function(req, res) {
		model.connexion(app, req, res);
	});

	app.get('/appli/myInformations', function(req, res) {
		if(isConnected(app, req)){
			model.myInformations(myId(app, req), req, res);
		}
		else{
			res.json({err : true});
		}
	});

	app.post('/appli/modifyMyInformations', function(req, res) {
		if(isConnected(app, req)){
			model.modifyMyInformations(myId(app, req), req, res);
		}
		else{
			res.json({err : true});
		}
	});

	app.get('/appli/chooseCar', function(req, res) {
		if(req.session.sessionID){
			model.chooseCar(app, req, res);
		}
		else{
			res.json({err : true});
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
			res.json({err : true});
		}
	});

	app.get('/appli/stop', function(app, req, res) {
		if(req.session.sessionID){
			model.stop(req, res);
		}
		else{
			res.json({err : true});
		}
	});
}

function isConnected(app, req){
	var cookie = req.body.cookie || req.query.cookie;
	console.log(cookie);	
	if(app.hasOwnProperty('appliCookie') && app.appliCookie.hasOwnProperty(cookie)){
		console.log("connected");
		return true;
	}
	console.log("disconnected");
	return false;
}

function myId(app, req){
	console.log("id");
	var cookie = req.body.cookie || req.query.cookie;
	console.log(app.appliCookie[cookie]);
	return app.appliCookie[cookie].id;
}