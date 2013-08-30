(function() {

	var PlaylistController = function PlaylistController($scope, $routeParams) {
		$scope.tracks = [{
			title: 'Testtrack 1'
		}, {
			title: 'Testtrack 2'
		}];

		console.log($routeParams);
	};

	PlaylistController.$inject = ['$scope'];

	angular.module('kuk.controllers').controller('PlaylistController', PlaylistController);

})();