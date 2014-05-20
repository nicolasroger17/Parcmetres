var mysql = require('mysql'),
	conf = require('../config/conf.js')(),
	fs = require('fs'),
	path = require('path');

var connection = mysql.createConnection({
	port	 : conf.port,
	host     : conf.host,
	database : conf.database,
	user     : conf.user,
	password : conf.password
});

connection.connect();

var chooseCar = function(req, res){
	// check if a user with the same mail address exists
	req.models.user.get(req.session.sessionID, function(err, result){
		if(!err){
			result.getCars(function(err, result){
				if(!err){
					res.render('start/chooseCar', {cars: result});
				}
				else{
					res.writeHead(301, {Location: '/home'} );
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

exports.chooseCar = chooseCar;