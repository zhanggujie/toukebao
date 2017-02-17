/**
 * Created by zhangguijie on 2017/2/13.
 */
angular.module("App")
    .controller("Address",function ($scope,$http,$state,Address,tuoke,$ionicHistory) {
    	 var url = tuoke.url; 
		var token = tuoke.token;
		var type = tuoke.type;
		$scope.history = function() {
			$ionicHistory.goBack();
		};
       // var url = 'http://192.168.100.233:8081/web/';
       // var token ='38399433cd1a47518adab7c99ab349a0';
        var siteId = "1";
        //var type = 0;
        var num = 0;
        var provaname = "";//省名
        var index = 0;
        var provinceId ="";//省id
        $scope.isCity = false;
        $scope.isaddress = false;//是否显示收货列表；
        $scope.isdefault=true;//默认地址
        $scope.isopen = true;
        $scope.user = {
            name : "",
            phone : "",
            address : "",
            id : ""
        };
        //添加收货地址
        $scope.addAddress = function () {
            console.log($scope.user.name);
            // console.log($scope.user.province);
            var data = {
                name :$scope.user.name,
                phone :$scope.user.phone,
                address :$scope.province+$scope.user.address,
                isDefault :num,
                provinceId :provinceId
            };
            var data2 = {
                name :$scope.user.name,
                phone :$scope.user.phone,
                address :$scope.province+$scope.user.address,
                isDefault :num,
                provinceId :provinceId,
                id :$scope.user.id
            };
            // console.log($scope.user.id);
            // console.log(data2);
            console.log(data);
            if ($scope.user.id == ""){
                // console.log(num);
                $http({
                    url :url+"web/user/add_address.do?token="+token+"&type="+type,
                    method : "get",
                    params : data
                }).success(function (data) {
                    if(data.code ==200){
                        $scope.addressList = data.data.addressList;
                        $scope.isopen = true;
                        $scope.isaddress = false;
                    }else{
                        alert("错误")
                    }
                    console.log(data)
                })
            }else{
                $http({
                    url :url+"web/user/add_address.do?token="+token+"&type="+type,
                    method : "get",
                    params : data2
                }).success(function (data) {
                    if(data.code ==200){
                        $scope.addressList = data.data.addressList;
                        $scope.isopen = true;
                        $scope.isaddress = false;
                    }else{
                        alert("错误")
                    }

                })
            }

        };
        //获取收货地址
        $http({
            url :url+"web/user/get_mine_address.do?token="+token+"&type="+type,
            method : "get"
        }).success(function (data) {
           $scope.addressList = data.data.addressList;
            // console.log(addressList);
            if ($scope.addressList.length ==0){
                $scope.isaddress = true;
                $scope.title = "添加地址"
            }else{
                $scope.isaddress = false;
                //$scope.addresss = address;
                $scope.title = "我的地址"
            }
            console.log(data)
        });

        $scope.go = function (addres) {
            Address.addr = addres;
            $state.go('payment')
        };
        $scope.default = function (nu) {
            $scope.isdefault = !$scope.isdefault;
            console.log($scope.isdefault);
            if (!$scope.isdefault){
                num = nu;
            }
        };
        //编辑
        $scope.compile = function (address) {
            console.log(address);
            $scope.isaddress = true;
            $scope.user = {
                name : address.name,
                phone : address.phone,
                address : address.address,
                id : address.id
            };
            if (address.province==null){
                $scope.province  = address.name;
                provinceId = address.provinceId;
            }else{
                $scope.province  = address.name.name;
                provinceId = address.provinceId;
            }
            index =2;
        };

//设置默认项
        $scope.defau = function (address) {
            $scope.user = {
                name : address.name,
                phone : address.phone,
                address : address.address,
                id : address.id
            };
            if (address.province==null){
                $scope.province  = address.address;
                provinceId = address.provinceId;
            }else{
                $scope.province  = address.province.name;
                provinceId = address.provinceId;
            }
            $http({
                url :url+"web/user/set_default_address.do?token="+token+"&addressId="+address.id,
                method : "get"
            }).success(function (data) {
                console.log(data);
                if(data.code ==200){
                    $scope.addressList = data.data.addressList;
                    //$state.go('tab.payment')
                }
                console.log(data)
            })
        };
        //删除
        $scope.remove = function (id) {
            // /user/del_address.do
            $http({
                url :url+"web/user/del_address.do?token="+token+"&id="+id,
                method : "get"
            }).success(function (data) {
                if (data.code==200){
                    $scope.addressList = data.data.addressList;
                }else{
                    alert("删除失败")
                }
                console.log(data)
            });
            console.log("删除")
        };
       $scope.Provinces = [
            {name : '北京',id :'110000'},
            {name : '安徽',id :'340000'},
            {name : '重庆',id :'500000'},
            {name : '福建',id :'350000'},
            {name : '甘肃',id :'620000'},
            {name : '广东',id :'440000'},
            {name : '广西',id :'450000'},
            {name : '贵州',id :'520000'},
            {name : '海南',id :'460000'},
            {name : '河北',id :'130000'},
            {name : '黑龙江',id :'230000'},
            {name : '河南',id :'410000'},
            {name : '湖北',id :'420000'},
            {name : '湖南',id :'430000'},
            {name : '内蒙古',id :'150000'},
            {name : '江苏',id :'320000'},
            {name : '江西',id :'360000'},
            {name : '吉林',id :'220000'},
            {name : '辽宁',id :'210000'},
            {name : '宁夏',id :'640000'},
            {name : '青海',id :'630000'},
            {name : '山西',id :'140000'},
            {name : '山东',id :'370000'},
            {name : '上海',id :'310000'},
            {name : '四川',id :'510000'},
            {name : '天津',id :'120000'},
            {name : '西藏',id :'540000'},
            {name : '新疆',id :'650000'},
            {name : '云南',id :'530000'},
            {name : '浙江',id :'330000'},
            {name : '陕西',id :'610000'}
        ];

        var Citys = [
            {pid:110000,cits:[
                {id:1 ,name: "东城区"},{id: 2,name:  "西城区"},{id: 3,name: "崇文区"},{id: 4,name: "宣武区"},
                {id: 5,name: "朝阳区"}, {id:6 ,name:"丰台区"},{id:7 ,name:"石景山区"},{id: 8,name: "海淀区"},
                {id:9 ,name: "门头沟区"}, {id:11,name: "房山区"},{id:12,name:  "通州区"},{id:13,name: "顺义区"},
                {id:14,name: "昌平区"}, {id:15,name: "大兴区"}, {id:16,name: "怀柔区"},{id:17,name: "平谷区"},
                {id:28,name: "密云县"}, {id:29,name: "延庆县"}
            ]},
            {pid:340000,cits:[
                {id:1 ,name: "合肥"},{id: 2,name:  "芜湖"},{id: 3,name: "蚌埠"},{id: 4,name: "淮南"},
                {id: 5,name: "马鞍山"}, {id:6 ,name:"淮北"},{id:7 ,name:"铜陵"},{id: 8,name: "安庆"},
                {id:10 ,name: "黄山"}, {id:11,name: "滁州"},{id:12,name:  "阜阳"},{id:13,name: "宿州"},
                {id:14,name: "巢湖"}, {id:15,name: "六安"}, {id:16,name: "亳州"},{id:17,name: "池州"},
                {id:18,name: "宣城"}
            ]},
            {pid:500000,cits:[
                {id:1 ,name: "万州区"},{id: 2,name:  "涪陵区"},{id: 3,name: "渝中区"},{id: 4,name: "大渡口区"},
                {id: 5,name: "江北区"}, {id:6 ,name:"沙坪坝区"},{id:7 ,name:"九龙坡区"},{id: 8,name: "南岸区"},
                {id:9 ,name: "北碚区"}, {id:10,name: "万盛区"},{id:11,name:  "双桥区"},{id:12,name: "渝北区"},
                {id:13,name: "巴南区"}, {id:14,name: "黔江区"}, {id:22,name: "綦江县"},{id:23,name: "潼南县"},
                {id:24,name: "铜梁县"}, {id:25,name: "大足县"}, {id:24,name: "铜梁县"}, {id:26,name: "荣昌县"},
                {id:27 ,name: "璧山县"},{id: 28,name:  "梁平县"},{id: 29,name: "城口县"},{id:30,name: "丰都县"},
                {id:31,name: "垫江县"}, {id:32 ,name:"武隆县"},{id:33,name:"忠县"},{id: 34,name: "开县"},
                {id:35 ,name: "云阳县"}, {id:36,name: "奉节县"},{id:37,name:  "巫山县"},{id:38,name: "巫溪县"},
                {id:40,name: "石柱土家族自治县"},{id:41,name: "秀山土家族苗族自治县"},{id:42,name: "酉阳土家族苗族自治"},{id:43,name: "彭水苗族土家族自治县"},
                {id:81,name: "江津市"}, {id:82,name: "合川市"}, {id:83,name: "永川市"}, {id:84,name: "南川市"},
                {id:15,name: "长寿区"}
            ]},
            {pid:350000,cits:[
                {id:1 ,name: "福州"},{id: 2,name:  "厦门"},{id: 3,name: "莆田"},{id: 4,name: "三明"},
                {id: 5,name: "泉州"}, {id:6 ,name:"漳州"},{id:7 ,name:"南平"},{id: 8,name: "龙岩"},
                {id:9 ,name: "宁德"}
            ]},
            {pid:620000,cits:[
                {id:1 ,name: "兰州"},{id: 2,name:  "嘉峪关"},{id: 3,name: "金昌"},{id: 4,name: "白银"},
                {id: 5,name: "天水"}, {id:6 ,name:"武威"},{id:7 ,name:"张掖"},{id: 8,name: "平凉"},
                {id:9 ,name: "酒泉"}, {id:10,name: "庆阳"},{id:24,name:  "定西"},{id:26,name: "陇南"},
                {id:29,name: "临夏"}, {id:30,name: "甘南"}
            ]},
            {pid:440000,cits:[
                {id:1 ,name: "广州"},{id: 2,name:  "韶关"},{id: 3,name: "深圳"},{id: 4,name: "珠海"},
                {id: 5,name: "汕头"}, {id:6 ,name:"佛山"},{id:7 ,name:"江门"},{id: 8,name: "湛江"},
                {id:9 ,name: "茂名"}, {id:12,name: "肇庆"},{id:13,name: "惠州"}, {id:14,name: "梅州"},
                {id:15,name: "汕尾"}, {id:16,name: "河源"},{id:17,name: "阳江"}, {id:18,name: "清远"},
                {id:19,name: "东莞"},{id:20,name: "中山"},{id:51,name: "潮州"},{id:52,name: "揭阳"},
                {id:53,name: "云浮"}
            ]},
            {pid:450000,cits:[
                {id:1 ,name: "南宁"},{id: 2,name:  "柳州"},{id: 3,name: "桂林"},{id: 4,name: "梧州"},
                {id: 5,name: "北海"}, {id:6 ,name:"防城港"},{id:7 ,name:"钦州"},{id: 8,name: "贵港"},
                {id:9 ,name: "玉林"}, {id:10,name: "百色"},{id:11,name:  "贺州"},{id:12,name: "河池"},
                {id:21,name: "南宁"}, {id:22,name: "柳州"}
            ]},
            {pid:520000,cits:[
                {id:1 ,name: "贵阳"},{id: 2,name:  "六盘水"},{id: 3,name: "遵义"},{id: 4,name: "安顺"},
                {id: 22,name: "铜仁"}, {id:23 ,name:"黔西南"},{id:24 ,name:"毕节"},{id: 26,name: "黔东南"},
                {id:27 ,name: "黔南"}
            ]},
            {pid:460000,cits:[
                {id:1 ,name: "海口"},{id: 2,name:  "三亚"},{id: 90,name: "其他"}
            ]},
            {pid:130000,cits:[
                {id:1 ,name: "石家庄"},{id: 2,name:  "唐山"},{id: 3,name: "秦皇岛"},{id: 4,name: "邯郸"},
                {id: 5,name: "邢台"}, {id:6 ,name:"保定"},{id:7 ,name:"张家口"},{id: 8,name: "承德"},
                {id:9 ,name: "沧州"}, {id:10,name: "廊坊"},{id:11,name:  "衡水"}
            ]},
            {pid:230000,cits:[
                {id:1 ,name: "哈尔滨"},{id: 2,name:  "齐齐哈尔"},{id: 3,name: "鸡西"},{id: 4,name: "鹤岗"},
                {id: 5,name: "双鸭山"}, {id:6 ,name:"大庆"},{id:7 ,name:"伊春"},{id: 8,name: "佳木斯"},
                {id:9 ,name: "七台河"}, {id:10,name: "牡丹江"},{id:11,name:  "黑河"},{id:12,name: "绥化"},
                {id:27,name: "大兴安岭"}
            ]},
            {pid:410000,cits:[
                {id:1 ,name: "郑州"},{id: 2,name:  "开封"},{id: 3,name: "洛阳"},{id: 4,name: "平顶山"},
                {id: 5,name: "安阳"}, {id:6 ,name:"鹤壁"},{id:7 ,name:"新乡"},{id: 8,name: "焦作"},
                {id:9 ,name: "濮阳"}, {id:11,name: "漯河"},{id:12,name:  "三门峡"},{id:13,name: "南阳"},
                {id:14,name: "商丘"}, {id:15,name: "信阳"}, {id:16,name: "周口"},{id:17,name: "驻马店"},
                {id:10,name: "许昌"}
            ]},
            {pid:430000,cits:[
                {id:1 ,name: "长沙"},{id: 2,name:  "株洲"},{id: 3,name: "湘潭"},{id: 4,name: "衡阳"},
                {id: 5,name: "邵阳"}, {id:6 ,name:"岳阳"},{id:7 ,name:"常德"},{id: 8,name: "张家界"},
                {id:9 ,name: "益阳"}, {id:11,name: "永州"},{id:12,name:  "怀化"},{id:13,name: "娄底"},
                {id:14,name: "湘西土家族苗族自治州"}, {id:10,name: "郴州"}
            ]},
            {pid:420000,cits:[
                {id:1 ,name: "武汉"},{id: 2,name:  "黄石"},{id: 3,name: "十堰"},{id: 5,name: "宜昌"},
                {id: 6,name: "襄樊"}, {id:7 ,name:"鄂州"},{id:8 ,name:"荆门"},{id:10,name:"荆州"},
                {id:9 ,name: "孝感"}, {id:11,name: "黄冈"},{id:12,name:  "咸宁"},{id:13,name: "随州"},
                {id:28,name: "恩施土家族苗族自治州"}
            ]},
            {pid:150000,cits:[
                {id:1 ,name: "呼和浩特"},{id: 2,name:  "包头"},{id: 3,name: "乌海"},{id: 4,name: "赤峰"},
                {id: 5,name: "通辽"}, {id:6 ,name:"鄂尔多斯"},{id:7 ,name:"呼伦贝尔"},{id: 22,name: "兴安盟"},
                {id:25 ,name: "锡林郭勒盟"}, {id:26,name: "乌兰察布"},{id:28,name:  "巴彦淖尔盟"},{id:29,name: "阿拉善盟"}
            ]},
            {pid:320000,cits:[
                {id:1 ,name: "南京"},{id: 2,name:  "无锡"},{id: 3,name: "徐州"},{id: 4,name: "常州"},
                {id: 5,name: "苏州"}, {id:6 ,name:"南通"},{id:7 ,name:"连云港"},{id: 8,name: "淮安"},
                {id:9 ,name: "盐城"}, {id:11,name: "镇江"},{id:12,name:  "泰州"},{id:13,name: "宿"},
                {id:10,name: "扬州"}
            ]},
            {pid:360000,cits:[
                {id:1 ,name: "南昌"},{id: 2,name:  "景德镇"},{id: 3,name: "萍乡"},{id: 4,name: "九江"},
                {id: 5,name: "新余"}, {id:6 ,name:"鹰潭"},{id:7 ,name:"赣州"},{id: 8,name: "吉安"},
                {id:9 ,name: "宜春"}, {id:10,name: "抚州"},{id:11,name:  "上饶"}
            ]},
            {pid:220000,cits:[
                {id:1 ,name: "长春"},{id: 2,name:  "吉林"},{id: 3,name: "四平"},{id: 4,name: "辽源"},
                {id: 5,name: "通化"}, {id:6 ,name:"白山"},{id:7 ,name:"松原"},{id: 8,name: "白城"},
                {id:24 ,name: "延边朝鲜族自治州"}
            ]},
            {pid:210000,cits:[
                {id:1 ,name: "沈阳"},{id: 2,name:  "大连"},{id: 3,name: "鞍山"},{id: 4,name: "抚顺"},
                {id: 5,name: "本溪"}, {id:6 ,name:"丹东"},{id:7 ,name:"锦州"},{id: 8,name: "营口"},
                {id:9 ,name: "阜新"}, {id:11,name: "盘锦"},{id:12,name:  "铁岭"},{id:13,name: "朝阳"},
                {id:14,name: "葫芦岛"}, {id:10,name: "辽阳"}
            ]},
            {pid:640000,cits:[
                {id:1 ,name: "银川"},{id: 2,name:  "石嘴山"},{id: 3,name: "吴忠"},{id: 4,name: "固原"}
            ]},
            {pid:630000,cits:[
                {id:1 ,name: "西宁"},{id: 21,name:  "海东"},{id: 22,name: "海北"},{id: 23,name: "黄南"},
                {id: 25,name: "海南"}, {id:26 ,name:"果洛"},{id:27 ,name:"玉树"},{id: 28,name: "海西"}
            ]},
            {pid:140000,cits:[
                {id:1 ,name: "太原"},{id: 2,name:  "大同"},{id: 3,name: "阳泉"},{id: 4,name: "长治"},
                {id: 5,name: "晋城"}, {id:6 ,name:"朔州"},{id:7 ,name:"晋中"},{id: 8,name: "运城"},
                {id:9 ,name: "忻州"}, {id:10,name: "临汾"},{id:23,name:  "吕梁"}
            ]},
            {pid:370000,cits:[
                {id:1 ,name: "济南"},{id: 2,name:  "青岛"},{id: 3,name: "淄博"},{id: 4,name: "枣庄"},
                {id: 5,name: "东营"}, {id:6 ,name:"烟台"},{id:7 ,name:"潍坊"},{id: 8,name: "济宁"},
                {id:9 ,name: "泰安"}, {id:11,name: "日照"},{id:12,name:  "莱芜"},{id:13,name: "临沂"},
                {id:14,name: "德州"}, {id:15,name: "聊城"}, {id:16,name: "滨州"},{id:17,name: "菏泽"},
                {id:10,name: "威海"}
            ]},
            {pid:310000,cits:[
                {id:11 ,name: "黄浦区"},{id: 3,name:  "卢湾区"},{id: 4,name: "徐汇区"},{id: 5,name: "长宁区"},
                {id: 6,name: "静安区"},{id:7 ,name:"普陀区"},{id: 8,name: "闸北"},
                {id:9 ,name: "虹口区"}, {id:10,name: "杨浦区"},{id:12,name:  "闵行区"},{id:13,name: "宝山区"},
                {id:14,name: "嘉定区"}, {id:15,name: "浦东新区"}, {id:16,name: "金山区"},{id:17,name: "松江区"},
                {id:18,name: "青浦区"}, {id:19,name: "南汇区"},{id:20,name: "奉贤区"}, {id:30,name: "崇明县"}
            ]},
            {pid:510000,cits:[
                {id:1 ,name: "成都"},{id: 3,name: "自贡"},{id: 4,name: "攀枝花"},{id: 33,name: "甘孜"},
                {id: 5,name: "泸州"}, {id:6 ,name:"德阳"},{id:7 ,name:"绵阳"},{id: 8,name: "广元"},
                {id:9 ,name: "遂宁"}, {id:11,name: "乐山"},{id:13,name: "南充"},{id: 34,name: "凉山"},
                {id:14,name: "眉山"}, {id:15,name: "宜宾"}, {id:16,name: "广安"},{id:17,name: "达州"},
                {id:18,name: "雅安"}, {id:19,name: "巴中"},{id:20,name: "资阳"}, {32:19,name: "阿坝"}
            ]},
            {pid:120000,cits:[
                {id:1 ,name: "和平区"},{id: 2,name:  "河东区"},{id: 3,name: "河西区"},{id: 4,name: "南开区"},
                {id: 5,name: "河北区"}, {id:6 ,name:"红桥区"},{id:7 ,name:"塘沽区"},{id: 8,name: "汉沽区"},
                {id:9 ,name: "大港区"}, {id:11,name: "西青区"},{id:12,name:  "津南区"},{id:13,name: "北辰区"},
                {id:14,name: "武清区"}, {id:15,name: "宝坻区"}, {id:21,name: "宁河县"},{id:23,name: "静海县"},
                {id:25,name: "蓟县"}, {id:10,name: "东丽区"}
            ]},
            {pid:540000,cits:[
                {id:1 ,name: "拉萨"},{id: 21,name:  "昌都"},{id: 22,name: "山南"},{id: 23,name: "日喀则"},
                {id:24,name: "那曲"}, {id:25 ,name:"阿里"},{id:26 ,name:"林芝"}
            ]},
            {pid:650000,cits:[
                {id:1 ,name: "乌鲁木齐"},{id: 2,name:  "克拉玛依"},{id:21,name: "吐鲁番"},{id:22,name: "哈密"},
                {id:23,name: "昌吉"}, {id:27 ,name:"博尔塔拉"},{id:28,name:"巴音郭"},{id: 29,name: "阿克苏"},
                {id:30,name: "克孜勒苏"},{id:31,name: "喀什"},{id:32,name:  "和田"},{id:40,name: "伊犁"},
                {id:42,name: "塔城"}, {id:43,name: "阿勒泰"}
            ]},
            {pid:530000,cits:[
                {id:1 ,name: "昆明"},{id: 23,name:  "楚雄"},{id: 3,name: "曲靖"},{id: 4,name: "玉溪"},
                {id: 5,name: "保山"}, {id:6 ,name:"昭通"},{id:25 ,name:"红河"},{id: 26,name: "文山"},
                {id:27 ,name: "思茅"}, {id:28,name: "西双版纳"},{id:29,name:  "大理"},{id:31,name: "德宏"},
                {id:32,name: "丽江"}, {id:33,name: "怒江"}, {id:34,name: "迪庆"},{id:35,name: "临沧"},
                {id:28,name: "密云县"}, {id:29,name: "延庆县"}
            ]},
            {pid:330000,cits:[
                {id:1 ,name: "杭州"},{id: 2,name:  "宁波"},{id: 3,name: "温州"},{id: 4,name: "嘉兴"},
                {id: 5,name: "湖州"}, {id:6 ,name:"绍兴"},{id:7 ,name:"金华"},{id: 8,name: "衢州"},
                {id:9 ,name: "舟山"}, {id:10,name: "台州"},{id:11,name:  "丽水"}
            ]},
            {pid:610000,cits:[
                {id:1 ,name: "西安"},{id: 2,name:  "铜川"},{id: 3,name: "宝鸡"},{id: 4,name: "咸阳"},
                {id: 5,name: "渭南"}, {id:6 ,name:"延安"},{id:7 ,name:"汉中"},{id: 8,name: "榆林"},
                {id:9 ,name: "安康"}, {id:11,name: "商洛"}
            ]}

        ];
        $scope.prov = function (name,id) {
            //console.log(id);
            provinceId = id;
            for (var i=0;i<Citys.length;i++){
                if (Citys[i].pid == id){
                    $scope.Citys = Citys[i].cits;
                    $scope.isCity = true;
                }
            }
            provaname = name;
            $scope.isopen = false;

        };
        
        $scope.citaddress = function (address) {
            $scope.province = provaname + address;
            $scope.isopen = true;
            index =0;
        };
        //选择省区
        $scope.chooseProv = function () {
            $scope.isopen = false;
            index = 1;
        };
        $scope.back = function () {
            if (index ==0){
                $state.go('payment')
            }
            if (index ==1){
                $scope.isopen = true;
                $scope.isCity = false;
                 index =0;
            }
            if (index ==2){
                $scope.isaddress = false;
                $scope.isopen = true;
                index =0;
            }
        };

        // $http({
        //     url :url+"/home_nd_data.do?siteId=1&brandId=15",
        //     method : "get"
        // }).success(function (data) {
        //     // if (data.code==200){
        //     //     $scope.addressList = data.data.addressList;
        //     // }else{
        //     //     alert("删除失败")
        //     // }
        //     console.log(data)
        // });
    });
