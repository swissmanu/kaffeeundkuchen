var debug = require('debug')('kaffeeundkuchen.websocket')
	, engine = require('engine.io');


function handleMessage(data) {
	debug('received websocket message');
	console.log(data);
}

function handleClose() {
	debug('closed websocket connection');
}

function handleNewConnection(socket) {
	debug('new websocket connection');
	socket.on('message', handleMessage);
	socket.on('close', handleClose);

	socket.send('hi there!');
}

/** Function: initWebSocket
 * Attaches the Engine.IO WebSocket abstraction to any passed httpServer
 * instance.
 *
 * Parameters:
 *     (http.Server) httpServer - Node.JS HTTP Server instance
 */
function initWebSocket(httpServer) {
	debug('inititialize websocket module');

	var websocketServer = engine.attach(httpServer);
	websocketServer.on('connection', handleNewConnection);
}

module.exports = initWebSocket;