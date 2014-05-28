var conf = require('../config/conf.js')();

var home = function(req, res){
	req.models.user.get(req.session.sessionID, function(err, result){
		console.log("1");
		console.log(err);
		if(!err){
			result.getCars(function(err, result){
				console.log("2");
				console.log(err);
				if(!err){
					var jsonId = Array();
					for(car in result){
						jsonId.push({car_id : result[car].id});
					}
					req.models.parked.count({or:jsonId}, function(err, result){
						console.log("3");
						console.log(err);
						if(!err){
							var isParked = result > 0;
							res.render('home/home',{firstName: req.session.firstName, lastName: req.session.lastName, isParked: isParked});
						}
						else{
							res.writeHead(301, {Location: '/home'});
							res.end();
						}
					});
				}
				else{
					res.writeHead(301, {Location: '/home'});
					res.end();
				}
			});
		}
		else{
			res.writeHead(301, {Location: '/home'});
			res.end();
		}
	});
}

var inscription = function(req, res){
	req.models.user.create(req.body, function(err, result){
		if(!err){
			res.writeHead(301, {Location: '/connexion'});
			res.end();
		}
		else{
			res.writeHead(301, {Location: '/inscription'});
			res.end();
		}
	});
}

var connexion = function(req, res){
	req.models.user.find(req.body, function(err, result){
		if(!err && result.length == 1){
			req.session.sessionID = result[0].id; req.session.lastName = result[0].lastName; req.session.firstName = result[0].firstName;
			res.writeHead(301, {Location: '/home'});
			res.end();
		}
		else{
			res.writeHead(301, {Location: '/connexion'});
			res.end();
		}
	});
}

exports.home = home;
exports.inscription = inscription;
exports.connexion = connexion;