var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'parcmetres',
  user     : 'root',
  password : '',
});

connection.connect();

var inscription = function(req){
	var query = connection.query('INSERT INTO users SET ?', req, function(err, result) {
		return err==null;
	});
}

var	connexion = function(req){
	console.log("before query");
	var query = connection.query('SELECT id, lastName, firstName FROM users where emailAddress= ?  && password= ?', [req.emailAddress, req.password], function(err, result){
		console.log("inside query");
		return result.length>0;
	});
	console.log('after query');
	console.log(query);
	console.log(query.result);
}

exports.inscription = inscription;
exports.connexion = connexion;