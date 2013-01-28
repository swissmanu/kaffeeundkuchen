'use strict';

var mdns = require('mdns')
	,express = require('express')
	,http = require('http')
	,Search = require('./routes/search')
	,OnAir = require('./routes/onair')
	,AddTrack = require('./routes/addtrack')
	,Voter = require('./routes/voter')
	,Log = require('./config/logger')
	,config = require('./config/config')
	,Playlist = require('./models/playlist')
	,SpotifyWrapper = require('./util/spotifywrapper');

Log.info('Starting KaffeeUndKuchen');

var playlist = new Playlist()
	,spotifyWrapper = new SpotifyWrapper()
	,app = createExpressApp(config, playlist, spotifyWrapper)
	,server = createAdvertableServerFromExpressApp(app, config);

server.listen(config.server.port);

/**
 *
 */
function createExpressApp(config, playlist, spotifyWrapper) {
	var app = express();

	app.use(express.static(__dirname + '/client'));
	app.use(express.bodyParser());

	app.post('/api/search', Search(config, spotifyWrapper));
	app.get('/api/tracks', OnAir(config, playlist));
	app.post('/api/tracks', AddTrack(config, playlist));
	app.put('/api/tracks/:id/vote', Voter(config, playlist));

	return app;
}

/**
 *
 */
function createAdvertableServerFromExpressApp(app, config) {
	var server = http.createServer(app)
		,announce = config.server.announceWithBonjour || false;

	Log.info('Listening on Port ' + config.server.port);

	if(announce) {
		Log.info('Announcing Port ' + config.server.port + ' with Bonjour');
		server.on('listening', function() {
			var advertisment = mdns.createAdvertisement(mdns.tcp('http'), config.server.port, { name: 'KaffeeUndKuchen' } );
			advertisment.start();
		});		
	}

	return server;
}