var debug = require('debug')('kaffeeundkuchen.factory')
	, express = require('express');

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

module.exports = createExpressApp;