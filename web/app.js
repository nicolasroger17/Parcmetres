var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    session = require('express-session'),
    RedisStore = require('connect-redis')(session);

app.use('/webroot', express.static(__dirname + '/webroot'))
.use('/images', express.static(__dirname + '/webroot/images'))
.use('/css', express.static(__dirname + '/webroot/css'))
.use('/js', express.static(__dirname + '/webroot/js'))

.use(express.cookieParser('parcmetres'))
.use(express.bodyParser())
.use(express.session());

dispatcher = require('./core/dispatcher.js')(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port '+ port);
});