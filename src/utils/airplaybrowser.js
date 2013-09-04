var debug = require('debug')('kaffeeundkuchen.utils.airplaybrowser')
	, mdns = require('mdns2')
	, airPlayService = 'raop'
	, browser
	, airplayTargets = {};


function handleServiceUp(service) {
	debug('new airplay target discovered');

	var airplayTarget = {
		name: service.name
		, host: service.host
		, address: service.addresses[0]  // we pick IPv4
		, port: service.port
	};

	airplayTargets[airplayTarget.name] = airplayTarget;
}

function handleServiceDown(service) {
	debug('airplay target disappeared');

	var name = service.name;
	delete airplayTargets[name];
}

function start() {
	debug('start airplay browser');

	if(!browser) {
		browser = mdns.createBrowser(mdns.tcp(airPlayService));
		browser.on('serviceUp', handleServiceUp);
		browser.on('serviceDown', handleServiceDown);
	}

	airplayTargets = {};
	browser.start();
}

function stop() {
	debug('stop airplay browser');

	browser.stop();
}

function getAvailableAirplayTargets() {
	debug('get available airplay targets');

	return airplayTargets;
}


module.exports = {
	start: start
	, stop: stop
	, getAvailableAirplayTargets: getAvailableAirplayTargets
};