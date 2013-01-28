module.exports = function Voter(config) {
	return function(req, res) {
		var id = req.params.id;
		res.json(200, {'id': id});
	}
};