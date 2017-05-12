$(function(){
				//判断是否有登陆缓存 cookie
				if($.cookie('name'))
				{	
					$('.weidenglu').css('display','none');
					$('.yidenglu').css('display','block');
					var html='欢迎您,'+$.cookie("name").substring(0,4)+'****'+$.cookie("name").substring(8,11);		//欢迎回来	
					$('.name').html(html);
					$('.exit').click(function(){//退出登录
						$.cookie('name',null); //删除cookie
						location.reload();//页面刷新
					})
				}
				else{//未登录
					$('.weidenglu').css('display','block');
					$('.yidenglu').css('display','none');
				}
				
				//加载底部
	            $('#foot').load("login.html #foot")	
	            
	            
//	                    //加载 mini购物车
//		        $('.cart-fix').load("cart.html .da-sidebar",function(){
//		    			sc_car()
//				                //右侧菜单js
//				        window.onscroll= function(){     //滑轮滚动事件
//						        var top1= document.body.scrollTop || document.documentElement.scrollTop;
//								if(top1>200){//如果垂直滚动条 top值大于500
//									$('.goTop').css('display','block');
//								}
//								else{
//									$('.goTop').css('display','none');
//								}
//						}
//				        
//				        //工具栏点击   工具箱 展开 active
//				        $('.sidebar-btn').click(function(){
//				        	if($('.close').css('display')=="block")//判断是否展开
//				        	{
//				        		$('.sidebar-btn').removeClass('active');//清除红色
//					        	$('.da-sidebar').animate({//合上
//							        'width':'40px',
//							    })
//					        	$('.close').css('display','none');//x隐藏
//				        	}
//				        	else{
//					        	$(this).toggleClass('active');//点击的 变红
//					        	$('.close').toggle();//x显示隐藏
//					        	$('.da-sidebar').animate({//展开
//							        'width':'320px',
//							    })
//					        	sc_msg()
//				        	}
//				        })
//				        //点击close关闭
//				        $('.close').click(function(){
//				        	$('.sidebar-btn').removeClass('active');//清除红色
//				        	$('.da-sidebar').animate({//合上
//						        'width':'40px',
//						    })
//				        	$(this).css('display','none');//x隐藏
//				        })
//		        })
        
	            
	            
	            //全部分类  划入划出 改变箭头
	            $('.ico-down').parent().mouseover(function(){
	            	$('.ico-up').hide().prev().css('display','inline-block')
	            })
	            $('.ico-down').parent().mouseout(function(){
	            	$('.ico-down').hide().next().show();
	            })
	            
	            //全部分类里的 每个 dl滑入滑出 对应的 隐藏的 dd 显示隐藏
	            	$('.dd dl').mouseover(function(){
					$('.category-drop').css('display','none');//其他 被隐藏的 dd继续隐藏
					$(this).children().eq(2).css('display','block');//隐藏 dd显示
					$(this).css('background','#fff');//背景色白色
					$(this).css('border-color','#654579');//边框变色
					$(this).css('border-right-color','#fff');//右边框无
				})
				 $('.dd dl').mouseout(function(){
				 	$('.category-drop').css('display','none');//其他 被隐藏的 dd继续隐藏
				 	$(this).css('background','#e8e3eb');//背景色恢复
				 	$(this).css('border-color','#e8e3eb');//边框恢复			 	
				 })
				//记录跳转页面localtion
				$('.navigation ul li').on('click',function(){
					if($(this).attr('data-localtion')){
						window.localStorage.setItem("data_json",$(this).attr('data-localtion'));
					}
				})
				 var $li=$('.lunbo-ul').find('li');//轮播图片
				 var $ol=$('.lunbo-xuhao').find('li');//序号
				 var index=0;
					
				/*封装 自动轮播 函数*/
				function fun(){	
					if(index==$li.length-1)
						{
							index=0;
						}
						else{
							index++;
						}
						//console.log(index);
						//淡入淡出
					$li.eq(index).stop().fadeIn().siblings().stop().fadeOut();
					$ol.eq(index).find('a').css('background','#000');//当前 变黑
					$ol.eq(index).siblings().find('a').css('background','rgba(0,0,0,.5)');//其余恢复原色
				}

				var timer=setInterval(fun,4000);
					$ol.find('a').click(function(){
						//alert($(this).html());//WW
						clearInterval(timer);
						index=$(this).html()-1;
						$li.eq(index).stop().fadeIn().siblings().stop().fadeOut();//淡如初
						$ol.eq(index).find('a').css('background','#000');//当前 变黑
						$ol.eq(index).siblings().find('a').css('background','rgba(0,0,0,.5)');//其余恢复原色
						timer=setInterval(fun,4000);
					})
				var n=0;
				//---------------------------------早上更新-------------------------------------
		$.ajax({
	        url:"data/all.json",
	        type:"GET",
	        success:function(res){
					fn_succ();
						//更换  /下一页
					$('.change').click(function(){
						//alert(1);
						//console.log(Math.ceil(res.length/6)-1);
						if(n==Math.ceil(res.length/6)-1){
							n=0;
						}
						else{
							n++;
						}
						console.log(n);
						
						fn_succ();

					})
							
					function fn_succ(){
							var html='';
							//console.log(res.length);//WW
							for(var i = 4*n; i <4*(n+1); i++){//循环加载 第一个 ul内的 四个 li
								 if( i < res.length)
								{										
									html+='<li><a href="xiangqing.html" id="'+res[i].id+'" target="_blank" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option" id="'+res[i].id+'" nowprice='+res[i].nowprice+'>加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">'+res[i].pinglun+'人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="xiangqing.html" target="_blank"id="'+res[i].id+'">'+res[i].title+'</a></p></div></li>';
								}
								//console.log(html);
							}
						//console.log(html);// WW
						//console.log($('.w285'));//WW
							$('.w285')[0].innerHTML=html;
							var html2='';
							//console.log(res.length);//WW
							for(var i = 6*(n+1)-2; i <6*(n+1); i++){//循环加载 第二个 ul  即 第 5 6
								 if( i < res.length)
								{
									html2+='<li><a href="xiangqing.html" target="_blank" id="'+res[i].id+'" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option" id="'+res[i].id+'"  nowprice='+res[i].nowprice+'>加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">'+res[i].pinglun+'人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="xiangqing.html" target="_blank" id="'+res[i].id+'">'+res[i].title+'</a></p></div></li>';
									//html2+='<li><a href="#" target="_blank"><img src='+res[i].url+' title='+res[i].name+'/></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res[i].title+'</a></p></div></li>';
								}
								//console.log(html2);
							}
						//console.log(html);// WW
						//console.log($('.w285'));//WW
							$('.w589')[0].innerHTML=html2;
							/*加入购物车 的显示与隐藏*/
							$('.option').parent().parent().mouseover(function(){
								//alert(1);
								$(this).find('.option').css('display','block');
							})
							$('.option').parent().parent().mouseout(function(){
								//alert(1);
								$(this).find('.option').css('display','none');
							})
							//跳转详情页 的链接 点击后 存储当前 商品的id
							console.log($('.index-new-box ul li').find('a'));
							$('.index-new-box ul li').find('a').click(function(){
								console.log(1);
						    	$.cookie('id',$(this).attr('id'))
						    })
					}

						
      		}
    	})


			//原生ajax
//				var ajax=new XMLHttpRequest();
//				ajax.open('GET','data/index-new.json',true);//打开
//				ajax.send(null);//发送
//				ajax.onreadystatechange=function(){//判断
//					if(ajax.readyState==4&&ajax.status==200)
//					{	//console.log(ajax.responseText);
//						res = eval(ajax.responseText)
//              		fn_succ();
//						//console.log(res)					
//						//console.log(res.length/24);
//			        }
//				}
//				
//						//更换  /下一页
//						var n=0;	
//						$('.change').click(function(){
//							//alert(1);
//							//console.log(Math.ceil(res.length/6)-1);
//							if(n==Math.ceil(res.length/6)-1){
//								n=0;
//							}
//							else{
//								n++;
//							}
//							console.log(n);
//							fn_succ();
//						})
//				//封装的动态加载 函数
//				function fn_succ(){
//								var html='';
//								//console.log(res.length);//WW
//								for(var i = 4*n; i <4*(n+1); i++){//循环加载 第一个 ul内的 四个 li
//									 if( i < res.length)
//									{										
//										html+='<li><a href="#" target="_blank" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option">加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res[i].title+'</a></p></div></li>';
//									}
//									//console.log(html);
//								}
//							//console.log(html);// WW
//							//console.log($('.w285'));//WW
//								$('.w285')[0].innerHTML=html;
//								
//								
//								var html2='';
//								//console.log(res.length);//WW
//								for(var i = 6*(n+1)-2; i <6*(n+1); i++){//循环加载 第二个 ul  即 第 5 6
//									 if( i < res.length)
//									{
//										html2+='<li><a href="#" target="_blank" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option">加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res[i].title+'</a></p></div></li>';
//										//html2+='<li><a href="#" target="_blank"><img src='+res[i].url+' title='+res[i].name+'/></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res[i].title+'</a></p></div></li>';
//									}
//									//console.log(html2);
//								}
//							//console.log(html);// WW
//							//console.log($('.w285'));//WW
//								$('.w589')[0].innerHTML=html2;
//								/*加入购物车 的显示与隐藏*/
//								$('.option').parent().parent().mouseover(function(){
//									//alert(1);
//									$(this).find('.option').css('display','block');
//								})
//								$('.option').parent().parent().mouseout(function(){
//									//alert(1);
//									$(this).find('.option').css('display','none');
//								})
//				}//封装结束


				//---------------------------------------大家都说好  json加载--------------------------
		$.ajax({
	        url:"data/index-good.json",
	        type:"GET",
	        success:function(res){
	        	//console.log(1);
	        	fn_succ2();
	        	//更换 tab/选项卡
				$('.index-good-tab').find('li').click(function(){
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
					//alert($(this).index());//WW
					n=$(this).index();
					fn_succ2();
				})
				//封装的动态加载 函数
	        	function fn_succ2(){
					var html='';
					//console.log(res2.length);//WW
					for(var i = 6*n; i <6*(n+1); i++){//循环加载 第一个 ul内的 四个 li
						 if( i < res.length)
						{	

						html+='<li><a href="liebiao.html" target="_blank" class="cover-img"><img src="'+res[i].url+'" title="'+res[i].name+'"/></a><div class="sign" style="background:url('+res[i].tip+')no-repeat"></div><div class="data"><p class="price clear"><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><a href="liebiao.html" target="_blank" class="title">'+res[i].title+'</a><a href="#" target="_blank"><div class="comment"><img class="face" src="'+res[i].face+'"/><div class="comment-text"><p>'+res[i].pinglun+'</p>'+res[i].tongji+'</div></div></a></div></li>'
						}
					}
	        		$('.good-ul')[0].innerHTML=html;
				}
      		}
    	})
//			//ajax  大家都说好  原生
//				var ajax2=new XMLHttpRequest();
//				ajax2.open('GET','data/index-good.json',true);//打开
//				ajax2.send(null);//发送
//				ajax2.onreadystatechange=function(){//判断
//					if(ajax2.readyState==4&&ajax2.status==200)
//					{	//console.log(ajax2.responseText);
//						res2 = eval(ajax2.responseText)
//              		fn_succ2();
//						//console.log(res2)					
//						//console.log(res2.length/24);
//			        }
//				}
//				
//						//tab点击更换
//						var n=0;
//							$('.index-good-tab').find('li').click(function(){
//									$(this).siblings().removeClass('active');
//									$(this).addClass('active');
//									//alert($(this).index());//WW
//									n=$(this).index();
//									fn_succ2();
//								})
//					//封装的动态加载 函数
//				function fn_succ2(){
//								//console.log(n);
//								var html='';
//								//console.log(res2.length);//WW
//								for(var i = 6*n; i <6*(n+1); i++){//循环加载 第一个 ul内的 四个 li
//									 if( i < res2.length)
//									{										
//										//html+='<li><a href="#" target="_blank" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option">加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res[i].title+'</a></p></div></li>';
//										html+='<li><a href="#" target="_blank" class="cover-img"><img src="'+res2[i].url+'" title="'+res2[i].name+'"/></a><div class="sign" style="background:url('+res2[i].tip+')no-repeat"></div><div class="data"><p class="price clear"><span class="red">¥</span><span class="now-price">'+res2[i].nowprice+'</span><span class="old-price">'+res2[i].oldprice+'</span></p><a href="javascript:;" target="_blank" class="title">'+res2[i].title+'</a><a href="#" target="_blank"><div class="comment"><img class="face" src="'+res2[i].face+'"/><div class="comment-text"><p>'+res2[i].pinglun+'</p>'+res2[i].tongji+'</div></div></a></div></li>'
//									}
//									//console.log(html);
//								}
//							//console.log(html);// WW
//							//console.log($('.w285'));//WW
//								$('.good-ul')[0].innerHTML=html;
//								
//				}//封装结束
			
								//-------------------------------黑马  json加载------------------------------
		$.ajax({
	        url:"data/index-newest.json",
	        type:"GET",
	        success:function(res){
	        	//console.log(1);
	        	fn_succ3();
	        	//封装
	        	function fn_succ3(){
								//console.log(n);
								var html='';
								//console.log(res.length);//WW
								for(var i = 6*n; i <6*(n+1); i++){//循环加载 第一个 ul内的 四个 li
									 if( i < res.length)
									{										
										//html+='<li><a href="#" target="_blank" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option">加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res[i].title+'</a></p></div></li>';
										html+='<li><a href="liebiao.html" target="_blank" class="cover-img"><img src="'+res[i].url+'" title="'+res[i].name+'"/></a><div class="data"><p class="price clear"><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><a href="liebiao.html" target="_blank" class="title">'+res[i].title+'</a><a href="#" target="_blank"><div class="comment"><div class="comment-text"><p>推荐理由:</br>'+res[i].pinglun+'</p></div></div></a></div></li>'
									}
									//console.log(html);
								}
							//console.log(html);// WW
							//console.log($('.w285'));//WW
								$('.newest-ul')[0].innerHTML=html;
								
								
				}//封装结束

	        }
	    })
			//ajax  原生 黑马
//				var ajax3=new XMLHttpRequest();
//				ajax3.open('GET','data/index-newest.json',true);//打开
//				ajax3.send(null);//发送
//				ajax3.onreadystatechange=function(){//判断
//					if(ajax3.readyState==4&&ajax3.status==200)
//					{	//console.log(ajax2.responseText);
//						res3 = eval(ajax3.responseText)
//              		fn_succ3();
//						//console.log(res3)					
//						//console.log(res3.length/24);
//			        }
//				}
//				
//					var n=0;
//					//封装的动态加载 函数
//				function fn_succ3(){
//								//console.log(n);
//								var html='';
//								//console.log(res3.length);//WW
//								for(var i = 6*n; i <6*(n+1); i++){//循环加载 第一个 ul内的 四个 li
//									 if( i < res3.length)
//									{										
//										//html+='<li><a href="#" target="_blank" class="new-li-img"><img src='+res3[i].url+' title='+res3[i].name+'/><div class="option">加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">人收藏</span><span class="red">¥</span><span class="now-price">'+res3[i].nowprice+'</span><span class="old-price">'+res3[i].oldprice+'</span></p><p class="title"><span class="red">'+res3[i].zhekou+'</span><a href="javascript:;" target="_blank">'+res3[i].title+'</a></p></div></li>';
//										html+='<li><a href="#" target="_blank" class="cover-img"><img src="'+res3[i].url+'" title="'+res3[i].name+'"/></a><div class="data"><p class="price clear"><span class="red">¥</span><span class="now-price">'+res3[i].nowprice+'</span><span class="old-price">'+res3[i].oldprice+'</span></p><a href="javascript:;" target="_blank" class="title">'+res3[i].title+'</a><a href="#" target="_blank"><div class="comment"><div class="comment-text"><p>推荐理由:</br>'+res3[i].pinglun+'</p></div></div></a></div></li>'
//									}
//									//console.log(html);
//								}
//							//console.log(html);// WW
//							//console.log($('.w285'));//WW
//								$('.newest-ul')[0].innerHTML=html;
//								
//				}//封装结束

	        })//js结尾