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


	angular.module('kuk.controllers')
		.controller('NowPlayingController', NowPlayingController)
		.controller('PlaylistController', PlaylistController);
})();