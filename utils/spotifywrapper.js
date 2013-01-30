'use strict';

var Log = require('../config/logger.js')
	,Util = require('util')
	,EventEmitter = require('events').EventEmitter
	,spotify = require('libspotify');


var _self = this
	,_config = {}
	,_trackCache = {}
	,_spotify_session = undefined;

/** Class: SpotifyWrapper
 * Wraps around the libspotify NodeJS module.
 *
 * This is thought as a singleton! Just use `require("util/spotifywrapper")` and
 * you are good to go :-)
 */
var SpotifyWrapper = function SpotifyWrapper(config) {
	EventEmitter.call(this);

	_config = config;
};
Util.inherits(SpotifyWrapper, EventEmitter);

module.exports = SpotifyWrapper;



/** Method: searchTrack
 * Searches for music tracks using the given search criteria (arist and/or
 * track name).
 * If no Spotify session exists, a new one gets created. If the session was
 * not logged in before, login is executed automatically before the search
 * gets executed.
 *
 * Parameters:
 *     (String) artist - The performing artist
 *     (String) track - Track name
 *     (Function) callback - Executed after the search was finished
 *                           Parameters: [(Array)tracks]
 */
SpotifyWrapper.prototype.searchTrack = function searchTrack(artist, track, callback) {
	if(_spotify_session == undefined) {
		_spotify_session = new spotify.Session({
			applicationKey: __dirname + '/../' + _config.spotify.appKeyFile
		});
	}

	if(!_spotify_session.isLoggedIn()) {
		_spotify_session.login(
			_config.spotify.username
			,_config.spotify.password
		);

		_spotify_session.once('login', function(err) {
			if(err) {
				Log.error('Spotify login failed!', err);
				callback([]);
			} else {
				Log.info('Spotify login successful');
				_searchTrack(artist, track, callback);
			}
			
		});
	} else {
		_searchTrack(artist, track, callback);
	}
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
SpotifyWrapper.prototype.getCachedTrack = function getCachedTrack(spotifyId) {
	var cachedTrack = undefined;
	
	if(_trackCache[spotifyId] !== undefined) {
		cachedTrack = _trackCache[spotifyId];
	}

	return cachedTrack;
};


/** PrivateMethod: _searchTrack
 * 
 * Parameters:
 *     (String) artist - optional, at least one of them
 *     (String) track - optional, at least one of them
 *     (Function) callback - Called as soon as search results are available.
 *                           Parameters: [(Array)tracks]
 */
var _searchTrack = function searchTrack(artist, track, callback) {
	var queryData = {
			artist: artist
			,track: track
		}
		,queryString = _buildQueryString(queryData)
		,search = new spotify.Search(queryString);
	
	search.trackCount = _config.spotify.maxResults;
	search.execute();
	search.on('ready', function() {
		var preparedTracks = _prepareSpotifyTracks(search.tracks);
		callback(preparedTracks);
		
		preparedTracks.forEach(function(preparedTrack) {
			_trackCache[preparedTrack.spotifyId] = preparedTrack;
		});
	});
};

/** PrivateFunction: _buildQueryString
 * Takes an object literal and builds a Spotify query string with it.
 *
 * Parameters:
 *     (Object) queryData - { artist : 'xy', track: undefined }
 *
 * Returns:
 *     (String) Spotify Query String, using the parameter example above:
 *              'artist: "xy"'
 */
var _buildQueryString = function buildQueryString(queryData) {
	var queryString = '';

	for(var key in queryData) {
		if(queryData[key] !== undefined) {
			queryString += key + ':"' + queryData[key] + '" ';
		}
	}

	return queryString;
}

/** PrivateFunction: _prepareSpotifyTracks
 * Takes an Array with Spotify Track information and reformats it for
 * KaffeeUndKuchen.
 *
 * Paramaters:
 *     (Array) spotifyTracks
 *
 * Returns:
 *     (Array)
 */
var _prepareSpotifyTracks = function prepareSpotifyTracks(spotifyTracks) {
	var preparedTracks = [];

	spotifyTracks.forEach(function(spotifyTrack) {
		preparedTracks.push({
			artist: spotifyTrack.artist.name
			,track: spotifyTrack.name
			,spotifyId: spotifyTrack.getUrl().replace(/:/g,'-')
		});
	});

	return preparedTracks;
}