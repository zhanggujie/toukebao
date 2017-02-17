angular.module('App')
	.controller("girlfriendsController", function($scope, $http, $state, $ionicHistory, $ionicLoading, tuoke, $stateParams) {
		tuoke.url = 'http://115.28.21.7:8060/';
//				  tuoke.url = 'http://192.168.100.233:8081/';
		//		 tuoke.url = 'http://www.51meiy.com:8999/'
		tuoke.token = '3a22e5edb9c44fa897e99230ee12b658';
		tuoke.type = '1';
		var url = tuoke.url; //3a22e5edb9c44fa897e99230ee12b658
		var token = tuoke.token;
		var type = tuoke.type;
		$scope.history = function() {
			$ionicHistory.goBack();
		};
		$scope.friends = {
			consumption: '0.00',
			earnings: '0.00',
			choice: '你还没有购买闺蜜商品',
			prerogative: '还不能享受“满7送12”的闺蜜特权',
			buy: '立即购买',
		};

		$ionicLoading.show();
		$http.get(url + "web/toker/wealthCore.do?token=" + token)
			.then(function(res) {
				console.log(res)
				if(res.data.code == 200) {
					$scope.tabs = res.data.data.tab;
					for(var i = 0; i < $scope.tabs.length; i++) {
						if($scope.tabs[i].name == '采购详情') {
							$scope.tabs.splice(i, 1);
						}
					}
					$scope.date = new Date().getDate();
					if($scope.date == 5 || $scope.date == 15 || $scope.date == 20) {
					} else {
						$scope.tabs.pop($scope.tabs[$scope.tabs.length - 1])
					}
					$scope.friends = {
						consumption: res.data.data.sumPrice,
						earnings: res.data.data.sumScoreValue,
						choice: res.data.data.timesMap.timesStr,
						prerogative: res.data.data.timesMap.alertStr,
						buy: res.data.data.timesMap.btnStr,
					}
				}

			})
			.catch(function() {

			})
			.finally(function() {
				$ionicLoading.hide();
			});
		$scope.jump = function(tab_type) {
			if(tab_type == 'WDDD') {
				$state.go('indent') // 我的订单
			} else if(tab_type == 'WDSY') {
				$state.go('guimiquan') // 闺蜜圈
			} else if(tab_type == 'YBSY') {
				$state.go('mx') // 闺蜜券明细
			} else if(tab_type == 'TGEWM') {
				$state.go('code') // 我的二维码
			} else if(tab_type == 'CFJS') {
				$state.go('tuokeshouye') // 闺蜜圈介绍
			} else if(tab_type == 'SPXQ') {
				$state.go('dashang') // 拓客商品
			} else if(tab_type == 'CGXQ') {
				$state.go('') // 采购详情
			} else if(tab_type == 'LVZSSP') {
				$state.go('girlfriend') // 闺蜜特权
			}
		}
		$scope.go = function() {
			$state.go('dashang') // 购买

		}

	})