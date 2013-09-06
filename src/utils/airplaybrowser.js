var debug = require('debug')('kaffeeundkuchen.utils.airplaybrowser')
	, util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mdns = require('mdns2')
	, airplayServiceName = 'raop'

	, _browser
	, _airplayTargets = {};


/** Class: AirplayBrowser
 *
 */
var AirplayBrowser = function AirplayBrowser() {
	EventEmitter.call(this);
};
util.inherits(AirplayBrowser, EventEmitter);

module.exports = AirplayBrowser;


function handleServiceUp(service) {
	debug('new airplay target discovered');

	console.log(service);

	var airplayTarget = {
		name: service.name
		, host: service.host
		, address: service.addresses[0]  // we pick IPv4
		, port: service.port
	};

	_airplayTargets[airplayTarget.name] = airplayTarget;
	this.emit('discovered', airplayTarget);
}

function handleServiceDown(service) {
	debug('airplay target disappeared');

	var name = service.name;
	delete _airplayTargets[name];

	this.emit('disappeared', name);
}

function start() {
	debug('start airplay browser');

	if(!_browser) {
		_browser = mdns.createBrowser(mdns.tcp(airplayServiceName));
		_browser.on('serviceUp', handleServiceUp.bind(this));
		_browser.on('serviceDown', handleServiceDown.bind(this));
	}

	_airplayTargets = {};
	_browser.start();
	this.emit('started');
}

function stop() {
	debug('stop airplay browser');

	_browser.stop();
	this.emit('stopped');
}

function getAvailableAirplayTargets() {
	debug('get available airplay targets');

	return _airplayTargets;
}


AirplayBrowser.prototype.start = start;
AirplayBrowser.prototype.stop = stop;
AirplayBrowser.prototype.getAvailableAirplayTargets =
	getAvailableAirplayTargets;