function apiInit() {
	var search = require('./search')
		, onair = require('./onair')
		, addTrack = require('./addtrack')
		, voter = require('./voter')
		, apiApp = require('express')();

	apiApp.post('/api/search', search);
	apiApp.get('/api/tracks', onair);
	apiApp.post('/api/tracks', addTrack);
	apiApp.put('/api/tracks/:id/vote', voter);

	return apiApp;
}

module.exports = apiInit;