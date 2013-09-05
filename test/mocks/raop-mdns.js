
var mdns = require('mdns2')
	, ad;

function start() {
	ad = mdns.createAdvertisement(mdns.tcp('raop'), 4321);
	ad.start();
}

function stop() {
	ad.stop();
}

module.exports = {
	start: start
	, stop: stop
};