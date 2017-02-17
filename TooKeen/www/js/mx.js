angular.module('App')

.controller('MxCtrl', function($scope, $http, $state, $ionicPopup,$ionicHistory,tuoke) {
	 var url = tuoke.url;
	 var token = tuoke.token;
	  var type = tuoke.type;
	$scope.history = function() {
			$ionicHistory.goBack();
		};
		function req() {
		$http({
		url:  url + 'web/toker/dividendYield.do?token=' +token,
		method: 'GET'
	}).success(function(res) {
		console.log(res)
		$scope.sumScoreValue = res.data.sumScoreValue
		$scope.items = res.data.yieldList
		$scope.logs = res.data.giveList
	}).error(function(res) {
		alert('系统繁忙，请稍后再试')
	});
	}
	req()	
	$scope.isShow = true;
	$scope.sy = true
	$scope.shou = function() {
		$scope.isShow = true;
		$scope.isHide = false
		$scope.zs = false
		$scope.sy = true
	}
	$scope.zeng = function() {
		$scope.isHide = true
		$scope.isShow = false
		$scope.zs = true
		$scope.sy = false
	}
	$scope.zengsong = function() {
		$state.go('zengsong')
	}
	$scope.showConfirm = function(sourceName, sourceValue, id, status) {
		var confirmPopup = $ionicPopup.confirm({
			title: '<div>来自'+sourceName+'的闺蜜券赠送</div>',
			template: '<div>'+sourceValue+'</div>',
			cancelText: '残忍拒绝',
			okText: '开心领取',
		});
		confirmPopup.then(function(res) {
			if(res) {
				$http({
		url:  url + 'web/toker/comfirmTicketHandle.do?token='+ token+ '&walletLogId='+id+'&type=0',
		method: 'GET'
	}).success(function(res) {
          status = '已领取'
		  req()
	}).error(function(res) {
		alert('系统繁忙，请稍后再试')
	})
			} else {
				$http({
		url:  url +'web/toker/comfirmTicketHandle.do?token='+ token +'&walletLogId='+id+'&type=1',
		method: 'GET'
	}).success(function(res) {
        status = '已拒绝'
		req()
	}).error(function(res) {
		alert('系统繁忙，请稍后再试')
	})
			}
		});
	};

})