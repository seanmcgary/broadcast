var _ = require('lodash');
var configOverlay = require('../modules/configOverlay');

module.exports = function(env){

	var mapping = {
		BROADCAST_WEBSERVER_PORT: 'port'
	};

	var base = {
		port: 8000
	};

	var environments = {
		development: _.extend(_.cloneDeep(base), {

		}),
		production: _.extend(_.cloneDeep(base), {
			
		})
	};

	return _.extend(environments[env], configOverlay.overlay(mapping));
};