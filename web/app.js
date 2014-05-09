var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http'),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

app.set('port', process.env.PORT || 8080)
.set('views', __dirname + '/views')
.set('view engine', 'ejs')
.use(express.favicon())
.use(express.logger('dev'))
.use(express.bodyParser())
.use(express.methodOverride())
.use(express.cookieParser('parcmetresSecretCookie'))
.use(express.session())
.use(app.router)
.use('/webroot', express.static(__dirname + '/webroot'));

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

server.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});