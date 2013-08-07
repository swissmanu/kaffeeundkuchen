var chai = require('chai')
	, appPath;
chai.should();

if(process.env.KAFFEEUNDKUCHEN_COVERAGE) {
	appPath = '../src-cov';
} else {
	appPath = '../src';
}
global.appPath = appPath;

global.requireAppFile = function(module) {
	return require(appPath + '/' + module);
}
