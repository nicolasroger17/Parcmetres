var mysql = require('mysql');
var conf = require('../config/conf.js')();

var connection = mysql.createConnection({
  host     : conf.host,
  database : conf.database,
  user     : conf.user,
  	password : conf.password, port : conf.port
});

connection.connect();

var inscription = function(req, res){
	// check if a user with the same mail address exists
	var query = connection.query('SELECT emailAddress FROM users where emailAddress= ?', [req.body.emailAddress], function(err, result){
		// if no error
		if(!err){
			// if the mail address is free
			if(result.length == 0 && allFieldsSet(req.body)){
				var query = connection.query('INSERT INTO users SET ?', req.body, function(err, result) {
					if(!err){
						res.writeHead(301,
							{Location: '/connexion'}
						);
						res.end();
					}
					else{
						res.writeHead(301,
							{Location: '/inscription'}
						);
						res.end();
					}
				});
			}
			else{
				res.writeHead(301,
					{Location: '/inscription'}
				);
				res.end();
			}
		}
		else{
			res.writeHead(301,
				{Location: '/inscription'}
			);
			res.end();
		}
	});
}

function allFieldsSet(req){
	// todo
	return true;
}

var	connexion = function(req, res){
	var query = connection.query('SELECT id, lastName, firstName FROM users where emailAddress= ?  && password= ?', [req.body.emailAddress, req.body.password], function(err, result){
		if(!err){
			if(result.length > 0){
				req.session.sessionID = result[0].id; req.session.lastName = result[0].lastName; req.session.firstName = result[0].firstName;
				res.writeHead(301,
					{Location: '/home'}
				);
				res.end();
			}
			else{
				res.writeHead(301,
					{Location: '/connexion'}
				);
				res.end();
			}
		}
		else{
			res.writeHead(301,
				{Location: '/connexion'}
			);
			res.end();
		}
	});
}

exports.inscription = inscription;
exports.connexion = connexion;