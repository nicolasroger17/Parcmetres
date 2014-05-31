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

var myInformations = function(id, req, res){
	// check if a user with the same mail address exists
	req.models.user.get(id, function(err, result){
		if(!err){
			res.json(result);
		}
		else{
			res.json({err: true});
		}
	});
}

var modifyMyInformations = function(id ,req, res){
	req.models.user.get(id, function(err, result){
		if(!err){
			for(var key in req.body){
				result[key] = req.body[key];
	        }
	        result.save(function(err){
	        	if(err)
	        		console.log(err);
	        	res.json({err: false});
	        });	        
		}
		else{
			console.log(err);
			res.json({err: true});
		}
	});
}

var myCars = function(id, req, res){
	req.models.user.get(id, function(err, user){
		user.getCars(function(err, result){
			if(!err){
				res.json(result);
			}
			else{
				res.json({err: true});
			}
		});
	});
}

var startSession = function(req, res){
	req.body.dateBegin = createDate();
	req.models.car.get(req.body.car_id, function(err, car){
		if(!err){
			car.getUsers(function(err, user){
				if(!err && user[0].id == req.session.sessionID){
					req.models.parked.create(req.body, function(err, result){
						if(err)
							console.log(err);
						res.json({err: false});
					});
				}
				else{
					res.json({err: true});
				}
			});
		}
		else{
			res.json({err: true});
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
					req.models.parked.find({or:jsonId}).remove(function(element){
						res.json({err: false});
					});
				}
				else{
					res.json({err: true});
				}
			});
		}
		else{
			res.json({err: true});
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

exports.connexion = connexion;
exports.myInformations = myInformations;
exports.modifyMyInformations = modifyMyInformations;
exports.myCars = myCars;
exports.startSession = startSession;
exports.stop = stop;