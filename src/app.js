var debug = require('debug')('kaffeeundkuchen')
	, config = require('../config/config')
	, Playlist = require('./models/playlist')
	, utils = require('./utils')
	, WebsocketServer = require('./websocket')

	, playlist = new Playlist()
	, spotifyWrapper = new utils.SpotifyWrapper(config)
	, airplayBrowser = new utils.AirplayBrowser()


	, appFactory = require('./factory')
	, app = appFactory(config, spotifyWrapper, airplayBrowser, playlist)
	, httpServer;

debug('starting KaffeeUndKuchen on port ' + config.server.port);
httpServer = app.listen(config.server.port);

app.set('websocket', new WebsocketServer(httpServer));
airplayBrowser.start();