var SpotifyWrapper = requireAppFile('utils').SpotifyWrapper
	, Util = require('util')
	, Mock;

Mock = function SpotifyWrapperMock(config) {
	SpotifyWrapper.apply(this, arguments);
};
Util.inherits(Mock, SpotifyWrapper);


function getSpotifyInstance() {
	console.log('bla!');
	return {};
}

Mock.prototype.getSpotifyInstance = getSpotifyInstance;

console.log(new Mock());

module.exports = Mock;