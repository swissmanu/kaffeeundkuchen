var debug = require('debug')('kaffeeundkuchen.client')
	, join = require('path').join;


function handleIndex(req, res) {
	debug('handle index request');
	res.sendfile(join(__dirname, 'views', 'index.html'));
}

function handlePartial(req, res) {
	debug('handle partial request');
	var name = req.params.name;
	res.sendfile(join(__dirname, 'views', 'partials', name));
}

function handleEngineIOClient(req, res) {
	debug('handle engine.io client request');

	var jsPath = join(
		__dirname, '..', '..', 'node_modules'
		, 'engine.io-client', 'engine.io.js');

	res.sendfile(jsPath);
}

function clientInit() {
	debug('inititialize client module');

	var clientApp = require('express')();

	clientApp.get('/', handleIndex);
	clientApp.get('/partials/:name', handlePartial);
	clientApp.get('/app/vendor/engine.io.js', handleEngineIOClient);

	// The AngularJS app uses the HTML 5 mode for building URLs. So it's safe to
	// handle all other requests like an index request.
	clientApp.get('*', handleIndex);

	return clientApp;
}

module.exports = clientInit;