var Log = require('../config/logger.js');

module.exports = function Search(config) {
	var dummySearchResult = [{
		spotifyid:'akjsdfhaslöhalsjgladfjgldjg834r'
		,artist:'Hans Zimmer'
		,track:'Dream is Collapsing'
	}];

	function handleRequest(req, res) {
		var input = req.body
			,responseData = {
				statusCode : 200
				,content : {}
			};

		if(validateInput(input)) {
			Log.info('Handling Search request', input);
			
			// do spotify magic
			responseData.content = dummySearchResult;
		} else {
			Log.warn('Invalid Search request', input)
			responseData.statusCode = 400; // Bad Request
		}
		
		res.json(responseData.statusCode, responseData.content);
	}

	function validateInput(input) {
		var valid = (input.artist !== undefined) || (input.track !== undefined);
		return valid;
	}

	return handleRequest;
};