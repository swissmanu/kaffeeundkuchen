var angular = require('./vendor/angular-shim.js');

(function() {

	function eatClick() {
		return function(scope, element, attrs) {
			element.bind('click', function(event) {
				event.preventDefault();
			});
		}
	}

	angular.module('kuk.directives')
		.directive('eatClick', eatClick)
})();