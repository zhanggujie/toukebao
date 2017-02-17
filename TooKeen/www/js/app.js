angular.module('App', ['ionic', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.constant('tuoke', {
		'url': '',
		'token': '',
		'type': '',
		'isloading': true,
	})
	.constant('tookerId', {
		'tokerId': '',
		'tokerWareId': '',
		'wareNums': '',
		'superiorId': '',
		'storeId': '',
		"orderNo":"",
		'indents' :''
	})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
	$ionicConfigProvider.navBar.alignTitle("center");
	//  表单提交
	$httpProvider.defaults.transformRequest = function(obj) {
		var str = [];
		for(var p in obj) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	}
	$httpProvider.defaults.headers.post = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}

	$stateProvider
		.state('girlfriends', {
			url: '/girlfriends',
			templateUrl: 'views/girlfriends.html',
			controller: 'girlfriendsController'
		})
		.state("code", {
			url: '/code',
			templateUrl: 'views/code.html',
			controller: 'codeController'
		})
		.state("indent", {
			url: '/indent',
			templateUrl: 'views/girlfriends_indent.html',
			controller: 'indentController'
		})
		.state("member", {
			url: '/member',
			templateUrl: 'views/my_member.html',
			controller: 'memberController'
		})

	.state('dingdan', {
			url: '/dingdan',
			templateUrl: 'views/tab-dingdan.html',
			controller: 'DingdanCtrl'
		})
		.state('mx', {
			url: '/mx',
			templateUrl: 'views/mx.html',
			controller: 'MxCtrl'
		})
		.state('me', {
			url: '/me',
			templateUrl: 'views/tab-me.html',
			controller: 'meController'
		})
		.state('bozhong', {
			url: '/bozhong',
			templateUrl: 'views/bozhong.html',
			controller: 'BozhongCtrl'
		})
		.state('zhuanhuan', {
			url: '/zhuanhuan',
			templateUrl: 'views/zhuanhuan.html',
			controller: 'ZhuanhuanCtrl'
		})
		.state('zengsong', {
			url: '/zengsong',
			templateUrl: 'views/zengsong.html',
			controller: 'ZengsongCtrl'
		})
		.state('dashang', {
			url: '/dashang',
			templateUrl: 'views/dashang.html',
			controller: 'DashangCtrl'
		})

	.state('girlfriend', {
			url: '/girlfriend',
			templateUrl: 'views/girlfriend.html',
			controller: 'Girlfriends'
		})
		.state('payment', {
			url: '/payment',
			templateUrl: 'views/payment.html',
			controller: 'Payment'
		})
		.state('guimiquan', {
			url: '/guimiquan',
			templateUrl: 'views/guimiquan.html',
			controller: 'Guimiquan'
		})
		.state('tuokeshouye', {
			url: '/tuokeshouye',
			templateUrl: 'views/tuokeshouye.html',
			controller: 'Tuokeshouye'
		})
		.state('address', {
			url: '/address',
			templateUrl: 'views/address.html',
			controller: 'Address'
		})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/girlfriends');

});