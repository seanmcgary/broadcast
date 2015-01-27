var _ = require('lodash');
var q = require('q');

var fs = require('fs');

module.exports = function(server){

	server.get('/test', function(req, res, next){
		res.send(fs.readFileSync(__dirname + '/test.html').toString());
	});

};