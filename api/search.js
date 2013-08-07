'use strict';

var debug = require('debug')('kaffeeundkuchen.api.search')

var Search = function Search(config, spotifyWrapper) {
	var _self = this
		,_dummySearchResult = [{
			spotifyid:'akjsdfhaslöhalsjgladfjgldjg834r'
			,artist:'Hans Zimmer'
			,track:'Dream is Collapsing'
		}];

	var handleRequest = function handleRequest(req, res) {
		debug('handle request');

		var input = req.body
			,responseData = {
				statusCode : 200
				,content : {}
			};

		if(validateInput(input)) {
			var tracks = spotifyWrapper.searchTrack(input.artist, input.track, function(tracks) {
				res.json(200, tracks);
			});
		} else {
			debug('Invalid Search request', input)
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