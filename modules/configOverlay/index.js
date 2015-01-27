var _ = require('lodash');

exports.overlay = function(envMap){
	envMap = envMap || {};

	var values = {};

	return _.reduce(envMap, function(values, configKey, envName){
		var env = process.env[envName];
		if(env){
			values[configKey] = env;
		}

		return values;
	}, values)
};