var angular = require('./vendor/angular-shim.js');

(function() {
	angular.module('kuk.controllers', []);
	angular.module('kuk.services', []);
	angular.module('kuk.directives', []);
	angular.module('kuk', [
		'kuk.controllers'
		, 'kuk.services'
		, 'kuk.directives'
		, 'ngRoute'
	]);

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
			.when('/search', {
				templateUrl: 'partials/search.html'
				, controller: 'SearchController'
			})
			.when('/settings', {
				templateUrl: 'partials/settings.html'
				//, controller: 'SearchController'
			})
			.otherwise({ redirectTo: '/' });

			$locationProvider.html5Mode(true);
		}
	]);

})();