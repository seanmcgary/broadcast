var _ = require('lodash');
var q = require('q');

module.exports = function(server, m){

	server.post('/publish/:room', function(req, res, next){
		var data = req.body || {};

		m.websocket.broadcastMessage(req.params.room, data);
		res.json(200, {});
	});
};