var debug = require('debug')('kaffeeundkuchen.model.playlist')
	, Util = require('util')
	, EventEmitter = require('events').EventEmitter;

/** Class: Playlist
 *
 * Emitted events:
 *     added - Fired when a new track was added to this <Playlist>.
 *             Parameters: [(Object)newTrack]
 *     voted - Fired when the score of a track was changed by a vote.
 *             Parameters: [(Object)changedTrack]
 */
var Playlist = function Playlist(initialTracks) {
	var self = this
		, tracks = initialTracks || [];

	self.getTracks = function getTracks() {
		return tracks;
	};

	self.addTrack = function addTrack(spotifyId, artist, track) {
		var newTrack = buildTrackData(spotifyId, artist, track);
		tracks.push(newTrack);
		self.emit('added', newTrack);
	};

	self.voteTrackUp = function voteTrackUp(spotifyId) {
		debug('Implement Playlist.voteTrackUp!');
		self.emit('voted', spotifyId);
	};


	function buildTrackData(spotifyId, artist, track) {
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