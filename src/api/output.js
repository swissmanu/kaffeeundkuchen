

function handleGetAvailableOutputs(req, res) {
	var airplayBrowser = req.app.get('airplayBrowser')
		, availableOutputs = airplayBrowser.getAvailableAirplayTargets();

	res.json(availableOutputs);
}

function handleGetCurrentOutput(req, res) {

}

function handleSetOutput(req, res) {

}


module.exports = {
	availableOutputs: handleGetAvailableOutputs
	, currentOutput: handleGetCurrentOutput
	, setOutput: handleSetOutput
};