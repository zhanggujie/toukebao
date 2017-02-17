angular.module('App')

    .controller('ZhuanhuanCtrl', function ($scope, $http, $state, $ionicPopup,tuoke,$ionicHistory) {
    	  var url = tuoke.url ;
    	  var token = tuoke.token;
    	  $scope.history = function() {
			$ionicHistory.goBack();
		};
        $http({
            url: url + 'web/toker/wealthCore.do?token='+ token,
            method: 'GET'
        }).success(function (res) {
            $scope.scoreValue = res.data.sumScoreValue
        }).error(function (res) {
            alert('系统繁忙，请稍后再试')
        })
        $scope.zhuanhuan = function () {
            var reg = /^[1-9][0-9]*0{4}$/;
            if ($scope.guiminum > $scope.scoreValue) {
                alert('闺蜜券数量不足，请重新输入')
            }
            else {
                if (!reg.test($scope.guiminum)) {
                    alert('请输入有效数字')
                }
                else {
                    var taxRevenue = $scope.guiminum*0.2
                    var price = $scope.guiminum*0.8
                    console.log(taxRevenue)
                    console.log(price)
                    $http({
                        url: url +'web/toker/scoreGive.do?token='+ token + '&scores='+$scope.guiminum+'&taxRevenue='+taxRevenue+'&price='+price,
                        method: 'GET'
                    }).success(function (res) {
                        console.log(res)
                        alert('提现成功')
                    }).error(function (res) {
                        alert('系统繁忙，请稍后再试')
                    })
                }
            }
        }
    })