var config = {
	local: {
		host     : 'localhost',
		database : 'parcmetres',
		user     : 'root',
		password : 'root',
		port     :  8080
	},
	default: {
		host     : 'distant',
		database : 'parcmetres',
		user     : 'root',
		password : 'root',
		port     :  8080
	}
}
module.exports = function(mode) {
	return config[mode] || config.local;
}