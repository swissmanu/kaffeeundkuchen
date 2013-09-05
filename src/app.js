var debug = require('debug')('kaffeeundkuchen')
	, config = require('../config/config')
	, Playlist = require('./models/playlist')
	, utils = require('./utils')

	, playlist = new Playlist()
	, spotifyWrapper = new utils.SpotifyWrapper(config)
	, airplayBrowser = new utils.AirplayBrowser()

	, webSocket = require('./websocket')
	, appFactory = require('./factory')
	, app = appFactory(config, spotifyWrapper, airplayBrowser, playlist)
	, httpServer;

debug('Starting KaffeeUndKuchen on port ' + config.server.port);
httpServer = app.listen(config.server.port);
webSocket(httpServer);

airplayBrowser.start();