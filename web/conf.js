var config = {
	default: {
		database : "parcmetres",
		protocol : "mysql",
		host     : "127.0.0.1",
		port     : 3306,         // optional, defaults to database default
		user     : "root",
		password : "",
		query    : {
			pool     : false,   // optional, false by default
			debug    : true,   // optional, false by default
			strdates : true    // optional, false by default
		}
	},
	local: {
		database : "parcmetres",
		protocol : "mysql",
		host     : "127.0.0.1",
		port     : 3306,         // optional, defaults to database default
		user     : "root",
		password : "",
		query    : {
			pool     : false,   // optional, false by default
			debug    : true,   // optional, false by default
			strdates : true    // optional, false by default
		}
	}
}
module.exports = function(mode) {
	return config[mode] || config.local;
}