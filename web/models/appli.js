var conf = require('../config/conf.js')(),
	fs = require('fs'),
	path = require('path');

var connexion = function(app, req, res){
	console.log("model connexion");
	req.models.user.find(req.body, function(err, result){
		if(!err && result.length == 1){
			app.appliCookie[req.sessionID] = {
				id: result[0].id,
    			lastName: result[0].lastName,
    			firstName: result[0].firstName
			}
    		console.log(app.appliCookie);
    		res.json({isConnected: true,
    					cookie: req.sessionID
    		});
		}
		else{
			res.json({isConnected: false});
		}
	});
}

var chooseCar = function(app, req, res){
	// check if a user with the same mail address exists
	req.models.user.get(req.session.sessionID, function(err, result){
		console.log("user");
		console.log(err);
		if(!err){
			result.getCars(function(err, result){
				console.log("car");
				console.log(err);
				if(!err){
					res.render('start/chooseCar', {cars: result});
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

var chooseLocation = function(app, req, res){
	// check if a user with the same mail address exists
	req.models.car.get(req.query.id, function(err, car){
		if(!err){
			car.getUsers(function(err, user){
				if(!err && user[0].id == req.session.sessionID){
					car.getParked(function(err, parked){
						if(!err && parked.length == 0){
							res.render('start/chooseLocation', {car_id: req.query.id});
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

var start = function(app, req, res){
	// define the location
	var location = {locationX : req.body.locationX, locationY : req.body.locationY};
	// check if a user with the same mail address exists
	req.models.car.get(req.body.id, function(err, car){
		console.log("car");
		console.log(err);
		if(!err){
			car.getUsers(function(err, user){
				console.log("user");
				console.log(err);
				if(!err && user[0].id == req.session.sessionID){
					car.getParked(function(err, parked){
						console.log("parked");
						console.log(err);
						if(!err && parked.length == 0){
							res.render('start/start', {user: user[0], car: car, location: location});
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

// todo insert in parked
var startSession = function(app, req, res){
	console.log("startsession");
	console.log(req.body);
	// define the location
	var today = new Date();
	console.log(today);
	// check if a user with the same mail address exists
	req.models.car.get(req.body.car_id, function(err, car){
		if(!err){
			car.getUsers(function(err, user){
				if(!err && user[0].id == req.session.sessionID){
					req.models.parked.create(req.body, function(err, result){
						if(err)
							console.log(err);
						res.writeHead(301, {Location: '/home'});
						res.end();
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

var stop = function(app, req, res){
	req.models.user.get(req.session.sessionID, function(err, result){
		console.log(err);
		if(!err){
			result.getCars(function(err, result){
				console.log(err);
				if(!err){
					var jsonId = Array();
					for(car in result){
						jsonId.push({car_id : result[car].id});
					}
					console.log(jsonId);
					/*req.models.parked.find({or:jsonId}).each(function(element){
						console.log("remove element");
						element.remove();
					}).save(function(){
						setTimeout(function(){
							res.writeHead(301, {Location: '/home'});
							res.end();
						},2000);
					});*/
					req.models.parked.find({or:jsonId}).remove(function(element){
						res.writeHead(301, {Location: '/home'});
						res.end();
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

exports.connexion = connexion;