var debug = require('debug')('kaffeeundkuchen.api.player');

function handlePlayRequest(req, res) {
	debug('handle play request');

	var spotifyWrapper = req.app.get('spotifyWrapper')
		, spotifyId = req.params.trackid
		, track = spotifyWrapper.getCachedTrack(spotifyId);

	spotifyWrapper.playTrack(track);

	res.json({ success: true });
}

module.exports = {
	play: handlePlayRequest
};