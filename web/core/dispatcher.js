var model = require('../core/model.js');
var isConnected = false;

module.exports = function(app, express){
	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies

	app.get('/', function (req, res) {
		if(isConnected){
			res.sendfile('views\\home.html');
		}
		else{
			connexion(app, req, res);
		}	    
	})

	.get('/home', function (req, res) {
		if(isConnected){
			res.sendfile('views\\home.html');
		}
		else{
			connexion(app, req, res);
		}	    
	})

	.get('/connexion', function (req, res) {
		if(isConnected){
			res.sendfile('views\\home.html');
		}
		else{
			connexion(app, req, res);
		}	    
	})

	.get('/inscription', function (req, res) {
	    if(isConnected){
			res.sendfile('views\\home.html');
		}
	    else{
	    	inscription(app, req, res);
	    }
	})

	.get('/addCar', function (req, res) {
		if(isConnected){
			res.sendfile('views\\addCar.html');
		}
	    else{
	    	connexion(app, req, res);
	    }
	})

	.get('/start', function (req, res) {
		if(isConnected){
	    	res.sendfile('views\\start.html')
	    }
	    else{
	    	connexion(app, req, res);
	    }
	})

	.use(function(req, res, next){
	    connexion(app, req, res);
	});
}

function connexion(app, req, res){
	res.sendfile('views\\connexion.html');
    app.post('/connexion', function(req, res) {
    	console.log("I received a post from connexion");
    	isConnected = model.connexion(req.body, model);
    	console.log(isConnected);
    	console.log("didn't wait");
		if(isConnected){
			console.log("isConnected");
			res.writeHead(301,
			  {Location: '/home'}
			);
			res.end();
		}
		else{
			console.log("is Not Connected");
			res.writeHead(301,
			  {Location: '/connexion'}
			);
			res.end();
		};
		
	});
}

function inscription(app, req, res){
	res.sendfile('views\\inscription.html');
    app.post('/inscription', function(req, res) {
		if(model.inscription(req.body)){
			res.writeHead(301,
			  {Location: '/connexion'}
			);
			res.end();
		}
		else{
			res.writeHead(301,
			  {Location: '/inscription'}
			);
			res.end();
		}		
	});
}