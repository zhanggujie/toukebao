angular.module("App")
	.controller("memberController", function($scope, $http, $ionicPopup,$ionicHistory,$ionicLoading,tuoke,$filter) {
		 var url = tuoke.url;
		 var token = tuoke.token;
		 var type = tuoke.type;

		$scope.history = function() {
			$ionicHistory.goBack();
		};
		 
		$scope.showPopup = function() {
			$scope.data = {};
			// 自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="text" style="border:1px solid gray ; height:4rem" ng-model="data.text">',
				title: '申请换人的理由',
				//				subTitle: 'Please use normal things',
				scope: $scope,
				buttons: [{
					text: '<div>取消 </div>',
					type: 'button-stable'
				}, {
					text: '<b>确定</b>',
					type: 'button-calm',
					onTap: function(e) {
						if(!$scope.data.text) {
							//必须输入理由呀
							e.preventDefault();

						} else {
							return $scope.data.text;
						}
					}
				}]
			});
			myPopup.then(function(res) {
				$scope.subordinate();
				console.log('Tapped!', res);
			});
			
		};
		$ionicLoading.show();
		$http.get( url + "web/toker/Merchant/findDownOneLine.do?token="+token + "&type="+ type)
			.then(function(res) {
				console.log(res)
				if(res.data.code == 200) {
					$scope.members = res.data.data.resultData;
					    if(res.data.data.resultData.length > 0){
					    	 $scope.dates = res.data.data.resultData ;
					    	for(var i = 0; i<res.data.data.resultData.length; i++){
					    		$scope.dates = res.data.data.resultData ;
					    		 if($scope.dates[i].createtime != 0){
					    		 	$scope.dates[i].createtime = $filter('date')($scope.dates[i].createtime *1000 ,'yyyy-MM-dd')
					    		 }
					    	}
					    }
				} else {
					alert(res.data.data.error)
				}
			})
			.catch(function(err) {
				console.log(err)
			})
			.finally(function() {
				$ionicLoading.hide();
			});
			
		$scope.subordinate = function() {
			
		}
	})