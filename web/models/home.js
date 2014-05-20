var mysql = require('mysql');
var conf = require('../config/conf.js')();

var connection = mysql.createConnection({
	port	 : conf.port,
	host     : conf.host,
	database : conf.database,
	user     : conf.user,
	password : conf.password
});

connection.connect();

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

exports.inscription = inscription;
exports.connexion = connexion;