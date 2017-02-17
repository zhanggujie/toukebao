angular.module('App')

.controller('BozhongCtrl', function($scope, $http,$state, tookerId,$ionicHistory,tuoke) {
	  $scope.history = function() {
			$ionicHistory.goBack();
		};
		 var url = tuoke.url ;
		 var token  = tuoke.token ;
		 
    //var token = '2d9497dca010411988c4682d4b7943a3' ;
   var tokerWareId = 1 ;
   var number = 7 ;
    $http({
            url: url +'web/toker/sowTarget.do?token='+token+'&tokerWareId='+tokerWareId+'&number='+number,
            method: 'GET'
        }).success(function (res) {
        console.log(res)
        $scope.items = res.data.tokerMemberList
        $scope.sowPrice = res.data.sowPrice
        $scope.totalPrice = res.data.totalPrice
        $scope.warePrice = res.data.warePrice
        }).error(function (res) {
            alert('系统繁忙，请稍后再试')
        });
        $scope.sow = function(){
        	 $state.go('')
        }
})