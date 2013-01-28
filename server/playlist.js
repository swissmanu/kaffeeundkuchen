var Log = require('../config/logger.js');

var Playlist = function Playlist(tracks) {
	var _self = this
		,_tracks = tracks || [];

	_self.getTracks = function getTracks() {
		return _tracks;
	};

	_self.addTrack = function addTrack(spotifyId, artist, track) {
		_tracks.push(buildTrackData(spotifyId, artist, track));
	};

	_self.voteTrackUp = function voteTrackUp(spotifyId) {
		Log.warn('Implement Playlist.voteTrackUp!');
	};


	var buildTrackData = function buildTrackData(spotifyId, artist, track) {
		return {
			spotifyId: spotifyId
			,artist: artist
			,track: track
			,score: 0
		};
	}

};

module.exports = Playlist;