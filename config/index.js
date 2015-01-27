var _ = require('lodash');

var env = process.env.NODE_ENV || 'development';

var loadConfig = function(name){
	return require(['.', name].join('/'))(env);
};

var config = {
	webserver: loadConfig('webserver'),
	env: env
};


module.exports = config;