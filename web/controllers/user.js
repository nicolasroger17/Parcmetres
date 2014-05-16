var model = require('../models/user');

module.exports.controller = function(app) {

	app.get('/myInformations', function(req, res) {
		if(req.session.sessionID){
			model.myInformations(req, res);
			app.post('/modifyMyInfos', function(req, res) {
				model.modifyMyInfos(req, res);
			});
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

	app.get('/myCredit', function(req, res) {
		if(req.session.sessionID){
			res.render('user/myCredit');
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

	app.get('/start', function(req, res) {
		if(req.session.sessionID){
			res.render('user/start');
		}
		else{
			res.writeHead(301,
			  {Location: '/'}
			);
			res.end();
		}
	});

	app.get('/lostPassword', function(req, res) {
		if(!req.session.sessionID){
			res.render('user/lostPassword');
			app.post('/resetPassword', function(req, res){
				model.resetPassword(req, res);
			});
		}
		else{
			res.writeHead(301,
			  {Location: '/home'}
			);
			res.end();
		}
	});

}