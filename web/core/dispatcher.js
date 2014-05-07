module.exports = function(app, rootDir){
	var isConnected = true;
	console.log(rootDir + '\\views\\index.html');
	if(isConnected){
		app.get('/', function (req, res) {
		    res.sendfile(rootDir + '\\views\\index.html');
		})

		.get('/addCar', function (req, res) {
		    res.sendfile(rootDir + '\\views\\addCar.html');
		})

		.get('/start', function (req, res) {
		    res.sendfile(rootDir + '\\views\\start.html');
		});
	}
	else{
		app.get('/', function (req, res) {
		    res.sendfile(rootDir + '\\views\\connexion.html');
		})		

		.get('/inscription', function (req, res) {
		    res.sendfile(rootDir + '\\views\\inscription.html');
		})

		.get('/connexion', function (req, res) {
		    res.sendfile(rootDir + '\\views\\connexion.html');
		});
	}

	app.use(function(req, res, next){
	    res.sendfile(rootDir + '\\views\\connexion.html');
	});
}