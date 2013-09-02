var angular = require('./vendor/angular-shim.js');

(function() {

	function NowPlayingController(/*$scope, $routeParams*/) {

	}
	NowPlayingController.$inject = ['$scope'];

	function PlaylistController($scope) {
		$scope.tracks = [{
			title: 'Testtrack 1'
		}, {
			title: 'Testtrack 2'
		}];

	}
	PlaylistController.$inject = ['$scope'];

	function SearchController($scope, trackSearchService) {
		$scope.searchResults = [];

		$scope.onBtnSearchClick = function onBtnSearchClick() {
			var query = {
				artist: $scope.txtArtist
				, track: $scope.txtTrack
			};

			trackSearchService.search(query)
			.then(function foundTracks(tracks) {
				$scope.searchResults = tracks;
			});
		};
	}
	SearchController.$inject = ['$scope', 'trackSearchService'];

	angular.module('kuk.controllers')
		.controller('NowPlayingController', NowPlayingController)
		.controller('PlaylistController', PlaylistController)
		.controller('SearchController', SearchController);
})();