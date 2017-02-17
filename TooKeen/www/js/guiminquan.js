angular.module("App")
	.controller("Guimiquan", function($scope, $ionicPopup, $http, $ionicHistory, $state, tuoke) {
		var url = tuoke.url;
		var token = tuoke.token;
		var type = tuoke.type;
		var backUids = []; //定义返回上级的userID数组
		var isduwm = true; //是否可以点击查看下级按钮  防止多次点击
		//var url = "http://115.28.21.7:8060/web/";//请求服务器路径
		// var token = "5f45ba21a9f348d5a44854190a35b031";//toke值
		// var type = 0;//用户类型
		//会员列表接口
		if(type == 2) {
			$scope.isShowPu = false; //普通会员列表是否显示  点击查看下级时和高级会员列表切换
		} else {
			$scope.isShowPu = true;
		}

		function Initback() { //初始会员列表函数
			$http({
				url: url + "web/toker/Merchant/findDownOneLine.do?token=" + token + "&type=" + type,
				method: "GET"
			}).success(function(res) {
				var data = res.data;
				if(data.resultData.length == 0) {
					alert("暂无闺蜜")
				}
				$scope.userlist = data.resultData; //会员列表
				$scope.userlist2 = data.resultData;
				console.log(res)
			}).error(function(error) {
				alert(error)
			});
		}
		Initback();

		//查看下级
		$scope.duwm = function(searchuUserId, downPersionNum) {
			//searchuUserId  会员user_id  查询时传的参数
			//downPersionNum 下级人数  用于判断是否有下级  如果没有 给个提示
			if(isduwm) {
				if(downPersionNum < 1) {
					alert("暂无下级")
				} else {
					backUids.push(searchuUserId); //将searchuUserId 添加到数组中
					$http({
						url: url + "web/toker/Merchant/findDownOneLine.do?token=" + token + "&type=" + type + "&searchUserId=" + searchuUserId,
						method: "GET"
					}).success(function(res) {
						if(res.code == 200) {
							$scope.isShowPu = true;
							var data = res.data;
							$scope.userlist2 = data.resultData; //下级普通会员列表
							console.log(res)
						}
						isduwm = true;
					}).error(function(error) {
						isduwm = true;
						alert(error)
					});
					console.log(backUids)
				}
			} else {
				return;
			}

		};

		//换人
		$scope.myPopup = function(replacePersionId) {
			$scope.data = {};
			$ionicPopup.show({
				template: '<textarea type="" ng-model="data.text" rows="5" cols="10" style="resize: none" autofocus>',
				title: '申请换人理由',
				scope: $scope,
				buttons: [{
					text: '取消'
				}, {
					text: '<b>确认</b>',
					type: "bgclor",
					onTap: function(e) {
						if(!$scope.data.text) {

							alert("请输入换人理由");
							e.preventDefault();
						} else {
							$http({
								url: url + "web/toker/Merchant/replacePersion.do?token=" + token + "&reason=" + $scope.data.text + "&replacePersionId=" + replacePersionId,
								method: "POST"
							}).success(function(res) {
								if(res.code == 200) {
									if(res.data.resultData == 1) {
										alert("更换成功")
									}
								}
							}).error(function(error) {
								alert('服务错误')
							});
							console.log(replacePersionId);
							console.log($scope.data.text)
						}
					}
				}]
			});

		};
		//设置老板娘
		$scope.setting = function(type, replacePersionId) {
			// $scope.userType = index;
			console.log(replacePersionId);
			if(type == 2) {
				alert("已是老板娘了")
			} else {
				$http({
					url: url + "web/toker/forManage.do?userId=" + replacePersionId,
					method: "GET"
				}).success(function(res) {
					console.log(res);
					Initback();
					alert(res.data.sucess)
				}).error(function(error) {
					alert("服务器异常")
				})
			}
		};

		//返回按钮
		$scope.banck = function() {
			var backId = backUids.length - 1; //得到返回列表userID长度
			if(backId == 0) { //如果长度小于2 则直接返回顶级会员列表
				backUids.splice(backId, 1);
				//$scope.isShowPu = false;
				Initback();
				// console.log(backUids);
				// console.log(backId)
			} else if(backId == -1) {
				//alert("页面跳转");
				//添加跳转页面的链接
				$state.go('payment');
				$ionicHistory.goBack();
			} else {
				var banck = backUids[backId - 1]; //得到数组中的最后一个id
				backUids.splice(backId, 1); //从列表中删除已返回的id
				$http({
					url: url + "web/toker/Merchant/findDownOneLine.do?token=" + token + "&type=" + type + "&searchUserId=" + banck,
					method: "GET"
				}).success(function(res) {
					if(res.code == 200) {
						//$scope.isShowPu = true;
						var data = res.data;
						$scope.userlist2 = data.resultData; //下级普通会员列表
						//console.log(res);
					}
				}).error(function(error) {
					alert(error)
				});
			}
		}
	});