var chai = require('chai')
	, appPath;
chai.should();

if(process.env.KAFFEEUNDKUCHEN_COVERAGE) {
	appPath = '../lib-cov';
} else {
	appPath = '../lib';
}
global.appPath = appPath;

global.requireAppFile = function(module) {
	return require(appPath + '/' + module);
}