'use strict';

module.exports = function Voter(config) {

	var handleRequest = function handleRequest(req, res) {
		var spotifyId = req.params.spotifyId;

		Log.info('Route: Voter', input);

		res.json(200, {'spotifyId': spotifyId});
	};

	return handleRequest;
};