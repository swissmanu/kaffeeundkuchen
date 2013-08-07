
var debug = require('debug')('kaffeeundkuchen.api.search');

var Search = function Search(config, spotifyWrapper) {
	var handleRequest = function handleRequest(req, res) {
		debug('handle request');

		var input = req.body
			, responseData = {
				statusCode : 200
				, content : {}
			};

		if(validateInput(input)) {
			spotifyWrapper.searchTrack(input.artist, input.track,
				function(tracks) {
					res.json(200, tracks);
				}
			);
		} else {
			debug('Invalid Search request');
			responseData.statusCode = 400; // Bad Request
			res.json(responseData.statusCode, responseData.content);
		}
	};

	var validateInput = function validateInput(input) {
		var valid = (input.artist !== undefined) || (input.track !== undefined);
		return valid;
	};

	return handleRequest;
};

module.exports = Search;