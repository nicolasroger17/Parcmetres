var model = require('../models/appli');

module.exports.controller = function(app) {
	app.get('/appli/home', function(req, res) {
		res.render('appli/index');
	});

	app.post('/appli/connexion', function(req, res) {
		model.connexion(app, req, res);
	});

	app.post('/appli/deconnexion', function(req, res) {
		if(app.appliCookie.hasOwnProperty(cookie)){
			delete app.appliCookie[req.body.cookie];
			req.json({err: false});
		}
		else{
			req.json({err: true});
		}
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

	app.get('/appli/myCars', function(req, res) {
		if(isConnected(app, req)){
			model.myCars(myId(app, req), req, res);
		}
		else{
			res.json({err : true});
		}
	});

	app.post('/appli/startSession', function(req, res) {
		if(isConnected(app, req)){
			model.startSession(myId(app, req), req, res);
		}
		else{
			res.json({err : true});
		}
	});

	app.get('/appli/stop', function(app, req, res) {
		if(isConnected(app, req)){
			model.stop(myId(app, req), req, res);
		}
		else{
			res.json({err : true});
		}
	});

	app.get('/appli/amIConnected', function(req, res) {
		if(isConnected(app, req)){
			res.json({amIConnected: true});
		}
		else{
			res.json({amIConnected: false});
		}
	});
}

function isConnected(app, req){
	var cookie = req.body.cookie || req.query.cookie;
	console.log(cookie);	
	if(app.appliCookie.hasOwnProperty(cookie)){
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