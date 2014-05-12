var config = {
	local: {
		host     : 'localhost',
		database : 'parcmetres',
		user     : 'root',
		password : 'root',
		port     :  8888
	},
	default: {
		host     : 'distant',
		database : 'parcmetres',
		user     : 'root',
		password : 'root',
		port     :  8888
	}
}
module.exports = function(mode) {
	return config[mode] || config.local;
}