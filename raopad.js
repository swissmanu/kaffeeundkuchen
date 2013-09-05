var mdns = require('mdns2');
var ad = mdns.createAdvertisement(mdns.tcp('raop'), 4321);
ad.start();