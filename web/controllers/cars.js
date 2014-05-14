var express = require('express');
var model = require('../models/cars');

module.exports.controller = function(app) {

	app.get('/myCars', function(req, res) {
		if(req.session.sessionID){
	 		model.myCars(req, res);
	 		app.post('/modifyCar', express.multipart(), function(req, res) {
				model.modifyCar(req, res);
			});
			app.post('/deleteCar', function(req, res) {
				model.deleteCar(req, res);
			});
	 	}
	 	else{
	 		res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
	 	}
	});

	app.get('/addCar', function(req, res) {
		if(req.session.sessionID){
			res.render('cars/addCar');
			app.post('/addCar', express.multipart(), function(req, res) {
				model.addCar(req, res);
			});
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

}