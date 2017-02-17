angular.module("App")
	.controller("codeController", function($scope, $http, $ionicHistory, $ionicLoading, tuoke,share) {
		var url = tuoke.url;
		var token = tuoke.token;
		var type = tuoke.type;
		$scope.history = function() {
			$ionicHistory.goBack();
		};
		$scope.isshow = false;
		$scope.codes = {
			name: '李婷婷',
			code_phone: 'img/用户版.png'
		};
//     二维码生成
		function toUtf8(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for(i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else if(c > 0x07FF) {
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				} else {
					out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				}
			}
			return out;
		};
		var path =  url + 'web/assets/toker/www/index.html#/tab/page/eaf4a9eb7e2c4cc2a2001c13b4ae463d/1';
		var realPath = toUtf8(path);
		$('#share').qrcode(realPath);

		$ionicLoading.show();
		$http.get(url + 'web/toker/saveQRcode.do?token=' + token + '&storeId=' + 1 + '&type=' + type)
			.then(function(res) {
				console.log(res)
			})
			.catch(function() {

			})
			.finally(function() {
				$ionicLoading.hide();
			});

		//		 微信分享
		$scope.sharViaWechat = function(Scene) {
			var msg = {
				title: "拾羽",
				description: "拾羽平台分享", //描述
				media: {
					type: Wechat.Type.WEBPAGE,
					webpageUrl: url + "web/assets/toker/www/index.html#/tab/page/eaf4a9eb7e2c4cc2a2001c13b4ae463d/1"
				}
			};

			Wechat.share({
					message: msg,
					scene: Scene, // share to Timeline
				},
				function() {
					alert("分享成功");
				},
				function(reason) {
					alert(" 分享失败 " + reason);
				});
		};
		// 微信朋友圈分享
		$scope.weixinShare = function(){
			 share.Circle_friends()
		};
		//微信好友分享
		$scope.weixinFriends = function(){
			  share.weixin_friend();
		};
		//qq好友分享
		$scope.qqFriends =  function(){
			 share.qq_friends();
		};
		//微博分享
		$scope.Weibo = function(){
			 share.weibo()
		}
		
		
		$scope.show = function() {
			$scope.isshow = true;
		};
		$scope.hide = function() {
			$scope.isshow = false;
		}
	})