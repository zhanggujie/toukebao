angular.module('starter.services', [])

 .factory('Address', function() {
  var addr = null;
  return {
    addr :addr
  }

})
.factory('share', function() {
	wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: '', // 必填，公众号的唯一标识
		timestamp: '', // 必填，生成签名的时间戳
		nonceStr: '', // 必填，生成签名的随机串
		signature: '', // 必填，签名，见附录1
		jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})
	return {
		//微信朋友圈
		Circle_friends: function() {
			console.log('微信朋友圈')
			wx.onMenuShareTimeline({
				title: '', // 分享标题
				link: '', // 分享链接
				imgUrl: '', // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		},
		//微信好友
		weixin_friend: function() {
			console.log("微信好友")
			wx.onMenuShareAppMessage({
				title: '', // 分享标题
				desc: '', // 分享描述
				link: '', // 分享链接
				imgUrl: '', // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		},
		//分享到qq
		qq_friends: function() {
			console.log('qq好友');
			wx.onMenuShareQQ({
				title: '', // 分享标题
				desc: '', // 分享描述
				link: '', // 分享链接
				imgUrl: '', // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		},
		//分享到微博
		weibo: function() {
			console.log("微博分享")
			wx.onMenuShareWeibo({
				title: '', // 分享标题
				desc: '', // 分享描述
				link: '', // 分享链接
				imgUrl: '', // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
		}
	}
})