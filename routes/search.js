'use strict';

var Log = require('../config/logger.js');

var Search = function Search(config, spotifyWrapper) {
	var _self = this
		,_dummySearchResult = [{
			spotifyid:'akjsdfhaslöhalsjgladfjgldjg834r'
			,artist:'Hans Zimmer'
			,track:'Dream is Collapsing'
		}];

	var handleRequest = function handleRequest(req, res) {
		var input = req.body
			,responseData = {
				statusCode : 200
				,content : {}
			};

		Log.info('Route: Search');

		if(validateInput(input)) {
			var tracks = spotifyWrapper.searchTrack(input.artist, input.track, function(tracks) {
				res.json(200, tracks);
			});			
		} else {
			Log.warn('Invalid Search request', input)
			responseData.statusCode = 400; // Bad Request
			res.json(responseData.statusCode, responseData.content);
		}
	};

	var validateInput = function validateInput(input) {
		var valid = (input.artist !== undefined) || (input.track !== undefined);
		return valid;
	};

	return handleRequest;
};

module.exports = Search;