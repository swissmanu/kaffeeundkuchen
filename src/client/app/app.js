(function() {
	angular.module('kuk.controllers', []);
	angular.module('kuk.services', []);
	angular.module('kuk', ['kuk.controllers', 'kuk.services']);

	var app = angular.module('kuk');

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/playlist', {
			templateUrl: 'views/playlist.html'
			, controller: 'PlaylistController'
		})
		.otherwise({ redirectTo: '/playlist' });
	}]);

})();

