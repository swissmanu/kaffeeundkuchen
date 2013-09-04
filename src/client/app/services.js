var angular = require('./vendor/angular-shim.js');

(function() {

	function TrackSearchService($http) {
		var instance = {
			search: function search(query) {
				var promise = $http({
					method: 'POST'
					, url: 'http://192.168.5.31:8080/api/search'
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

	angular.module('kuk.services')
		.factory('trackSearchService', ['$http', TrackSearchService]);

})();