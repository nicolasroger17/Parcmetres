var model = require('../models/home');

module.exports.controller = function(app) {
	app.get('/', function(req, res) {
		home(req, res);
	});

	app.get('/home', function(req, res) {
		home(req, res);
	});

	app.get('/connexion', function(req, res) {
		connexion(app, req, res);
	});

	app.get('/inscription', function(req, res) {
		inscription(app, req, res);
	});

	app.get('/deconnexion', function(req, res) {
		req.session.destroy();
		res.writeHead(301, {Location: '/'} );
		res.end();
	});
}

function home(req, res){
	if(req.session.sessionID){
		model.home(req, res);
	}
	else{
		res.writeHead(301, {Location: '/connexion'});
		res.end();
	}
}

function connexion(app, req, res){
	res.render('home/connexion');
	app.post('/connexion', function(req, res) {
		model.connexion(req, res);
	});
}

function inscription(app, req, res){
	res.render('home/inscription');
	app.post('/inscription', function(req, res) {
		model.inscription(req, res);
	});
}