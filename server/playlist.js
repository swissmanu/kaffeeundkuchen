var Log = require('../config/logger.js')
	,Util = require('util')
	,EventEmitter = require('events').EventEmitter;

/** Class: Playlist
 *
 * Emitted events:
 *     added - Fired when a new track was added to this <Playlist>.
 *             Parameters: [(Object)newTrack]
 *     voted - Fired when the score of a track was changed by a vote.
 *             Parameters: [(Object)changedTrack]
 */
var Playlist = function Playlist(tracks) {
	var _self = this
		,_tracks = tracks || [];

	_self.getTracks = function getTracks() {
		return _tracks;
	};

	_self.addTrack = function addTrack(spotifyId, artist, track) {
		var newTrack = buildTrackData(spotifyId, artist, track);
		_tracks.push(newTrack);
		_self.emit('added', newTrack);
	};

	_self.voteTrackUp = function voteTrackUp(spotifyId) {
		Log.warn('Implement Playlist.voteTrackUp!');
		_self.emit('voted', spotifyId);
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

Util.inherits(Playlist, EventEmitter);

module.exports = Playlist;