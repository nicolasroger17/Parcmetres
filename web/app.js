var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    rootDir = __dirname,
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    dispatcher = require('./core/dispatcher.js')(app, rootDir),
    session = require('express-session'),
    RedisStore = require('connect-redis')(session);

app.use('./webroot', express.static(__dirname + "/webroot"))
.use(express.cookieParser('parcmetres'))
.use(express.bodyParser())
.use(express.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port '+ port);
});