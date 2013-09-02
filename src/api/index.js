var debug = require('debug')('kaffeeundkuchen.api');

function apiInit() {
	debug('inititialize api module');

	var search = require('./search')
		, onair = require('./onair')
		, addTrack = require('./addtrack')
		, voter = require('./voter')
		, coverImage = require('./coverimage')
		, apiApp = require('express')();

	apiApp.post('/api/search', search);
	apiApp.get('/api/tracks', onair);
	apiApp.post('/api/tracks', addTrack);
	apiApp.put('/api/tracks/:id/vote', voter);

	apiApp.get('/images/cover/:size/:trackid', coverImage);
	apiApp.get('/images/cover/:trackid', coverImage);

	return apiApp;
}

module.exports = apiInit;