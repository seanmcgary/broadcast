#!/usr/bin/env node

var _ = require('lodash');
var q = require('q');

var config = require('./config');

var Webserver = require('./modules/webserver');
var Websocket = require('./modules/websocket');

var webserver = new Webserver.Server(config.webserver);

var websocket = new Websocket.Server(webserver.getHttp());

webserver.loadRoutes('publish', {
	websocket: websocket
});

webserver.start();