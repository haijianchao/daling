
				//封装 手机号 提示功能
				function fun(){
					var re=/^[1]\d{10}$/;
					var tel=$('.d_tel_i').val();
						//alert(1); //ww
						//console.log($('.d_tel_i').val());//ww
						if(re.test(tel))
						{
							//console.log("手机号正确");//WW
							$('#tel_error').css('display','none');
							$('#tel_error').prev().removeClass('error');
						} 
						else if(tel==""){
							$('#tel_error').html("请输入手机号");
							$('#tel_error').css('display','block');
							$('#tel_error').prev().addClass('error');//出错提示 input变红
							$('#tel_error').prev().focus();
						}
						else{
							$('#tel_error').html("请输入正确的手机号码");
							$('#tel_error').css('display','block');
							$('#tel_error').prev().addClass('error');//出错提示 input变红
							$('#tel_error').prev().focus();
						}
				}
				//封装密码 input提示
				function fun2(){
					if($('#pass').val()=="")
							{	
								$('#pass_error').css('display','block');
								$('#pass_error').prev().addClass('error');//出错提示 input变红
								$('#pass_error').prev().focus();
							}
							else{
								$('#pass_error').css('display','none');
								$('#pass_error').prev().removeClass('error');//删除 变红
								$('#pass_error').prev().focus();//获得焦点
							}
						
				}
				
				
				//封装 注册手机号 提示功能
				function fun3(){
					var re=/^[1]\d{10}$/;
					var tel=$('.z_tel_i').val();
						//alert(1); //ww
						//console.log($('.z_tel_i').val());//ww
						if(re.test(tel))
						{
							//console.log(1);//WW
							$('#tel_zhuce').css('display','none');
							$('#tel_zhuce').prev().removeClass('error');
						} 
						else if(tel==""){
							$('#tel_zhuce').html("请输入手机号");
							$('#tel_zhuce').css('display','block');
							$('#tel_zhuce').prev().addClass('error');//出错提示 input变红
							$('#tel_zhuce').prev().focus();
						}
						else{
							$('#tel_zhuce').html("请输入正确的手机号码");
							$('#tel_zhuce').css('display','block');
						    $('#tel_zhuce').prev().addClass('error');//出错提示 input变红 
							$('#tel_zhuce').prev().focus();
						}
				}
				//封装注册密码 input提示
				function fun4(){
					if($('#pass2').val()=="")
							{	
								$('#pass_zhuce').css('display','block');
								$('#pass_zhuce').prev().addClass('error');//出错提示 input变红
								$('#pass_zhuce').prev().focus();
							}
							else{
								$('#pass_zhuce').css('display','none');
								$('#pass_zhuce').prev().removeClass('error');//删除 变红
								$('#pass_zhuce').prev().focus();//获得焦点
							}
						
				}
				//封装注册验证码 input提示
				function fun5(){
					if($('.yz').val()=="")
							{	$('#yz_zhuce').html("请输入验证码");
								$('#yz_zhuce').css('display','block');
								$('#yz_zhuce').prev().addClass('error');//出错提示 input变红
								$('#yz_zhuce').prev().focus();
							}
							else if($('.yz').val()!==$('.yzm').html()){
								$('#yz_zhuce').html("请输入正确的验证码");
								$('#yz_zhuce').css('display','block');
								$('#yz_zhuce').prev().addClass('error');//出错提示 input变红
								$('#yz_zhuce').prev().focus();
							}
							else{
								$('#yz_zhuce').css('display','none');
								$('#yz_zhuce').prev().removeClass('error');//删除 变红
								$('#yz_zhuce').prev().focus();//-获得焦点
							}
						
				}
				//封装注册手机验证码 input提示
				function fun6(){
					if($('.sms').val()=="")
							{	
								$('#sms_zhuce').css('display','block');
								$('#sms_zhuce').prev().addClass('error');//出错提示 input变红
								$('#sms_zhuce').prev().focus();
							}
							else{
								$('#sms_zhuce').css('display','none');
								$('#sms_zhuce').prev().removeClass('error');//删除 变红
								$('#sms_zhuce').prev().focus();//-获得焦点
							}
						
				}

									//封装一个 随机验证码
					function yanzheng(){
					var str= "0123456789abcdefghigklmnopqrstuvwxyz"+"abcdefghigklmnopqrstuvwxyz".toUpperCase();
						// alert(str);
						var str2= "";
						var n=4;
						for(var i=0;i<n;i++){
							str2 += str.charAt(parseInt(Math.random()*62));
						}
						while(true){
							//判断验证码是否含有数字
							var flag= false;
							for(var i=0;i<str2.length;i++){
								if(str2.charAt(i)>="0" && str2.charAt(i)<="9"){
									flag=true; //如果验证码含有数字，则falg=true，退出for循环
									break;
								}
							}
							//如果验证码不含有数字，则flag=false,就需要重新生成验证码
							if(flag){
								break;  //退出while循环
							}else{
								str2= "";
								for(var i=0;i<n;i++){
							     str2 += str.charAt(parseInt(Math.random()*62));
						    }   
							}
							$('.yzm').html(str2);
						}
					}
				
				
			//载入事件
			$(function(){
				//$('form').validate();
					//手机号失去焦点 验证
					$('.d_tel_i').blur(function(){
						var re=/^[1]\d{10}$/;
						var tel=$('.d_tel_i').val();
						//alert(1); //ww
						//console.log($('.d_tel_i').val());//ww
						if(re.test(tel))
						{
							//console.log(1);//WW
							//$('#tel_error').css('display','none');
						} 
						else if(tel==""){
							$('#tel_error').html("请输入手机号");
							//$('#tel_error').css('display','block');
						}
						else{
							$('#tel_error').html("请输入正确的手机号码");
							$('#tel_error').css('display','block');
							$('#tel_error').prev().addClass('error');
							//alert(1);
						}
						//手机号实时 验证
						$('.d_tel_i').keyup(function(){
						fun();
						})
						
					})

					//验证码调用
						yanzheng();
						//验证码点击  后重新 调用 验证码函数  即 换一张
						$('.yzm').click(function(){
							yanzheng();
						})
					//手机验证码
					$('.iphone-yzm').click(function(){
						var str= "0123456789abcdefghigklmnopqrstuvwxyz"+"abcdefghigklmnopqrstuvwxyz".toUpperCase();
						// alert(str);
						var str3= "";
						var n=6;
						for(var i=0;i<n;i++){
							str3 += str.charAt(parseInt(Math.random()*62));
						}
						//模拟 手机验证码  自动填写
						$('.sms').val(str3);
					})
					//注册手机号失去焦点 验证	
					$('.z_tel_i').blur(function(){
						var re=/^[1]\d{10}$/;
						var tel=$('.z_tel_i').val();
						//alert(1); //ww
						//console.log($('.z_tel_i').val());//ww
						if(re.test(tel))
						{
							//console.log(1);/WW
							//$('#tel_zhuce').css('display','none');
						} 
						else if(tel==""){
							$('#tel_zhuce').html("请输入手机号");
							//$('#tel_zhuce').css('display','block');
						}
						else{
							$('#tel_zhuce').html("请输入正确的手机号码");
							$('#tel_zhuce').css('display','block');
							$('#tel_zhuce').prev().addClass('error');
							//alert(1);
						}
						//-手机号实时 验证
						$('.z_tel_i').keyup(function(){
						fun3();
						})
						
					})
					
						//-密码 实时 验证
						$('#pass').keyup(function(){
						fun2();
						})
						//注册密码 实时 验证
						$('#pass2').keyup(function(){
						fun4();
						})
						//同意  达令用户协议时  给 此  input添加一个类
						$('.checkbox').click(function(){//input点击 √
							$('.submit_btn').toggleClass('red');//注册按钮变红
						})
						$('.xieyi-a').click(function(){//协议链接 点击
							$('.xieyi').css('display','block');//协议  显示
						})
						//点击协议的 同意并继续 会模拟点击 input
						$('.button-sure').click(function(){//点击同意
							$('.submit_btn').addClass('red');//注册按钮变为激活  红		
							$('.checkbox').prop('checked','checked');//input  打上√
							$('.xieyi').css('display','none');//协议隐藏
						})
						//协议的x点击后  关闭
						$('.xieyi-title').find('em').click(function(){
							$('.xieyi').css('display','none');//协议隐藏
						})

						
						
					//选项卡 登录注册  切换
					$('.tabs a').click(function(){
						yanzheng();//加载验证码
						$(this).siblings().removeClass('active');
						$(this).addClass('active');
						index=$(this).index();
						//alert(index); //YZ WW
						$('form').css('display','none');
						//$('form')[index].style.display='block';
						$('form').eq(index).css('display','block');
						
						//验证码调用
						yanzheng();
						//验证码点击  后重新 调用 验证码函数  即 换一张
						$('.yzm').click(function(){
							yanzheng();
						})
						
					})
					//input获得焦点变绿色
					$('input').focus(function(){
						//alert(1); YZ  WW
						$('input').parent().removeClass('current');
						$(this).parent().addClass('current');
					})
					//点击登录 按钮
					$('#denglu').click(function(){
						//alert(1); //WW
						//密码验证
						fun2();
						//密码实时 验证
						$('#pass').keyup(function(){
							fun2();
						})
						
						fun();//登录验证手机号
						//手机号 提交后 实时验证
					$('.d_tel_i').keyup(function(){
						fun();
					})
						//得到焦点后 input不变红
					if($('#tel_error').prev().focus()){
						$('#tel_error').prev().removeClass('error');
					}
						//得到焦点后 input不变红
					else if($('#pass_error').prev().focus()){
						$('#pass_error').prev().removeClass('error');
					}
							
					// 登录验证 
						var userID = $('.d_tel_i').val();
						var password = $('input[name=pass]').val();
						$.ajax({
							url:"http://datainfo.duapp.com/shopdata/userinfo.php",
							type:"POST",
							data:{
								status:"login",
								userID:userID,
								password:password
							},
							success:function(res){
								switch(res){
								case '0':
									console.log(res)
								$('.forgot').next().html("*用户不存在");
								break;
								case '2':
								$('.forgot').next().html("*密码错误");
								break;
								default:
								alert('登陆成功!')
								$.cookie('name',$('#tel').val())
								window.location.href='index.html';

				}
				
							}
						})
					
				})
			//$('input[type=checkbox]').toggleClass('tue');

			//---------------------------注册------------------------------
								//点击注册 按钮
					$('#zhuce').click(function(){
						//alert(1); //WW
						//手机验证码验证
						fun6();
						//手机验证码实时 验证
//						('.sms').keyup(function(){
//							fun6();
//						})
						//验证码验证
						fun5();
						//验证码实时 验证
						$('.yz').keyup(function(){
							fun5();
						})
						//密码验证
						fun4();
						//密码实时 验证
						$('#pass2').keyup(function(){
							fun4();
						})
						
						fun3();//登录验证手机号
						//手机号 提交后 实时验证
					$('#tel_zhuce').keyup(function(){
						fun3();
					})
						//得到焦点后 input不变红
					if($('#tel_zhuce').prev().focus()){
						$('#tel_zhuce').prev().removeClass('error');
					}
						//得到焦点后 input不变红
					else if($('#pass_error').prev().focus()){
						$('#pass_error').prev().removeClass('error');
					}
						if($('.submit_btn').eq(1).css('background-color')!='rgb(225, 73, 88)')
						{
							$('#pass_zhuce').next().html("*请接受服务条款")
						}
						
					
						
					//注册验证
						var userID = $('.z_tel_i').val();
						var password = $('#pass2').val();
						//所有条件 全正确 再求数据库
						if($('#zhuce').css('background-color')=='rgb(225, 73, 88)'&&$('.yz').val()==$('.yzm').html()&&$('.pass2').val()!==''&&$('.yz').val()!==''&&/^[1]\d{10}$/.test($('.z_tel_i').val()))
						{
							$.ajax({
								url:"http://datainfo.duapp.com/shopdata/userinfo.php",
								type:"POST",
								data:{
									status:"register",
									userID:userID,
									password:password
								},
								success:function(res){
									switch(res){
										case "0":
										$('#pass_zhuce').next().html("*用户名已存在，<a href='login.html'>请点击这里登录</a>");
										break;
										case "1":alert('恭喜，注册成功了！')
										//window.location.href='login.html';
										break;
										case "2":alert('去找后端大哥，和我没关系，他的电话号是');break;
					
									}
								}
							})
						}
				})
				
			})
