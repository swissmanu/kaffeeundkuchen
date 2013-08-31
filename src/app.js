
var debug = require('debug')('kaffeeundkuchen')
	, express = require('express')
	, config = require('../config/config')
	, Playlist = require('./models/playlist')
	, SpotifyWrapper = require('./utils').SpotifyWrapper

	, playlist = new Playlist()
	, spotifyWrapper = new SpotifyWrapper(config);


function createExpressApp(config, spotifyWrapper, playlist) {
	debug('create express app');

	var app = express()
		, api = require('./api')()
		, client = require('./client')();

	app.set('config', config);
	app.set('spotifyWrapper', spotifyWrapper);
	app.set('playlist', playlist);

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/client/public'));

	app.use(api);
	app.use(client);

	return app;
}

var app = createExpressApp(config, spotifyWrapper, playlist);

debug('Starting KaffeeUndKuchen on port ' + config.server.port);
app.listen(config.server.port);