var debug = require('debug')('kaffeeundkuchen.api');

function apiInit() {
	debug('inititialize api module');

	var search = require('./search')
		, onair = require('./onair')
		, addTrack = require('./addtrack')
		, voter = require('./voter')
		, player = require('./player')
		, output = require('./output')

		, coverImage = require('./coverimage')

		, apiApp = require('express')();

	apiApp.post('/api/search', search);
	apiApp.get('/api/tracks', onair);
	apiApp.post('/api/tracks', addTrack);
	apiApp.put('/api/tracks/:id/vote', voter);

	apiApp.get('/api/player/play/:trackid', player.play);

	apiApp.get('/api/output/available', output.availableOutputs);
	apiApp.get('/api/output/current', output.currentOutput);
	apiApp.put('/api/output', output.setOutput);

	apiApp.get('/images/cover/:size/:trackid', coverImage);
	apiApp.get('/images/cover/:trackid', coverImage);

	return apiApp;
}

module.exports = apiInit;