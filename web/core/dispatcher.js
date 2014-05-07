module.exports = function(app){
	var isConnected = false;

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
		})		

		.get('/inscription', function (req, res) {
		    res.sendfile('views\\inscription.html');
		})

		.get('/connexion', function (req, res) {
		    res.sendfile('views\\connexion.html');
		});
	}

	app.use(function(req, res, next){
	    res.sendfile('views\\connexion.html');
	});
}