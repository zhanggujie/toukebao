angular.module('App')

	.controller('ZengsongCtrl', function ($scope, $http, $state, $ionicPopup,$ionicHistory,tuoke) {
		 var url = tuoke.url ;
		 var token = tuoke.token ;
		 $scope.history = function() {
			$ionicHistory.goBack();
		};
		$scope.cash = function () {
			$state.go('zhuanhuan')
		}
		var number = ''
		$scope.nums = ''
		$scope.give = function (userId) {
			$scope.nums = ''
			var reg = /^\d+$/;
			var myPopup = $ionicPopup.show({
				title: '赠送金额',
				template: '<input type="number" style="padding-left:0.6rem" ng-model="$parent.nums" placeholder="最多赠送' + number + '">',
				scope: $scope,
				buttons: [{
					text: '取消'
				}, {
						text: '确认',
						type: 'button-positive',
						onTap: function (e) {
							if ($scope.nums == '') {
								alert('请输入赠送数量')
								e.preventDefault();
							} else {
								if (!reg.test($scope.nums)) {
									alert('请输入有效数字')
									e.preventDefault();
								}
								else {
									if ($scope.nums > number) {
										alert("最多赠送"+number)
										e.preventDefault();
									}
									else {
										console.log(userId)
										console.log($scope.nums)
										$http({
											url: url + "web/toker/scoreGive.do?token="+ token + "&partyId="+userId+"&scores="+$scope.nums,
											method: 'GET',
										}).success(function (res) {
											if (res.code == 200) {
												alert(res.data.data)
											} else {
												alert(res.data.error)
											}
										}).error(function (error) {
											alert('系统繁忙，请稍后再试')
										});
									}
								}
							}
						}
					}]
			});
		}
		$scope.Search = function () {
			userName = $scope.username
			$http({
				url: url + 'web/toker/searchMember.do?',
				method: 'POST',
				data: {
					token: token,
					userName: userName
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				transformRequest: function (obj) {
					var str = [];
					for (var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");
				}
			}).success(function (res) {
				if (res.code == 200) {
					console.log(res)
					$scope.items = res.data.list
					number = res.data.scoreMax
				} else {
					alert('输入信息无效，请重新输入')
				}
			}).error(function (error) {
				alert('系统繁忙，请稍后再试')
			});
		}
	})