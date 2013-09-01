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

var socket = new eio.Socket('ws://localhost:8080/');
socket.on('open', function() {
	socket.on('message', function(data) {
		console.log('got message! ' + data);
		socket.send(data); // echo
	});
	socket.on('close', function() {
		console.log('socket closed!');
	});
});