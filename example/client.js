var io = require('socket.io-client');

var socket = io('http://localhost:9000/');

socket.on('connect', function(){
	console.log('connected');

	socket.emit('join', { channel: 'foobar' });
});

socket.on('msg', function(data){
	console.log('message: ', data);
});