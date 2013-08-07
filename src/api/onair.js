
var debug = require('debug')('kaffeeundkuchen.api.onair');

module.exports = function OnAir(config, playlist) {

	var handleRequest = function handleRequest(req, res) {
		debug('handle request');

		var responseData = {
				statusCode : 200
				, content : playlist.getTracks()
			};

		res.json(responseData.statusCode, responseData.content);
	};

	return handleRequest;
};