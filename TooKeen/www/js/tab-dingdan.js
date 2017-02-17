angular.module('App')

    .controller('DingdanCtrl', function ($scope, $http,$ionicHistory,tuoke) {
    	 var url = tuoke.url;
    	 var token = tuoke.token;
    	 $scope.history = function() {
			$ionicHistory.goBack();
		};
        $scope.isHl = true
        $scope.sy = true
        $scope.isCash = false
        $scope.isZs = false
        $scope.cash = false
        $scope.zs = false
        $scope.symx = function () {
            $scope.isHl = true
            $scope.sy = true
            $scope.isCash = false
            $scope.isZs = false
            $scope.cash = false
            $scope.zs = false
        }
        $scope.cash = function () {
            $scope.isHl = false
            $scope.sy = false
            $scope.isCash = true
            $scope.isZs = false
            $scope.cash = true
            $scope.zs = false
        }
        $scope.zsmx = function () {
            $scope.isHl = false
            $scope.sy = false
            $scope.isCash = false
            $scope.isZs = true
            $scope.cash = false
            $scope.zs = true
        }
        $http({
            url: url + 'web/toker/dividendYield.do?token=' + type,
            method: 'GET'
        }).success(function (res) {
            console.log(res)
            $scope.sumScoreValue = res.data.sumScoreValue
            $scope.cashList = res.data.cashList
            $scope.yielditems = res.data.yieldList
            $scope.giveList = res.data.giveList
        }).error(function (res) {
            alert('系统繁忙，请稍后再试')
        });
    })
