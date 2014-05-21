var conf = require('../config/conf.js')(),
	fs = require('fs'),
	path = require('path');

var chooseCar = function(req, res){
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
			res.writeHead(301, {Location: '/home'} );
			res.end();
		}
	});
}

var chooseLocation = function(req, res){
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

var start = function(req, res){
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
var startSession = function(req, res){
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

exports.chooseCar = chooseCar;
exports.chooseLocation = chooseLocation;
exports.start = start;
exports.startSession = startSession;