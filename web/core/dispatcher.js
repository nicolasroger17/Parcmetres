var model = require('../core/model.js');

module.exports = function(app, express){
	var isConnected = false;
	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies

	if(isConnected){
		app.get('/', function (req, res) {
		    res.sendfile('views\\home.html');
		})

		app.get('/home', function (req, res) {
		    res.sendfile('views\\home.html');
		})

		.get('/addCar', function (req, res) {
		    res.sendfile('views\\addCar.html');
		})

		.get('/start', function (req, res) {
		    res.sendfile('views\\start.html');
		});
	}
	else{
		app.get('/', function (req, res) {
		    res.sendfile('views\\connexion.html');
		    app.post('/connexion', function(req, res) {
				model.connexion(req.body);
				res.writeHead(301,
				  {Location: '/inscription'}
				);
				res.end();
			});
		})

		.get('/inscription', function (req, res) {
		    res.sendfile('views\\inscription.html');
		    app.post('/inscription', function(req, res) {
				model.inscription(req.body);
				res.writeHead(301,
				  {Location: '/inscription'}
				);
				res.end();
			});
		})

		.get('/connexion', function (req, res) {
		    res.sendfile('views\\connexion.html');
		    app.post('/connexion', function(req, res) {
				model.connexion(req.body);
				res.writeHead(301,
				  {Location: '/inscription'}
				);
				res.end();
			});
		});
	}

	app.use(function(req, res, next){
	    res.sendfile('views\\connexion.html');
	    app.post('/connexion', function(req, res) {
			model.connexion(req.body);
			res.writeHead(301,
			  {Location: '/inscription'}
			);
			res.end();
		});
	});
}