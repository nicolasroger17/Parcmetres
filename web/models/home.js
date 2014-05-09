var mysql = require('mysql');
var conf = require('../config/conf.js')();

var connection = mysql.createConnection({
  host     : conf.host,
  database : conf.database,
  user     : conf.user,
  password : conf.password,
});

connection.connect();

var inscription = function(req, res){
	var query = connection.query('INSERT INTO users SET ?', req.body, function(err, result) {
		return err==null;
	});
}

var	connexion = function(req, res){
	var query = connection.query('SELECT id, lastName, firstName FROM users where emailAddress= ?  && password= ?', [req.body.emailAddress, req.body.password], function(err, result){
		if(err == null){
			if(result.length > 0){
				req.session.sessionID = result[0].id;
				req.session.lastName = result[0].lastName;
				req.session.firstName = result[0].firstName;
				res.writeHead(301,
				  {Location: '/'}
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