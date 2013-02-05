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
	,SpotifyWrapper = require('./utils/spotifywrapper')
	,igneous = require('igneous');

Log.info('Starting KaffeeUndKuchen');

var playlist = new Playlist()
	,spotifyWrapper = new SpotifyWrapper(config)
	,app = createExpressApp(config, playlist)
	,server = createAdvertableServerFromExpressApp(app, config);

server.listen(config.server.port);

/**
 *
 */
function createExpressApp(config, playlist) {
	var app = express();

	app.use(express.static(__dirname + '/client'));
	app.use(express.bodyParser());
	app.use(createAssetPipelineMiddleware());

	app.post('/api/search', Search(config, spotifyWrapper));
	app.get('/api/tracks', OnAir(config, spotifyWrapper, playlist));
	app.post('/api/tracks', AddTrack(config, spotifyWrapper, playlist));
	app.put('/api/tracks/:id/vote', Voter(config, playlist));

	return app;
}

/**
 *
 */
function createAssetPipelineMiddleware() {
	var assetPipelineMiddleware = igneous({
		root: __dirname + '/client/assets/'
		,minify: true
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