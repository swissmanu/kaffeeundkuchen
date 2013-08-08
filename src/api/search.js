var debug = require('debug')('kaffeeundkuchen.api.search');

function handleRequest(req, res) {
	debug('handle request');

	var input = req.body
		, spotifyWrapper = req.app.get('spotifyWrapper');

	if(validateInput(input)) {
		spotifyWrapper.searchTrack(input.artist, input.track,
			function onSuccess(tracks) {
				res.json(200, tracks);
			}
			, function onError(err) {
				res.json(500);
			}
		);
	} else {
		debug('Invalid Search request');
		res.json(400); // Bad Request
	}
}

function validateInput(input) {
	var valid = (input.artist !== undefined) || (input.track !== undefined);
	return valid;
}

module.exports = handleRequest;