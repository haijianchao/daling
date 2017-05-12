window.onload = function(){
	/** 每个整点自动签到一次 */
	
	//催收员半个小时自动签到
	//9点开始 18点结束 每半小时一次
	if($.getItem("roleType")=="1"){//催收员
		function autoSignIn(){
			
			//当前时间
			var time = new Date();
			//小时
			var hours = time.getHours();
			//分钟
			var mins = time.getMinutes();
			//秒钟
			var secs = time.getSeconds();
			//下一次报时间隔
			if(mins>=30){
				var next = ((60 - mins) * 60 - secs) * 1000;
			}else{
				var next = ((30 - mins) * 60 - secs) * 1000;
			}
			
			//设置下次启动时间
			setTimeout(autoSignIn,next);
					
			//整点报时，因为第一次进来mins可能不为0所以要判断
			if (mins == (0||30) && ((hours >= 9) || (hours<=18))) {
				setTimeout($.signIn("1"),1000*40);
			}
		}
		
		autoSignIn();
	}

	
}
;(function ($){
	
	/** 百度地图 */
	var globle_ak = "AGaxskm8o8YswIR02kqo2tFVKGmSNKbW";//百度地图ak
	var addBaiduAk = function(){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak="+globle_ak+"&s=1&callback=map_init";
		document.body.appendChild(script);
	}
	
	$.dialogInitialize = function() {
		var dialogHtml = '\
		<div class="dialog_msg" style="display:none;">\
			<div class="overlay"></div>\
			<div class="dialog">\
				<div class="dialog_hd"><strong class="dialog_title"></strong></div>\
				<div class="dialog_bd"></div>\
				<div class="dialog_ft">\
					<a href="javascript:;" class="btn_dialog cancel">取消</a>\
					<a href="javascript:;" class="btn_dialog primary">确定</a>\
				</div>\
			</div>\
		</div>';
		var dialog = document.createElement('div');
		dialog.innerHTML = dialogHtml;
		document.body.appendChild(dialog);
	};


	if (document.readyState === "complete" || document.readyState === "interactive" && document.body) {
		addBaiduAk();
		$.dialogInitialize();
	} else {
		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', function factorial() {
				document.removeEventListener('DOMContentLoaded', arguments.callee, false);
				addBaiduAk();
				$.dialogInitialize();
			}, false);
		} else if (document.attachEvent) {
			document.attachEvent('onreadystatechange', function() {
				if (document.readyState === 'complete') {
					document.detachEvent('onreadystatechange', arguments.callee);
					$.dialogInitialize();
				}
			});
		}
	}
	
	
	'use strict';

	/** 服务器根路径 */

	//$.globle_context = '/iclientapp';
	//$.globle_context = 'http://10.14.28.121:9080/iclientapp';
	//$.globle_context = 'http://10.43.43.25:8000/webGate';//朱志峰
	//globle_context = 'http://10.50.123.21:8000/webGate';//朱志峰
	//$.globle_context = 'http://10.50.122.60:8080/webGate';//陈伟龙
	//$.globle_context = 'http://10.14.28.121:9080/iclientapp';//深圳
	//$.globle_context = 'https://10.14.13.108:9081/iclientapp'//深圳
	//$.globle_context = 'http://218.17.132.162:9081/iclientapp';//深圳外网
	$.globle_context= 'http://10.14.15.136:9081/iclientapp';
	

	var ua = navigator.userAgent.toLocaleLowerCase();
	//是否移动设备
	var isMobile = /mobile/i.test(ua);
	var isAndroid = /android/i.test(ua);
	//是否 iOS 设备
	var isiOS = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/);
	//是否 iPhone 设备
	var isiPhone = /iphone/i.test(ua);
	// 是否 iPad 设备
	var isiPad = /ipad/i.test(ua);
	//是否在微信中运行
	var isWechat = /micromessenger/i.test(ua);

	/** 打电话 */
	$.call = function(num){
		if(num&&num!="null"){
			if(isAndroid){
				window.android.telephone(num);
			}else{
				location.href = "tel:"+num;
			}
		}else{
			$.showInfoMsg({
				title: "提示",
				text: "手机号码不存在",
				type:"msg",
				timer:1500
			});
		}
	}
	

	/** 安卓输入键盘位置自适应 */
	if (isAndroid) {
		window.addEventListener('resize', function() {
			if (document.activeElement.tagName == 'INPUT'|| document.activeElement.tagName == 'TEXTAREA') {
				window.setTimeout(function() {
					document.activeElement.scrollIntoViewIfNeeded();
				}, 0);
			}
		});
	}
 
	
	
	/** 分享到微信 */
	$.share = function(){
		if(isiPhone||isiPad||isiPad||isiOS){
			window.location.href = "share://webChat";//调用苹果分享
		}else if(isAndroid){
			window.android.share();
		}
	}
	
	
	/** 判断浏览器类型添加cordova.js */
	$.addCordova = function(){
		var head = document.getElementsByTagName('head')[0];
		if (isiPhone|isiPad|isiPad|isiOS) {
			//iOS内核
			var script1 = document.createElement('script');
			script1.src = "libs/cordova.js";
			script1.type = 'text/javascript';
			head.appendChild(script1);
			var script2 = document.createElement('script');
			script2.src = "libs/cordova_plugins.js";
			script2.type = 'text/javascript';
			head.appendChild(script2);
		}
	};


	/** 返回原生页面 */
	$.returnNative = function (msg){
		//清楚缓存数据
		localStorage.clear();
		//返回原生页面
		if(isiPhone||isiPad||isiPad||isiOS){
			//返回苹果原生界面
			window.location.href = "cordova://return/" + msg;
		}else if(isAndroid){
			//返回安卓原生界面
			if (msg) {
				window.android.closePageWithMsg(msg);
			}
			else {
				window.android.closePage();
			}
		}
	};





	/** 显示消息 */
	$.showInfoMsg = function(){

		var defaultParams = {
			title: '',//标题
			text: '',//正文
			type: null,//显示类型
			allowOutsideClick: false,//点击外框隐藏
			confirmButtonText: 'OK',//确定按钮名称
			confirmButtonColor: '#0BB20C',//确定按钮颜色
			cancelButtonText: 'Cancel',//取消按钮名称
			timer: null
		};

		var params = $.extend({}, defaultParams);

		if (arguments[0] === undefined) {
			window.console.error('至少需要一个参数');
			return false;
		}
		switch (typeof arguments[0]) {

			case 'string':
				params.title = arguments[0];
				params.text  = arguments[1] || '';
				params.type  = arguments[2] || '';

				break;

			case 'object':
				if (arguments[0].title === undefined) {
					window.console.error('缺少title参数！');
					return false;
				}
				params.title              = arguments[0].title;
				params.text               = arguments[0].text || defaultParams.text;
				params.type               = arguments[0].type || defaultParams.type;
				params.allowOutsideClick  = arguments[0].allowOutsideClick || defaultParams.allowOutsideClick;
				params.timer              = arguments[0].timer || defaultParams.timer;


				params.confirmButtonText  = (defaultParams.showCancelButton) ? 'Confirm' : defaultParams.confirmButtonText;
				params.confirmButtonText  = arguments[0].confirmButtonText || defaultParams.confirmButtonText;
				params.confirmButtonColor = arguments[0].confirmButtonColor || defaultParams.confirmButtonColor;
				params.cancelButtonText   = arguments[0].cancelButtonText || defaultParams.cancelButtonText;
				params.doneFunction       = arguments[1] || null;

				break;

			default:
				window.console.error('参数类型为string或object非' + typeof arguments[0]);
				return false;

		}

		$(".dialog_title").html(params.title);
		$(".dialog_bd").html(params.text);
		$(".primary").css("color",params.confirmButtonColor);

		$(".dialog_msg").show().find(".dialog").show().removeClass("hideAlert").addClass("showAlert");

		if (params.timer && params.timer !== "null" && params.timer !== "") {

			setTimeout(function() {
				$(".dialog_msg").hide();
				if(params.doneFunction){//回调函数
					params.doneFunction();
				}
			}, params.timer);
		}

		if(params.allowOutsideClick){
			$("body").on("tap",".overlay",function(){
				$(".dialog_msg").hide();
			})

		}

		if(params.type){
			switch (params.type) {
				case 'msg'://无确定取消
					$(".dialog_ft").hide();
					break;
				case 'alert'://确定
					$(".dialog_ft").show();
					$(".cancel").hide();
					break;
				default:
					window.console.error('不能为其他字符串，');
					return false;
			}
		}



		$("body").on("tap",".cancel",function(){//取消
			$(this).parents(".dialog_msg").hide();
		})

		$("body").on("tap",".primary",function(){//确定
			$(this).parents(".dialog_msg").hide();
			if(params.doneFunction){//回调函数
				params.doneFunction();
			}
		})


	};

	/** 判断是否是数组 */
	function isArray(o){
		return Object.prototype.toString.call(o) === "[object Array]";
	}
	
		
	/** 显示loading框 */
	$.showLoading = function(textLoading){
		if($(".loading").length<1){
			$("body").append(
				'<div class="loading"><div class="loading_cover">\
					<p><i class="bb-icon-spinner icon-spin"></i></p>\
					<p>'+textLoading+'</p>\
				</div></div>');
		}
	}

	/** 发送请求 */
	$.sendPostRequest = function (url, data, callBackFunction, option){

		var defaultOpt = {
			// 是否显示loading框
			showLoading : true,
			// loading框显示文本
			textLoading : "数据加载中",
			// 请求错误回调
			error : function() {},
			// 请求错误是否显示错误信息
			showErrorMsg : true,
			// 请求完成回调
			complete : function() {}
		};
		var setting = $.extend(defaultOpt, option);

		if(setting.showLoading) {
			//显示loading框
			$.showLoading(setting.textLoading);
		}



		//设置共通请求参数
		var paramData = {
			domainAccount:$.getItem("domainAccount"),//域账号
			userName:$.getItem("userName"),//用户姓名
			roleType:$.getItem("roleType"),//角色类型
			roleName:$.getItem("roleName"),//角色名称
			groupId:$.getItem("groupId"),//催收组ID
			brCode:$.getItem("brCode"),//所属分部号
			brName:$.getItem("brName"),//所属分部名称
		};

		if(data) {
			//设置传递参数
			$.extend(paramData,data);
		}
		
		if(!isArray(url)){
			url=$.globle_context + url;
		}else{
			url=url.toString();	
		}
		
		//发送请求
		var request = $.ajax({url : url,type : "POST",data : paramData,dataType : "json",
			success : function(data) {
				
				if(data.status == 1) {
					//返回状态为成功
					if(callBackFunction) {
						//如果有回调函数则执行回调函数
						callBackFunction(data);
					}
				} else {
					if(setting.error) {
						//请求错误回调方法
						setting.error(data);
					}

					if(setting.showErrorMsg) {
						//调用接口失败 显示消息
						$.showInfoMsg({
							title: "提示",
							text: data.msg,
							type:"msg",
							timer:2000
						});

					}
				}
			},
			error : function(data) {
				if(setting.error) {
					//请求错误回调方法
					setting.error(data);
				}
			},
			complete : function(data){
				if(setting.complete) {
					//请求完成回调方法
					setting.complete(data);
				}
				if(setting.showLoading) {
					//请求结束 隐藏loading框
					$(".loading").remove();
				}
			}
		});

		return request;
	};





	/** 从URL中根据参数名获取参数值 */
	$.getUrlParam = function (name){
		var reg = new RegExp("(^|&)" + name +"=([^&]*)(&|$)");
		var r = decodeURI(window.location.search).substr(1).match(reg);
		if(r!= null)  {
			return unescape(r[2]);
		}
		return "";
	};

	/** url获取隐藏参数 */
	$.baseParemInit=function () {
		localStorage.setItem('domainAccount', $.getUrlParam("tlrno"));	
		localStorage.setItem('userName', $.getUrlParam("tlrName"));
		localStorage.setItem('roleType', $.getUrlParam("roleType"));
		localStorage.setItem('roleName', $.getUrlParam("roleName"));
		localStorage.setItem('groupId', $.getUrlParam("groupId"));
		localStorage.setItem('brCode', $.getUrlParam("brCode"));
		localStorage.setItem('brName', $.getUrlParam("brName"));
		//localStorage.setItem('credentials', $.getUrlParam("credentials"));
	};
	
	/** 返回localStorage数据 */
	$.getItem = function (name){
		if(localStorage.getItem(name) != 'null'){
			return localStorage.getItem(name);
		}else{
			return "";
		}
	}
	
	
	/** 添加水印方法 */
	$.WaterMark = function(container,options){
		this.tpl= '<canvas id="waterMark" width = "200px" height = "100px" style="display:none;"></canvas>';
		this.opt = {
			fontStyle:"24px 黑体",
			rotateAngle:-20*Math.PI/180,
			fontColor:"#ffedc6",
			text:"",
			firstLinePositionX:0,
			firstLinePositionY:80
		};
		$.extend(this.opt,options);
		this.render(container);
		this.draw(container);
	};

	$.WaterMark.prototype = {
		render:function(container){
			container.append(this.tpl);
		},
		draw:function(container){
			var cw = $("#waterMark")[0];
			var ctx=cw.getContext("2d");
			//清除img画布
			ctx.clearRect(0,0,200,100);
			ctx.font = this.opt.fontStyle;
			//文字倾斜
			ctx.rotate(this.opt.rotateAngle);
			ctx.fillStyle = this.opt.fontColor;
			ctx.fillText(this.opt.text,this.opt.firstLinePositionX,this.opt.firstLinePositionY);
			var image = new Image;
			image.src = cw.toDataURL("image/png")
			if(container){
				container.css({"background":"url("+image.src+") repeat left top"})
			}
		}

	}
	
	
	
	/** 记录页面停留时间 */
	
	var startTime = new Date().getTime();
	$.stayTime = function(data){
		var endTime= new Date().getTime();
		var stayTime = parseInt((endTime-startTime)/1000);//停留时间
		var _data = {
			stayTime:stayTime,		//停留时间  单位：秒
			parentModuleName:"",	//父级模块名 	？
			moduleName:"",			//模块名		？
			viewName:""				//画面名	？
		}
		if(data){
			$.extend(_data,data);
		}

		$.sendPostRequest(["http://10.14.28.121:9080/iclientapp/app/appViewStayTimeAnalyse"], _data, function(d){
			$.showInfoMsg({
				title: "提示",
				text: d.msg,
				type:"msg",
				timer:1500
			})
		},{
			async:false,
			showLoading:false,
			showErrorMsg: false
		})
		
		return;
	}
	
	
	var lngNo = "",latNo = "",addressDetail="",signType = "";
	
	/** 签到方法 */
	$.signIn = function(signType){
		//gpsConvert(121.663642,31.239095);
		signType = signType;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError,{
				// 指示浏览器获取高精度的位置，默认为false
				enableHighAccuracy: true,
				// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
				timeout: 20000,
				// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
				maximumAge: 3000
			});
		}else{
			$.showInfoMsg({
				title: "提示",
				text: "当前系统版本过低,暂不支持签到功能",
				type:"msg",
				timer:1500
			})
			return false;
		}
	}
		
		
	function locationSuccess(position){
		var coords = position.coords;    
		latNo = coords.latitude;
		lngNo = coords.longitude;
		//console.log(coords);
		gpsConvert(lngNo,latNo);
	}
	
	function locationError(error){
		switch(error.code) {
			case error.TIMEOUT:
				$.showInfoMsg({
					title: "提示",
					text: "定位超时，请重试",
					type:"msg",
					timer:1500
				});
				//alert("A timeout occured! Please try again!");
				break;
			case error.POSITION_UNAVAILABLE:
				$.showInfoMsg({
					title: "提示",
					text: "未开启GPS定位",
					type:"msg",
					timer:1500
				})
				//alert('We can\'t detect your location. Sorry!');
				break;
			case error.PERMISSION_DENIED:
				$.showInfoMsg({
					title: "提示",
					text: "未开通定位权限",
					type:"msg",
					timer:1500
				})
				//alert('Please allow geolocation access for this to work.');
				break;
			default: 
				$.showInfoMsg({
					title: "提示",
					text: "服务器开小差了，请稍后重试",
					type:"msg",
					timer:1500
				})
				//alert("unknow error")
			}
		
	}
	
	function gpsConvert(lngNo,latNo){
		//31.239095,121.663642
		var gpsConvertUrl = "//api.map.baidu.com/geoconv/v1/?coords=" + lngNo + "," + latNo + "&from=1&to=5&ak="+globle_ak;
		//var gpsConvertUrl = "http://api.map.baidu.com/geoconv/v1/?coords=121.663642,31.239095&from=1&to=5&ak="+globle_ak;
		$.ajax({
				url: gpsConvertUrl, type: 'get', dataType: 'jsonp', async: false,success: function (data) {
					console.log(data);
					lngNo = data.result[0].x;
					latNo = data.result[0].y;
				},complete : function(){
					lngToAddress(lngNo,latNo);
					
				}
					
		})
	}
	
	//将经纬度转换成具体的地址ajax方法
	function lngToAddress(lngNo,latNo){
			var toAddressUrl = "//api.map.baidu.com/geocoder/v2/?location="+latNo+","+lngNo+"&output=json&pois=0&ak="+globle_ak+"&callback=renderReverse";
			//var toAddressUrl = "http://api.map.baidu.com/geocoder/v2/?location=30.25924446,120.21937542&output=json&pois=0&ak="+globle_ak+"&callback=renderReverse";
			
			
			$.ajax({
				url: toAddressUrl, type: 'get', dataType: 'jsonp', async: false,success: function (data) {
					if(data.status == 0) {
						//console.log(data)
						//console.log(data.result.formatted_address)
						addressDetail = data.result.formatted_address;
						var _data = {
							colId:$.getItem("domainAccount"),		//用户ID		是
							colName:$.getItem("userName"),	//用户名称		是
							signLng:lngNo,	//签到位置经度	是
							signLat:latNo,	//签到位置纬度	是
							signAddr:addressDetail,//签到位置
							signType:signType||"0"	//签到类型		0：主动签到，1：被动签到
						}
						$.sendPostRequest("/app/saveSign", _data, function(d){
								if(_data.signType=="0"){
									$.showInfoMsg({
										title: "提示",
										text: "签到成功",
										type:"msg",
										timer:1500
									});	
								}		
					})
					}
				}
			})
	}
	

})(Zepto);