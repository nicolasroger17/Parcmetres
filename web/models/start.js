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
	var query = connection.query('SELECT *.cars FROM cars LEFT JOIN usercar ON cars.registrationPlate = usercar.registrationPlate WHERE  usercar.userId= ?', [req.session.sessionID], function(err, result){
		console.log(err);
		// if no error
		if(!err){
			console.log(result[0]);
			res.render('start/chooseCar', {cars : result});
		}
		else{
			res.writeHead(301,
				{Location: '/home'}
			);
			res.end();
		}
	});
}

exports.chooseCar = chooseCar;