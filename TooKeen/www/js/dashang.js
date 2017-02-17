angular.module('App')

.controller('DashangCtrl', function($scope, $http, tookerId, $state, $ionicHistory, tuoke, $timeout, $ionicLoading) {
	var url = tuoke.url;
	var token = tuoke.token;
	$scope.history = function() {
		$ionicHistory.goBack();
	};
	console.log(tookerId.indents)
	var img1 = document.getElementById('img1')
	var img2 = document.getElementById('img2')
	$scope.set = {
		number: 7
	}
	$scope.down = function() {
		if($scope.set.number == 7) {
			img2.style.display = 'inline-block'
		}
		$scope.set.number--
			if($scope.set.number == 0) {
				img1.style.visibility = 'hidden'
			}
	}
	$scope.up = function() {
		if($scope.set.number == 6) {
			$scope.set.number++
				img2.style.display = 'none'
		} else {
			img1.style.visibility = ''
			$scope.set.number++
		}
	};
	$http.get(url + 'web/tkItemDetails.do?token=' + token)
		.then(function(res) {
			console.log(res)
			if(res.data.code == 200) {
				$scope.yulans = res.data.data.item;
			} else {
				alert(res.data.data.error)
			}
		})
		.catch(function() {

		})
		.finally(function() {
			$ionicLoading.hide();
		})

	$http({
		url: url + 'web/toker/tokerWareGoDetails.do?token=' + token,
		method: 'GET'
	}).success(function(res) {
		console.log(res)
		$scope.tokerId = res.data.map.tokerId;
		$scope.tokerWareId = res.data.map.toker.tokerWareId;
		$scope.superiorId = res.data.map.superiorId;
	}).error(function(res) {
		alert('系统繁忙，请稍后再试...')
	});

	$timeout(function() {
	$ionicLoading.show();
		
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			console.log(fromState.url)
			if(fromState.url == '/indent') {
				$scope.tokerId = tookerId.indents.tokerId;
				$scope.tokerWareId = tookerId.indents.tkTokerWareId;

			} else {}
		});
		$http({
			url: url + 'web/toker/findWareDetails.do?tokerId=' + $scope.tokerId + '&tokerWareId=' + $scope.tokerWareId,
			method: 'GET'
		}).success(function(res) {
			console.log(res)
			$scope.mainImgUrl = res.data.tokerWare.mainImgUrl
			$scope.name = res.data.tokerWare.name
			$scope.totalPrice = res.data.tokerWare.totalPrice
			$scope.watermark = res.data.watermark
			var storeId = res.data.storeId
			$scope.buy = function() {
				tookerId.tokerId = $scope.tokerId;
				tookerId.tokerWareId = $scope.tokerWareId;
				tookerId.wareNums = $scope.set.number;
				tookerId.superiorId = $scope.superiorId;
				tookerId.storeId = storeId;
				console.log(tookerId)
				$state.go('payment')
			}
		}).error(function(res) {
			alert('系统繁忙，请稍后再试...')
		}).finally(function() {
			$ionicLoading.hide();
		})

	}, 800)

})