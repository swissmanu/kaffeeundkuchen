module.exports = function voter(callback) {
	return function(req, res) {
		res.json(200, {'onair': 'onair'});
	}
};