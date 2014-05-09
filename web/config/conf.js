var config = {
	local: {
		host     : 'localhost',
		database : 'parcmetres',
		user     : 'root',
		password : '',
	},
	default: {
		host     : 'distant',
		database : 'parcmetres',
		user     : 'root',
		password : '',
	}
}
module.exports = function(mode) {
	return config[mode] || config.local;
}