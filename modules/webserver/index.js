var _ = require('lodash');
var q = require('q');

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logwrangler = require('logwrangler');
var expressWrangler = require('express-wrangler');

function Server(config){
	var self = this;
	self.config = config;
	var server = self.server = express();
	var http = self.http = require('http').Server(server);

	var logger = self.logger = logwrangler.create({
		logOptions: {
			ns: 'express'
		}
	});

	server.use(bodyParser.json());
	server.use(expressWrangler({
		logger: logger
	}));

	return self;
};

Server.prototype.start = function(){
	var self = this;
	self.http.listen(self.config.port, function(){
		self.logger.success({
			message: 'server listening on port ' + self.config.port
		});
	});
};

Server.prototype.loadRoutes = function(module, inject){
	require(path.resolve([__dirname, '../../modules', module, 'routes'].join('/')))(this.server, inject || {});
};

Server.prototype.getServer = function(){
	return this.server;
};
Server.prototype.getHttp = function(){
	return this.http;
};

exports.Server = Server;
