'use strict';

var debug = require('debug')('kaffeeundkuchen.api.voter');

module.exports = function Voter(config) {

	var handleRequest = function handleRequest(req, res) {
		var spotifyId = req.params.spotifyId;

		debug('Route: Voter', input);

		res.json(200, {'spotifyId': spotifyId});
	};

	return handleRequest;
};