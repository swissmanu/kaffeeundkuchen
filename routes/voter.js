'use strict';

module.exports = function Voter(config) {

	var handleRequest = function handleRequest(req, res) {
		var id = req.params.id;
		res.json(200, {'id': id});
	};

	return handleRequest;
};