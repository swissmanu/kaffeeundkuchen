
var debug = require('debug')('kaffeeundkuchen.api.onair');

function handleRequest(req, res) {
	debug('handle request');

	var playlist = req.app.get('playlist')
		, responseData = {
			statusCode : 200
			, content : playlist.getTracks()
		};

	res.json(responseData.statusCode, responseData.content);
}

module.exports = handleRequest;