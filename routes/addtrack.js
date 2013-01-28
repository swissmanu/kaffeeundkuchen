'use strict';

var Log = require('../config/logger.js');

/** Route: AddTrack
 *
 */
module.exports = function AddTrack(config, playlist) {

	function handleRequest(req, res) {
		var input = req.body
			,responseData = {
				statusCode : 200
				,content : playlist.getTracks()
			};

		if(validateInput(input)) {
			Log.info('Add track', input);
			playlist.addTrack(input.spotifyId, '', '');
		} else {
			Log.warn('Invalid request to add track', input);
			responseData.statusCode = 400;
		}
		
		res.json(responseData.statusCode, responseData.content);
	}

	function validateInput(input) {
		var valid = (input !== undefined && input.spotifyId !== undefined);
		return valid;
	}

	return handleRequest;
};