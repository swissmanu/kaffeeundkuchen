var angular = require('./vendor/angular-shim.js');

(function() {

	function TrackSearchService($http) {
		var instance = {
			search: function search(query) {
				var promise = $http({
					method: 'POST'
					, url: 'http://localhost:8080/api/search'
					, data: query
				})
				.then(function(response) {
					// Ensure the TrackSearchService only responds with the
					// track information we are interested into.
					return response.data;
				});

				return promise;
			}
		};

		return instance;
	}

	function PlayerService($http) {
		var instance = {
			play: function play(spotifyId) {
				var promise = $http({
					method: 'GET'
					, url: 'http://localhost:8080/api/player/play/' + spotifyId
				})
				.then(function(response) {
					var success = response.data.success || false;
					return success;
				});

				return promise;
			}
		};

		return instance;
	}

	angular.module('kuk.services')
		.factory('trackSearchService', ['$http', TrackSearchService])
		.factory('playerService', ['$http', PlayerService]);

})();