var angular = require('./vendor/angular-shim.js');

(function() {

	function NowPlayingController($scope, websocketService) {
		websocketService.subscribe('playerstatus', function(data) {
			console.log(data);
		});

		//websocketService.publish('*', 'hi there!');
	}
	NowPlayingController.$inject = ['$scope', 'websocketService'];

	function PlaylistController($scope) {
		$scope.tracks = [{
			track: 'Testtrack 1'
			, artist: 'Artist 1'
			, spotifyId: 'spotify-track-4pYlJsKrPbc1Vy6OExIxZx'
		}, {
			track: 'Testtrack 2'
			, artist: 'Artist 2'
			, spotifyId: 'spotify-track-5c7jkZ4daUcLIrKiyQGt8B'
		}];

	}
	PlaylistController.$inject = ['$scope'];

	function SearchController($scope, trackSearchService, playerService) {
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

		$scope.onBtnPlayClick = function onBtnPlayClick(track) {
			playerService.play(track.spotifyId)
			.then(function(success) {
				console.log('success? ' + success);
			});
		};
	}
	SearchController.$inject = [
		'$scope'
		, 'trackSearchService'
		, 'playerService'
	];

	angular.module('kuk.controllers')
		.controller('NowPlayingController', NowPlayingController)
		.controller('PlaylistController', PlaylistController)
		.controller('SearchController', SearchController);
})();