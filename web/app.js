var express = require('express'),
    orm = require('orm'),
    app = express(),
    path = require('path'),
    server = require('http'),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs'),
    conf = require('./config/conf.js')(),
    parked = require('./models/parked');

app.set('port', process.env.PORT || 8080) // défini le port du serveur
.use('/webroot', express.static(__dirname + '/webroot')) // rend le dossier webroot public
//configuration des classes pour l'ORM 
.use(orm.express(conf, {
   define: function (db, models) {
    // les utilisateurs
      models.user = db.define("user", {
         lastName     : String,
         firstName    : String,
         emailAddress : String,
         address 		 : String,
         city         : String,
         zipCode      : Number,
         phone        : String,
         password     : String,
         credit       : double
      },
      {
         id: ['id'],
         methods: {
            // add methods 
         },
         validations: {
            id: orm.enforce.unique("id already taken!"),
            emailAddress: orm.enforce.unique({ ignoreCase: true }, "mail already taken!")
         },
         cache   : false
      })
      // les voitures
      models.car = db.define("car", {
         name          : String
      },
      {
         id: ['id'],
         methods: {
            // add methods 
         },
         validations: {
            id: orm.enforce.unique("plate already taken")
         },
         cache   : false
      })
      // la classe parked pour les voitures garées (utilisée principalement pour l'application police)
      models.parked = db.define("parked", {
         dateBegin     : Date,
         localPrice    : Number,
         locationX     : Number,
         locationY     : Number
      },
      {
        id : ['car_id'],
        methods: {
          // add methods 
        },
        validations: {
          car_id: orm.enforce.unique("car already parked")
        },
        cache   : false
      })

      models.user.hasMany("cars", models.car, {},
			{
            reverse : "users"
			}
      );

      models.parked.hasOne("car", models.car, { reverse: "parked" });
   }
}))
.set('views', __dirname + '/views') // défini le dossier contenant les vu pour fs
.set('view engine', 'ejs') // défini ejs comme le gérant des templates
.use(express.favicon())
.use(express.logger('dev')) // active le mode developpeur pour la console du serveur
.use(express.json()) // sert à gérer les données envoyez par formulaires
.use(express.urlencoded()) // idem
.use(express.methodOverride())
.use(express.cookieParser('parcmetresSecretCookie')) // sert à gérer les sessions (grain de sel)
.use(express.session()) // sert à gérer les sessions
.use(app.router); // permet de router les sessions

app.appliCookie = {}; // tableau utliser pour gérer manuellement les sessions de l'application

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

// démarre le serveur
server.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});