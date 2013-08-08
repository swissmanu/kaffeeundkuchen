var debug = require('debug')('kaffeeundkuchen.api.addtrack');

function validateInput(input) {
	var valid = (input !== undefined && input.spotifyId !== undefined);
	return valid;
}

function handleRequest(req, res) {
	debug('handle request');

	var input = req.body
		, spotifyWrapper = req.app.get('spotifyWrapper')
		, playlist = req.app.get('playlist')
		, responseData = {
			statusCode : 200
			, content : {}
		};

	if(validateInput(input)) {
		var spotifyTrack = spotifyWrapper.getCachedTrack(input.spotifyId);

		if(spotifyTrack === undefined) {
			debug('Track not found in cache. Not searched before?');
			responseData.statusCode = 400;
		} else {
			playlist.addTrack(
				spotifyTrack.spotifyId
				, spotifyTrack.artist
				, spotifyTrack.track
			);
		}
	} else {
		debug('Invalid request to add track', input);
		responseData.statusCode = 400;
	}

	res.json(responseData.statusCode, responseData.content);
}

module.exports = handleRequest;