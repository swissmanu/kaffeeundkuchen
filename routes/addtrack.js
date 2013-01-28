'use strict';

var Log = require('../config/logger.js')
	,spotifyWrapper = require('../utils/spotifyWrapper');

/** Route: AddTrack
 *
 */
module.exports = function AddTrack(config, playlist) {

	var handleRequest = function handleRequest(req, res) {
		var input = req.body
			,responseData = {
				statusCode : 200
				,content : playlist.getTracks()
			};

		Log.info('Route: AddTrack');

		if(validateInput(input)) {
			var spotifyTrack = spotifyWrapper.getCachedTrack(input.spotifyId);
			if(spotifyTrack === undefined) {
				Log.warn('Track not found in cache. Probably not searched before?', {spotifyId: input.spotifyId});
				responseData.statusCode = 400;
			} else {
				playlist.addTrack(
					spotifyTrack.spotifyId
					,spotifyTrack.artist
					,spotifyTrack.track
				);
			}
		} else {
			Log.warn('Invalid request to add track', input);
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