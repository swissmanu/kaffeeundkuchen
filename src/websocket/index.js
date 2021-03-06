var debug = require('debug')('kaffeeundkuchen.websocket')
	, Primus = require('primus')
	, PrimusResponder = require('primus-responder')
	, EventEmitter = require('events').EventEmitter
	, util = require('util')

	, _primus
	, _sockets;



function handleData(envelope) {
	debug('received data from spark');

	console.log(envelope);

	var topic = envelope.topic || '*'
		, message = envelope.message || envelope;

	this.emit(topic, message);
}

function handleClose() {
	debug('spark closed connection');
}

function handleNewConnection(spark) {
	debug('new spark connected');

	spark.on('data', handleData);
	spark.on('close', handleClose);
}


/** Class: WebsocketServer
 * Uses `Primus` to building a websocket server for the clients.
 */
var WebsocketServer = function WebsocketServer(httpServer) {
	debug('inititialize websocket server');

	EventEmitter.call(this);
	_sockets = [];

	_primus = new Primus(httpServer, { transformer: 'sockjs' });
	_primus.use('responder', PrimusResponder);
	_primus.on('connection', handleNewConnection);

	_primus.on('request', function(data, callback) {
		console.log('GOT: ', data);
		setTimeout(function() {
			callback('SERVER RESPONDED!');
		}, 2000);
	});
};
util.inherits(WebsocketServer, EventEmitter);

module.exports = WebsocketServer;


function publish(topic, message, spark) {
	debug('publish message to topic ' + topic);

	var envelope = {
			topic: topic
			, message: message
		};

	if(spark) {
		spark.write(envelope);
	} else {
		_primus.write(envelope);
	}
}

WebsocketServer.prototype.publish = publish;