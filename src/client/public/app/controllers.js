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

	function SearchController($scope/*, $routeParams*/) {
		$scope.txtSearch = '';
		$scope.searchResults = [];

		$scope.onBtnSearchClick = function onBtnSearchClick() {
			console.log('search ' + $scope.txtSearch);

			$scope.searchResults = [{
				'title': 'VCR'
				, 'artist': 'The xx'
			}];
		};
	}
	SearchController.$inject = ['$scope'];

	angular.module('kuk.controllers')
		.controller('NowPlayingController', NowPlayingController)
		.controller('PlaylistController', PlaylistController)
		.controller('SearchController', SearchController);
})();