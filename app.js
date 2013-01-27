var mdns = require('mdns')
	,express = require('express')
	,http = require('http')
	,Search = require('./server/search')
	,OnAir = require('./server/onair')
	,Voter = require('./server/voter')
	,config = require('./config/config')
	,log = require('./config/logger');

log.info('Starting KaffeeUndKuchen');

var app = createExpressApp(config)
	,server = createAdvertableServerFromExpressApp(app, config);

server.listen(config.server.port);

/**
 *
 */
function createExpressApp() {
	var app = express();

	app.use(express.static(__dirname + '/client'));

	app.get('/api/search', Search(config));
	app.get('/api/tracks', OnAir(config));
	app.put('/api/tracks/:id/vote', Voter(config));

	return app;
}

/**
 *
 */
function createAdvertableServerFromExpressApp(app, config) {
	var server = http.createServer(app)
		,announce = config.server.announceWithBonjour || false;

	log.info('Listening on Port ' + config.server.port);

	if(announce) {
		log.info('Announcing Port ' + config.server.port + ' with Bonjour');
		server.on('listening', function() {
			var advertisment = mdns.createAdvertisement(mdns.tcp('http'), config.server.port, { name: 'KaffeeUndKuchen' } );
			advertisment.start();
		});		
	}

	return server;
}