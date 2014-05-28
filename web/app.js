var express = require('express'),
    orm = require('orm'),
    app = express(),
    path = require('path'),
    server = require('http'),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs'),
    conf = require('./config/conf.js')();

app.set('port', process.env.PORT || 8080)
.use('/webroot', express.static(__dirname + '/webroot'))
.use(orm.express(conf, {
   define: function (db, models) {
      models.user = db.define("user", {
         lastName     : String,
         firstName    : String,
         emailAddress : String,
         address 		 : String,
         city         : String,
         zipCode      : Number,
         phone        : String,
         password     : String
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

      models.car = db.define("car", {
         name          : String,
         status        : {type: "text", defaultValue: "free"}
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
.set('views', __dirname + '/views')
.set('view engine', 'ejs')
.use(express.favicon())
.use(express.logger('dev'))
.use(express.json())
.use(express.urlencoded())
.use(express.methodOverride())
.use(express.cookieParser('parcmetresSecretCookie'))
.use(express.session())
.use(app.router);

app.appliCookie = {};
//req.models.user.sync();
//req.models.car.sync();
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