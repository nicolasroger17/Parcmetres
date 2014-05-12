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

var myInformations = function(req, res){
	// check if a user with the same mail address exists
	var query = connection.query('SELECT * FROM users where id= ?', [req.session.sessionID], function(err, result){
		// if no error
		if(!err){
			console.log(result[0]);
			res.render('user/myInformations', {user : result[0]});
		}
		else{
			res.writeHead(301,
				{Location: '/home'}
			);
			res.end();
		}
	});
}

exports.myInformations = myInformations;