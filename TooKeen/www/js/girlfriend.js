angular.module('App')
	.controller("Girlfriends", function($scope, $http, $state, $ionicHistory, tuoke) {
		//      var url = 'http://115.28.21.7:8060/web/';
		//      var token ='1f976524aef34236b723ba01fa0d9461';
		var url = tuoke.url;
		var token = tuoke.token;
		$scope.history = function() {
			$ionicHistory.goBack();
		};
		//领取接口
		$scope.draw = function(backButtonText) {
			console.log(backButtonText);
			if(backButtonText == "已领取") {
				alert("您暂时没有可领取商品");
				return;
			}
			$http.get(url + "web/toker/collarProduct.do?token=" + token)
				.success(function(res) {
					console.log(res);
					if(res.code == 200) {
						alert("领取成功");
						$state.go('tuokeshouye')
					} else {
						alert(res.data.error);
					}
				})
				.error(function(error) {
					alert(error)
				})
		};

		//领取记录
		$http.get(url + "web/toker/collarRecord.do?token=" + token)
			.success(function(res) {
				if(res.code == 200) {
					var data = res.data.data;
					//console.log(res);
					$scope.girImgurl = data.picture; //商品图片
					$scope.text = data.text; //标语
					$scope.lists = data.list; //领取记录列表
					$scope.backButtonText = data.button; //按钮text
					//$scope.date = $filter(date)(data.date, 'yyyy-MM')
				} else {
					alert("数据获取异常")
				}
			})
			.error(function(error) {
				alert("服务器异常")
			})

	});