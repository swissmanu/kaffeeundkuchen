function PlaylistController($scope, $routeParams) {

	$scope.tracks = [{
		title: 'Testtrack 1'
	}, {
		title: 'Testtrack 2'
	}];

	console.log($routeParams);

	//$scope.phoneId = $routeParams.phoneId;
}