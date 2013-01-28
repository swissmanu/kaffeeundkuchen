'use strict';

var Log = require('../config/logger.js');

module.exports = function OnAir(config, playlist) {

	var handleRequest = function handleRequest(req, res) {
		var input = req.body
			,responseData = {
				statusCode : 200
				,content : playlist.getTracks()
			};
		
		res.json(responseData.statusCode, responseData.content);
	}

	return handleRequest;
};