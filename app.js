var mdns = require('mdns')
	,express = require('express')
	,http = require('http')
	,app = express()
	,search = require('./server/search')
	,onair = require('./server/onair')
	,voter = require('./server/voter')
	,config = require('./config/config');

var app = createExpressApp(config)
	,server = createAdvertableServerFromExpressApp(app);

server.listen(80);


/**
 *
 */
function createExpressApp() {
	app.use(express.logger());
	app.use(express.static(__dirname + '/client'));

	app.get('/api/search', search(config));
	app.get('/api/tracks', onair(config));
	app.put('/api/tracks/:id/vote', voter(config));
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