angular.module('App')
	.controller("indentController", function($scope, $state,$ionicHistory, $http, $ionicLoading, tuoke,tookerId) {
		var url = tuoke.url;
		var token = tuoke.token;
		var type = tuoke.type;
		$scope.history = function() {
			$ionicHistory.goBack();
		};
		 $scope.buy = function(indent) {
		 	 tookerId.indents = indent;
		 	 console.log(indent)
		 	 console.log(tookerId.indents)
		 	 $state.go('dashang')
		 }
		 // 全部订单
		$scope.all = function() {
			$ionicLoading.show();
			$http.get(url + "web/toker/Merchant/findOrder.do?token=" + token + "&params=" + [0,10,, 0])
				.then(function(res) {
					console.log(res)
					if(res.data.code == 200) {
						$scope.indents = res.data.data.resultData.totalOrder.order;
					       for(var i = 0; i< $scope.indents.length; i ++ ){
					       	  if($scope.indents[i].orderItems[0].name == ''){
					       	  	 $scope.isGiv = true ;
					       	  }
					       	  else{
					       	  	 $scope.isGiv = false ;
					       	  }
					       }
					}
					else {
						alert(res.data.error)
					}
				})
				.catch(function() {
                    
				})
				.finally(function() {
					$ionicLoading.hide();
				})
		};
		$scope.all()
		 //已购买
		$scope.Purchased = function() {
			$scope.indents = []
			$ionicLoading.show();
			$http.get(url + "web/toker/Merchant/findOrder.do?token=" + token + "&params=" + [0,10, "20-30-40", 0])
				.then(function(res) {
					console.log(res)
					if(res.data.code == 200) {
						$scope.indents = res.data.data.resultData.totalOrder.order;
					} else {
						alert(res.data.error)
					}
				})
				.catch(function() {

				})
				.finally(function() {
					$ionicLoading.hide();
				})
		};
		 //下拉刷新
		var next = 0;
		$scope.doRefresh = function() {
			next += 1;
			var num = next * 10;
			$http.get(url + "web/toker/Merchant/findOrder.do?token=" + token + "&params=" + [num, 10, "20-30-40", 0])
				.then(function(res) {
					console.log(res)
					if(res.data.code == 200) {
						$scope.purchase = res.data.data.resultData.totalOrder.order;
						for(var i = 0; i < $scope.purchase.length; i++) {
							$scope.indents.push($scope.purchase[i]);
						}
						if($scope.length > 0) {
							tuoke.isloading = true;
						} else {
							tuoke.isloading = false;
						}
					} else {
						alert(res.data.error)
					}
				})
				.catch(function() {})
				.finally(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				})
		};
		$scope.loadMore = function() {
			if(tuoke.isloading) {
				$scope.doRefresh()
			} else {
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}

		}

	})