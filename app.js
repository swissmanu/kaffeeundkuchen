var mdns = require('mdns')
	,express = require('express')
	,http = require('http')
	,app = express()
	,Search = require('./server/search')
	,OnAir = require('./server/onair')
	,Voter = require('./server/voter')
	,config = require('./config/config');

var app = createExpressApp(config)
	,server = createAdvertableServerFromExpressApp(app);

server.listen(config.server.port);


/**
 *
 */
function createExpressApp() {
	app.use(express.logger());
	app.use(express.static(__dirname + '/client'));

	app.get('/api/search', Search(config));
	app.get('/api/tracks', OnAir(config));
	app.put('/api/tracks/:id/vote', Voter(config));
}

/**
 *
 */
function createAdvertableServerFromExpressApp(app) {
	var server = http.createServer(app);

	server.on('listening', function() {
		var advertisment = mdns.createAdvertisement(mdns.tcp('http'), server.address().port, { name: 'KaffeeUndKuchen' } );
		advertisment.start();
	});

	return server;
}