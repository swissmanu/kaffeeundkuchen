'use strict';

var Log = require('../config/logger.js')
	,Util = require('util')
	,EventEmitter = require('events').EventEmitter;

/** Class: SpotifyWrapper
 * Wraps around the libspotify NodeJS module.
 */
var SpotifyWrapper = function SpotifyWrapper(config) {
	var _self = this
		,_config = config || {};


	/** Method: searchTrack
	 * Searches for music tracks using the given search criteria (arist and
	 * track name).
	 *
	 * Parameters:
	 *     (String) artist - The performing artist
	 *     (String) track - Track name
	 *
	 * Returns:
	 *     (Array)
	 */
	_self.searchTrack = function searchTrack(artist, track) {
		Log.warn('Impelemnt SpotifyWrapper.searchTrack!');
		return [];
	};

	/** Method: getCachedTrack
	 * The SpotifyWrapper caches searched tracks internally using their IDs for
	 * building key/value pairs.
	 * This method returns a specific track identified by such an ID. If no
	 * track is available for the given ID, undefined is returned.
	 *
	 * Parameters:
	 *     (String) spotifyId - ID of the desired track information
	 * 
	 * Returns:
	 *     (Object)
	 */
	_self.getCachedTrack = function getCachedTrack(spotifyId) {
		Log.warn('Implement SpotifyWrapper.getCachedTrack!');
		return {};
	};
};

Util.inherits(SpotifyWrapper, EventEmitter);

module.exports = SpotifyWrapper;