var db = require('node-mysql');

var inscription = function(req){
	console.log("inscription");
	for(e in req){
		console.log(req[e]);
	}
}

var	connexion = function(req){
	console.log("connexion");
	for(e in req){
		console.log(req[e]);
	}
}

exports.inscription = inscription;
exports.connexion = connexion;