describe('SpotifyWrapper', function() {
	var mock = require('../mocks/spotifywrapper');

	describe('ensureSpotifySession', function() {

		it('should create a session if not present yet', function(done) {
			var spotifyWrapper = new mock();
			spotifyWrapper.ensureSpotifySession(done);
		});

	});

});