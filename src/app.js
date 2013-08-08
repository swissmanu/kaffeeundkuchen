
var debug = require('debug')('kaffeeundkuchen')
	//, mdns = require('mdns')
	, express = require('express')
	, http = require('http')
	, config = require('../config/config')
	, Playlist = require('./models/playlist')
	, SpotifyWrapper = require('./utils').SpotifyWrapper;
	//, igneous = require('igneous');

/**
 *
 */
function createExpressApp(config, spotifyWrapper, playlist) {
	debug('create express app');

	var app = express()
		, api = require('./api')();

	app.set('config', config);
	app.set('spotifyWrapper', spotifyWrapper);
	app.set('playlist', playlist);

	//app.use(express.static(__dirname + '/client'));
	app.use(express.bodyParser());
	//app.use(createAssetPipelineMiddleware());
	app.use(api);

	return app;
}

/**
 *
 *
function createAssetPipelineMiddleware() {
	var assetPipelineMiddleware = igneous({
		root: __dirname + '/client/assets/'
		,minify: false
		,watch: false
		,flows: [
			{
				route: 'js/app.js'
				,type: 'js'
				,paths: [
					'vendor/junior/zepto.min.js'
					,'vendor/junior/lodash.min.js'
					,'vendor/junior/modernizr.custom.15848.js'
					,'vendor/junior/backbone-min.js'
					,'vendor/junior/junior.js'
					,'vendor/handlebars/handlebars.js'
					,'vendor/spin/spin.min.js'
					,'js/'
				]
			},{
				route: 'js/templates.js'
				,type: 'jst'
				,jst_lang: 'handlebars'
				,jst_namespace: 'templates'
				,base: 'templates/'
				,paths: [
					'NowPlaying.jst'
					,'Playlist.jst'
					,'PlaylistItem.jst'
					,'SearchResults.jst'
					,'SearchResultItem.jst'
					,'SearchTracks.jst'
				]
			},{
				route: 'style/app.css'
				,type: 'css'
				,paths: [
					'vendor/junior/stylesheets/'
					,'style/main.scss'
				]
			}
		]
	});

	return assetPipelineMiddleware;
}*/

/**
 *
 */
/*function createAdvertableServerFromExpressApp(app, config) {
	debug('create advertable server from express app');

	var server = http.createServer(app)
		,announce = config.server.announceWithBonjour || false;

	debug('Listening on Port ' + config.server.port);

	if(announce) {
		debug('Announcing Port ' + config.server.port + ' with Bonjour');
		server.on('listening', function() {
			var advertisment = mdns.createAdvertisement(
				mdns.tcp('http')
				, config.server.port
				, { name: 'KaffeeUndKuchen' }
			);
			advertisment.start();
		});
	}

	return server;
}*/

debug('Starting KaffeeUndKuchen');

var playlist = new Playlist()
	, spotifyWrapper = new SpotifyWrapper(config)
	, app = createExpressApp(config, spotifyWrapper, playlist);
	//, server = createAdvertableServerFromExpressApp(app, config);

server.listen(config.server.port);