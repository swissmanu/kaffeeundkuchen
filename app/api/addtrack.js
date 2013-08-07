'use strict';

var debug = require('debug')('kaffeeundkuchen.api.addtrack');

/** Route: AddTrack
 *
 */
module.exports = function AddTrack(config, spotifyWrapper, playlist) {

	var handleRequest = function handleRequest(req, res) {
		debug('handle request');

		var input = req.body
			,responseData = {
				statusCode : 200
				,content : {}
			};

		debug('Route: AddTrack');

		if(validateInput(input)) {
			var spotifyTrack = spotifyWrapper.getCachedTrack(input.spotifyId);
			if(spotifyTrack === undefined) {
				debug('Track not found in cache. Probably not searched before?', {spotifyId: input.spotifyId});
				responseData.statusCode = 400;
			} else {
				playlist.addTrack(
					spotifyTrack.spotifyId
					,spotifyTrack.artist
					,spotifyTrack.track
				);
			}
		} else {
			debug('Invalid request to add track', input);
			responseData.statusCode = 400;
		}

		res.json(responseData.statusCode, responseData.content);
	}

	var validateInput = function validateInput(input) {
		var valid = (input !== undefined && input.spotifyId !== undefined);
		return valid;
	}

	return handleRequest;
};