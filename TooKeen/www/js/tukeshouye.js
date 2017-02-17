angular.module('App')
	.controller('Tuokeshouye', function($scope,$http,$ionicHistory) {
		$scope.history = function() {
			$ionicHistory.goBack();
		};
	})