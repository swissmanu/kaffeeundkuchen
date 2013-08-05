function apiInit(config, spotifyWrapper, playlist) {
	var Search = require('./search')
		, OnAir = require('./onair')
		, AddTrack = require('./addtrack')
		, Voter = require('./voter')
		, api = require('express')();

	api.post('/api/search', Search(config, spotifyWrapper));
	api.get('/api/tracks', OnAir(config, spotifyWrapper, playlist));
	api.post('/api/tracks', AddTrack(config, spotifyWrapper, playlist));
	api.put('/api/tracks/:id/vote', Voter(config, playlist));

	return api;
}

module.exports = apiInit;