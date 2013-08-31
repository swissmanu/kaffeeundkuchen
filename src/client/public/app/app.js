(function() {
	angular.module('kuk.controllers', []);
	angular.module('kuk.services', []);
	angular.module('kuk', ['kuk.controllers', 'kuk.services']);

	var app = angular.module('kuk');

	app.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.when('/', {
				templateUrl: 'partials/nowplaying.html'
				, controller: 'NowPlayingController'
			})
			.when('/playlist', {
				templateUrl: 'partials/playlist.html'
				, controller: 'PlaylistController'
			})
			.otherwise({ redirectTo: '/' });

			$locationProvider.html5Mode(true);
		}
	]);

})();

