var mysql = require('mysql'),
	conf = require('../config/conf.js')(),
	fs = require('fs'),
	path = require('path');

var connection = mysql.createConnection({
	port	 : conf.port,
	host     : conf.host,
	database : conf.database,
	user     : conf.user,
	password : conf.password,
});

connection.connect();


var addCar = function(req, res){
	req.models.car.create(req.body, function(err, result){
		if(!err){
			// ORM doesn't work with this case
			var query = connection.query('INSERT INTO user_cars (user_id, cars_id) VALUES(?, ?)', [req.session.sessionID, req.body.id], function(err, result) {
				// sets the directory for the images
				var dirPath = path.resolve(__dirname, '../webroot/images/'+req.body.id);
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
			});	
		}
		else{
			res.writeHead(301, {Location: '/addCar'});
			res.end();
		}
	});
}

function checkFields(req){
	return req.body.id.originalFilename != "" && req.body.name != undefined && req.files.registrationFile != undefined ;
}

var myCars = function(req, res){
	// check if a user with the same mail address exists
	req.models.user.get(req.session.sessionID, function(err, user){
		user.getCars(function(err, result){
			if(!err){
				res.render('cars/myCars', {cars: result});
			}
			else{
				res.writeHead(301, {Location: '/home'});
				res.end();
			}
		});
	});
}

var modifyCar = function(req, res){
	// check if a user with the same mail address exists
	req.models.car.get(req.body.id, function(err, result){
		if(!err){
			result.name = req.body.name;
			result.save(function(err){
				console.log(err);
				if(!err){
					// sets the directory for the images
					var dirPath = path.resolve(__dirname, '../webroot/images/'+req.body.id);
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
					res.writeHead(301, {Location: '/myCars'});
					res.end();
				}
			});
		}
		else{
			res.writeHead(301, {Location: '/myCars'});
			res.end();
		}
	});
}

var deleteCar = function(req, res){
	// check if a user with the same mail address exists
	req.models.car.get(req.body.id, function (err, result) {
		if(!err){
			result.remove(function(err){
				if(!err){
					var files = [];
					var dirPath = path.resolve(__dirname, '../webroot/images/'+req.body.id);
					//delete folder
				    deleteFolderRecursive(dirPath, res, '/myCars');
			    }
			});
		}
		else{
			res.writeHead(301, {Location: '/myCars'} );
			res.end();
		}
	});
}

function uploadFiles(files, dirPath, res){
	if(files.registrationFile.originalFilename != ""){
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
	else if(files.photo.originalFilename != ""){
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

function deleteFolderRecursive(dirPath, res, page){
    if(fs.existsSync(dirPath)) {
	    files = fs.readdirSync(dirPath);
	    files.forEach(function(file,index){
	        var curPath = dirPath + "/" + file;
	        if(fs.lstatSync(curPath).isDirectory()) { // recurse
	            deleteFolderRecursive(curPath);
	      	} else { // delete file
	            fs.unlinkSync(curPath);
	        }
	    });
	    fs.rmdirSync(dirPath);
	    res.writeHead(301, {Location: page} );
		res.end();
	}
};

exports.addCar = addCar;
exports.myCars = myCars;
exports.modifyCar = modifyCar;
exports.deleteCar = deleteCar;