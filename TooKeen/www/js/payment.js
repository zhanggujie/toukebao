angular.module("App")
    .controller("Payment",function ($scope,$ionicPopup,$http,Address,$state,tuoke,tookerId) {
        //$scope.isweinxin = true;//是不是微信支付
        var sss = false;
        var xuanze = "img/xuanze.png";//选择图片
        var moren = "img/moren.png";//未选择图片
        var address = "";//门店地址
        var receiverType =0;//邮寄方式 默认；
        var url = tuoke.url;
        var token =tuoke.token;
        var type =tuoke.type;
        var storeId = tookerId.storeId;//门店id
        var tokerWareId=tookerId.tokerWareId;//拓客商品id
        var tokerId =tookerId.tokerId;//拓客信息id
        var tokerItemIds = '';//项目ids
        var superiorId = tookerId.superiorId;//上级id
        var provinceId = "";
        var freightPrice = "0";//youfei;
        $scope.address = false;
        $scope.weixinUrl = 'img/moren.png';//支付选中图片
        $scope.type1=1;//显示订单状态
        $scope.zitiImg = moren;//自提默认
        $scope.youjiImg = xuanze;//邮寄
        $scope.productName = "";//产品名称
        $scope.productPrice = "";//产品价格
        $scope.productNumber = tookerId.wareNums;//产品数量
        $scope.price = '';//消费金额
        $scope.user = {
            address : "",//用户收货地址
            remark : "",//备注
            phone : '',
            name: ""
        };

        if (!Address.addr){
            $scope.zitiImg = moren;//自提默认
            $scope.youjiImg = xuanze;//邮寄
        }else{
            $scope.zitiImg = xuanze;//自提默认
            $scope.youjiImg = moren;//邮寄
        }

//获取用户收货地址
        function shippingAddress() {
            $http({
                url :url+"web/user/get_mine_address.do?token="+token+"&type="+type,
                method : "get"
            }).success(function (data) {
                var addresslist = data.data.addressList;
                console.log(addresslist);
                if (addresslist.length ==0){
                    alert("请填写个人信息和收货地址");
                    $state.go("address");
                    return
                }
                for (var i=0;i<addresslist.length;i++){
                    $scope.user.name = addresslist[0].name;
                    $scope.user.phone = addresslist[0].phone;
                    if (receiverType==1){
                        $scope.user.address = addresslist[0].address;
                    }
                }
            });
        }
        //获取商品
        $http({
            url :url+"web/toker/findWareDetails.do?tokerWareId="+tokerWareId+"&tokerId="+tokerId,
            method : "GET"
        }).success(function (data) {
            console.log(data);
            var tokerWare = data.data.tokerWare;
            $scope.tokerItem = data.data.tokerItem;
            var item = data.data.tokerItem;
            storeId = data.data.storeId;
            if ($scope.tokerItem.length ==0){
                $scope.tokerItem = [{itemName : "暂无项目",number :0}]
            }
            var itempric="";
            for (var i=0;i<item.length;i++){
                tokerItemIds +=item[i].itemId;
                itempric += item[i].price;
            }
            $scope.productName = tokerWare.name;
            $scope.productPrice =tokerWare.warePrice;
            storeId = tokerWare.storeId;
            $scope.price =itempric-0+tokerWare.warePrice*$scope.productNumber;

            //获取门店地址
            $http({
                url : url+"web/toker/getStoreReceiver.do?storeId="+storeId,
                method : 'GET'
            }).success(function (data) {
                console.log(data);
                address=data.data.receiver+data.data.phone;
                $scope.user.address = data.data.receiver+data.data.phone;
                if (!Address.addr){//获取收货地址
                    shippingAddress()
                }else{
                    console.log(Address.addr);
                    receiverType = 1;
                    $scope.address = true;
                    $scope.zitiImg = xuanze;//自提默认
                    $scope.youjiImg = moren;//邮寄
                    $scope.user.address = Address.addr.address;
                    $scope.user.name = Address.addr.name;
                    $scope.user.phone = Address.addr.phone;
                    if (Address.addr.province ==null){
                        getFreightPrice(Address.addr.provinceId)
                    }else{
                        getFreightPrice(Address.addr.province.areaId)
                    }
                }
            }).error(function (error) {
                alert("服务错误")
            });

        }).error(function (error) {
            alert('服务错误')
        });



        //获取邮费
        function getFreightPrice(areaId) {
            $http({
                url : url+"web/toker/getAreaPostage.do?areaId="+areaId,
                method : "get"
            }).success(function (data) {
                console.log(data);
                freightPrice = data.data.freightPrice;
                if (freightPrice ==null){
                    freightPrice =0
                }
            }).error(function (error) {
                console.log(error)
            })
        }



        //领取方式
        $scope.mailMehtode = function (meail) {
            //console.log(meail);
            receiverType = meail;
            if (meail==0){
                $scope.zitiImg = moren;//自提默认
                $scope.youjiImg = xuanze;//邮寄
                $scope.address = false;
                $scope.user.address = address;
            }
            if (meail == 1){
                $scope.address = true;
                $scope.zitiImg = xuanze;//自提默认
                $scope.youjiImg = moren;//邮寄
                //获取收货地址
                shippingAddress()
            }
        };
        //console.log(Indent);
        $scope.tijiao = function () {
            var reg = /^[1][358][0-9]{9}$/;
            if ($scope.user.address ==""){
                alert('请填写收货地址');
                return
            }
            if(superiorId==null){
            	superiorId = "";
            }
           var data = {
                token : token,
                tokerId:tokerId,//拓客信息id
                tokerItemIds : tokerItemIds,//项目id
                number : $scope.productNumber,//购买数量
                freightPrice : freightPrice,//运费
                receiverType : receiverType,//收货类型
                receiverName :$scope.user.name,//收货人名称
                receiverAddress : $scope.user.address,//收货地址
                receiverPhone : $scope.user.phone,//收货人手机号
                storeReceiver : address,//门店地址
                remark : $scope.user.remark,//备注
                channel : 'WECHAT',//支付渠道 微信默认
                tokerWareId : tokerWareId,//拓客商品id
                storeId : storeId,//门店id
                superiorId :superiorId//上级id
            };
            console.log(data);
              $http({
                    url : url+'web/toker/createTokerOrder.do',
                    method : "POST",
                    data :data
                 }).success(function (data) {
                   console.log(data);
                     var orderNo = data.data.orderNo;//订单号
                     if (data.code ==200){
                     	 tookerId.orderNo = orderNo;
                         $scope.type1=2;
                          $state.go('bozhong')
                     }
                }).error(function (error) {
                   console.log(error)
                });

        };

        $scope.goaddress = function () {
            $state.go("address");
        };


    });
