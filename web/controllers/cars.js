var express = require('express');
var model = require('../models/cars');

module.exports.controller = function(app) {

	app.get('/myCars', function(req, res) {
	  res.render('cars/myCars');
	});

	app.get('/addCar', function(req, res) {
		res.render('cars/addCar');
		app.post('/addCar', express.multipart(), function(req, res) {
			console.log("post received");
			model.addCar(req, res);
		});
	});
}