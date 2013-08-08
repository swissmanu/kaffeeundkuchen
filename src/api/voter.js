
var debug = require('debug')('kaffeeundkuchen.api.voter');

function handleRequest(req, res) {
	var spotifyId = req.params.spotifyId;

	debug('Route: Voter');

	res.json(200, {'spotifyId': spotifyId});
}

module.exports = handleRequest;