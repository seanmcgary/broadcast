var _ = require('lodash');
var q = require('q');
var uuid = require('node-uuid');

var socketIo = require('socket.io');
var logwrangler = require('logwrangler');

function Client(socket){
	this.socket = socket;
	var id = this.id = socket.id;
	var host = this.host = socket.client.conn.remoteAddress;

	var logger = this.logger = logwrangler.create({
		logOptions: {
			ns: [host, id].join(' :: ')
		}
	}, true);

	this.socket.on('join', function(data){
		var channel = data.channel;
		if(channel && channel.length){
			socket.join(channel);
			logger.success({
				message: 'client joined channel',
				data: { channel: channel }
			});
		}
	});

	this.socket.on('leave', function(data){
		var channel = data.channel;
		if(channel && channel.length){
			socket.leave(channel);
			logger.warn({
				message: 'client left channel',
				data: { channel: channel }
			});
		}
	})
};


function Server(httpServer){
	var self = this;
	var logger = this.logger = logwrangler.create({
		logOptions: {
			ns: 'websocket'
		}
	}, true);

	var io = self.io = new socketIo({
		transports: ['websocket']
	});
	io.attach(httpServer);

	self.setupListeners();

	return self;
};

Server.prototype.setupListeners = function(){
	var self = this;

	self.io.on('connection', function(socket){
		new Client(socket);
	});
};

Server.prototype.broadcastMessage = function(channel, data){
	var payload = {
		channel: channel,
		data: data
	};

	this.logger.info({
		message: 'broadcasting message',
		data: { channel: channel }
	});

	this.io.to(channel).emit('msg', payload);
};


exports.Server = Server;