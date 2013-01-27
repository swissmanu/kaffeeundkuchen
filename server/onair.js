module.exports = function OnAir(config) {
	return function(req, res) {
		res.json(200, {'onair': 'onair'});
	}
};