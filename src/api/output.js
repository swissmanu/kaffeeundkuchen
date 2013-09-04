

function handleGetAvailableOutputs(req, res) {
	var airplayBrowser = req.app.get('airplayBrowser')
		, availableOutputs = airplayBrowser.getAvailableAirplayTargets();

	res.json(availableOutputs);
}

function handleGetCurrentOutput(req, res) {
	res.json({});
}

function handleSetOutput(req, res) {
	res.json({});
}


module.exports = {
	availableOutputs: handleGetAvailableOutputs
	, currentOutput: handleGetCurrentOutput
	, setOutput: handleSetOutput
};