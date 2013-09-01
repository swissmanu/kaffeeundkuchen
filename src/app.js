var debug = require('debug')('kaffeeundkuchen')
	, config = require('../config/config')
	, Playlist = require('./models/playlist')
	, SpotifyWrapper = require('./utils').SpotifyWrapper

	, playlist = new Playlist()
	, spotifyWrapper = new SpotifyWrapper(config)

	, webSocket = require('./websocket')
	, appFactory = require('./factory')
	, app = appFactory(config, spotifyWrapper, playlist)
	, httpServer;

debug('Starting KaffeeUndKuchen on port ' + config.server.port);
httpServer = app.listen(config.server.port);
webSocket(httpServer);