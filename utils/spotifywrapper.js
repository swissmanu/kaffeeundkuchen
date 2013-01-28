'use strict';

var Log = require('../config/logger.js')
	,Util = require('util')
	,EventEmitter = require('events').EventEmitter;

/** Class: SpotifyWrapper
 * Wraps around the libspotify NodeJS module.
 *
 * This is thought as a singleton! Just use `require("util/spotifywrapper")` and
 * you are good to go :-)
 */
var SpotifyWrapper = function SpotifyWrapper() {
	var _self = this
		,_config = {}
		,_trackCache = {};

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
	 *     (Object) || undefined
	 */
	_self.getCachedTrack = function getCachedTrack(spotifyId) {
		var cachedTrack = undefined;

		if(_trackCache[spotifyId] !== undefined) {
			cachedTrack = _trackCache[spotifyId];
		}

		return cachedTrack;
	};

	_self.setConfig = function setConfig(config) {
		_config = config;
	}

};

Util.inherits(SpotifyWrapper, EventEmitter);

/* Singleton Stuff: */
SpotifyWrapper._instance = undefined;
SpotifyWrapper.getInstance = function getInstance() {
	if(this._instance === undefined) {
		this._instance = new SpotifyWrapper();
	}

	return this._instance;
}

module.exports = SpotifyWrapper.getInstance();