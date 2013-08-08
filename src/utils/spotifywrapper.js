var debug = require('debug')('kaffeeundkuchen.utils.spotifywrapper')
	, Util = require('util')
	, EventEmitter = require('events').EventEmitter
	, spotify = require('libspotify')
	, _config
	, _trackCache = {}
	, _spotifySession;


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



function getSpotifyInstance() {
	return spotify;
}

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
function buildQueryString(queryData) {
	debug('build query string');

	var queryString = '';

	for(var key in queryData) {
		if(queryData[key] !== undefined) {
			queryString += key + ':"' + queryData[key] + '" ';
		}
	}

	return queryString;
}


function extractTrackInformation(spotifyTrack) {
	var artist = spotifyTrack.artist.name
		, track = spotifyTrack.name
		, spotifyId = spotifyTrack.getUrl().replace(/:/g, '-');

	return {
		artist: artist
		, track: track
		, spotifyId: spotifyId
	};
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
function prepareSpotifyTracks(spotifyTracks) {
	var preparedTracks = [];

	spotifyTracks.forEach(function(spotifyTrack) {
		preparedTracks.push(extractTrackInformation(spotifyTrack));
	});

	return preparedTracks;
}





function playTrack(/*track*/) {
	/*
	this.ensureSpotifySession(function onSession(/*session*) {
		/*var player = session.getPlayer()
			, cachedSpotifyTrack = _trackCache[track.spotifyId];

		player.load(track)*
	});
	*/
}

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
 *     (Function) onSuccess - Executed after the search was finished
 *                           Parameters: [(Array)tracks]
 *     (Function) onError - Executed after the search was finished
 *                          Parameters: [(Error)error]
 */
function searchTrack(artist, track, onSuccess, onError) {
	var self = this;

	self.ensureSpotifySession(function onSession() {
		var queryData = {
				artist: artist
				, track: track
			}
			, queryString = buildQueryString(queryData)
			, search = new spotify.Search(queryString);

		search.trackCount = _config.spotify.maxResults;

		search.on('ready', function() {
			debug('search results ready');

			var preparedTracks = prepareSpotifyTracks(search.tracks);
			onSuccess(preparedTracks);

			search.tracks.forEach(function(spotifyTrack) {
				var spotifyId = spotifyTrack.getUrl().replace(/:/g, '-');
				_trackCache[spotifyId] = spotifyTrack;
			});
		});

		search.on('error', function(error) {
			if(onError) {
				onError(error);
			}
		});

		search.execute();

	});
}

function ensureSpotifySession(onSession, onError) {
	debug('ensure spotify session is valid');

	if(_spotifySession === undefined) {
		debug('create new spotify session');

		_spotifySession = new spotify.Session({
			applicationKey: __dirname + '/../' + _config.spotify.appKeyFile
		});
	}

	if(!_spotifySession.isLoggedIn()) {
		debug('try logging in');

		_spotifySession.login(
			_config.spotify.username
			,_config.spotify.password
		);

		_spotifySession.once('login', function(err) {
			if(err) {
				debug('Spotify login failed');
				if(onError) {
					onError();
				}
			} else {
				debug('Spotify login successful');
				if(onSession) {
					onSession(_spotifySession);
				}
			}
		});
	} else {
		if(onSession) {
			onSession(_spotifySession);
		}
	}
}

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
function getCachedTrack(spotifyId) {
	debug('get cached track');

	var cachedTrack;

	if(_trackCache[spotifyId] !== undefined) {
		cachedTrack = _trackCache[spotifyId];
	}

	return cachedTrack;
}

SpotifyWrapper.prototype.playTrack = playTrack;
SpotifyWrapper.prototype.searchTrack = searchTrack;
SpotifyWrapper.prototype.ensureSpotifySession = ensureSpotifySession;
SpotifyWrapper.prototype.getCachedTrack = getCachedTrack;
SpotifyWrapper.prototype.getSpotifyInstance = getSpotifyInstance;