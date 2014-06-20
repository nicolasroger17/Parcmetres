var conf = require('../config/conf.js')(),
	fs = require('fs'),
	path = require('path');

var chooseCar = function(req, res){
	req.models.user.get(req.session.sessionID, function(err, result){
		console.log("user");
		console.log(err);
		if(!err){
			result.getCars(function(err, result){
				console.log("car");
				console.log(err);
				if(!err){
					res.render('start/chooseCar', {firstName: req.session.firstName, lastName: req.session.lastName, cars: result});
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

var chooseLocation = function(req, res){
	req.models.car.get(req.query.id, function(err, car){
		if(!err){
			car.getUsers(function(err, user){
				if(!err && user[0].id == req.session.sessionID){
					car.getParked(function(err, parked){
						if(!err && parked.length == 0){
							res.render('start/chooseLocation', {firstName: req.session.firstName, lastName: req.session.lastName, car_id: req.query.id});
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
							res.render('start/start', {firstName: req.session.firstName, lastName: req.session.lastName, user: user[0], car: car, location: location});
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
	req.body.dateBegin = createDate();
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

var stop = function(req, res){
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
					console.log(jsonId);
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

function createDate(){
	var date = new Date();
    return date.getUTCFullYear() + "-" + twoDigits(1 + date.getUTCMonth()) + "-" + twoDigits(date.getUTCDate()) + " " + twoDigits(date.getUTCHours()) + ":" + twoDigits(date.getUTCMinutes()) + ":" + twoDigits(date.getUTCSeconds());
};

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

exports.chooseCar = chooseCar;
exports.chooseLocation = chooseLocation;
exports.start = start;
exports.startSession = startSession;
exports.stop = stop;