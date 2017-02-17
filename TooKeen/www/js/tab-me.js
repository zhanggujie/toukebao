angular.module('App')
	.controller("meController", function($scope, $http,$state, $ionicHistory, $ionicLoading,tuoke) {
 
		  
		   var url = tuoke.url ;   
		   var token = tuoke.token ;
		   var type =  tuoke.type;
		$scope.history = function() {
			$ionicHistory.goBack();
		};
	
			
	})