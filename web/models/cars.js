var mysql = require('mysql'),
	conf = require('../config/conf.js')(),
	fs = require('fs'),
	path = require('path');

var connection = mysql.createConnection({
	host     : conf.host,
	database : conf.database,
	user     : conf.user,
	password : conf.password,
});

connection.connect();

var addCar = function(req, res){
	// check if a user with the same mail address exists
	var query = connection.query('SELECT registrationPlate FROM cars where registrationPlate= ?', [req.body.registrationPlate], function(err, result){
		// if no error
		if(!err){
			// if the mail address is free
			if(result.length == 0 && checkFields(req)){
				var query = connection.query('INSERT INTO cars SET ?', req.body, function(err, result) {
					// if no error in request
					if(!err){
						// sets the directory for the images
						var dirPath = path.resolve(__dirname, '../webroot/images/'+req.body.registrationPlate);
						// check if the directory exists
						fs.exists(dirPath, function (exists) {
						  	if(exists){
						  		uploadFiles(req.files, dirPath, res);
						  	}
						  	// if not create it
						  	else{
						  		fs.mkdir(dirPath, function(exception) {
						  			uploadFiles(req.files, dirPath, res);
						  		});
						  	}
						});						
					}
					else{
						res.writeHead(301,
							{Location: '/addCar'}
						);
						res.end();
					}
				});
			}
			else{
				res.writeHead(301,
					{Location: '/addCar'}
				);
				res.end();
			}
		}
		else{
			res.writeHead(301,
				{Location: '/addCar'}
			);
			res.end();
		}
	});
}

function checkFields(req){
	return req.body.registrationPlate.originalFilename != "" && req.body.name != undefined && req.files.registrationFile != undefined ;
}

function uploadFiles(files, dirPath, res){
	// get registration file in tmp
	fs.readFile(files.registrationFile.path, function (err, data) {
		// write it to the directory
		fs.writeFile(dirPath+"\\registrationFile.jpg", data, function(err){
			// if no errors
			if(!err){
				// if a photo is there
				if(files.photo.originalFilename != ""){
					// get photo in tmp
					fs.readFile(files.photo.path, function (err, data) {
						// write it to the directory
						fs.writeFile(dirPath+"\\photo.jpg", data, function(err){
							if(!err){
								res.writeHead(301,
									{Location: '/myCars'}
								);
								res.end();
							}
						});
					});
				}
				else{
					res.writeHead(301,
						{Location: '/myCars'}
					);
					res.end();
				}
			}
			else{
				res.writeHead(301,
					{Location: '/addCar'}
				);
				res.end();
			}
		});
	});
}

exports.addCar = addCar;