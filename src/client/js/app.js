angular.module('kaffeeundkuchen', []).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/playlist', {
			templateUrl: 'js/partials/playlist.html'
			, controller: PlaylistController
		})
		.otherwise({ redirectTo: '/playlist' });
	}]);