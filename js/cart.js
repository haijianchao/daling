$(function(){
				//加载底部
        $('#div-foot').load("login.html #foot")	
        //加载头部
        $('#div-head').load("index.html #head",function(){
        	//判断是否有登陆缓存 cookie  即 是否登录
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
        })


		sc_msg()
		//如果 cookie为空 购物车 显示 购物车图标
			if(!$.cookie('goods')){
				$('.data-empty').css('display','block');
			}
		
		//购物车商品数量;
		function sc_car(){
			var sc_str = $.cookie('goods');
			if(sc_str){//如果购物车cookie不为空。
				var sc_obj = eval(sc_str);
				var sc_num = 0 ; 
				for(var i in sc_obj){
					//Number() 函数把对象的值转换为数字。
					sc_num = Number(sc_obj[i].num) + sc_num;
				}
				$('.ico-number').html(sc_num);
				$('.head-cart-count').html(sc_num);
				$('.count').html(sc_num);
			}
			
				var str = $.cookie('goods');//字符串
				var arr = eval(str);//ojeect对象
				var price=0;
				//遍历所有对象。把他们的价钱 相加;
				for(var attr in arr){
					price+=parseFloat(arr[attr].nowprice*arr[attr].num);
					$('.heji').eq(attr).find('span').html(arr[attr].nowprice*arr[attr].num+'.00');
				}
				$('.amount').find('span').html(price+'.00');
				$('.sumprice').find('span').html(price+'.00');
		}
		
		
		// 购物车 商品 加载
		function sc_msg(){
			$.ajax({
				url:"data/all.json",
				type:'GET',
				success:function(res){
					var sc_str = $.cookie('goods');
					if(sc_str){
						var sc_obj = eval(sc_str);
						var sc_num = 0 ;
						var html = ''; 
						for(var i in sc_obj){	
							html +='<div class="cart-list"><ul class=" clear goods"><li class="td td-check dingdan"><input type="checkbox" class="check" /></li><li class="td td-good"><a href="xiangqing.html" class="clear"  target="_blank" id='+res[sc_obj[i].id-1].id+'  title='+res[sc_obj[i].id-1].title+'><img class="img" src='+res[sc_obj[i].id-1].url+' /></a><a href="javascript:;" id='+res[sc_obj[i].id-1].id+' class="clear title-name" target="_blank"><span class="title">'+res[sc_obj[i].id-1].brank+'</span><br /><span>'+res[sc_obj[i].id-1].name+'</span></a></li><li class="td td-price"><p>¥<span>'+res[sc_obj[i].id-1].oldprice+'</span></p></li><li class="td td-number"><div class="clear"><a href="javascript:;" class="btn-number f1 btn-reduce dingdan" id='+res[sc_obj[i].id-1].id+'><span class="ico-reduce"></span></a><input type="text" readonly value='+sc_obj[i].num+' class="number-in" /><a href="javascript:;" class="btn-number btn-add f1 dingdan" id='+res[sc_obj[i].id-1].id+'><span class="ico-add"></span></a></div></li><li class="td td-total heji">¥<span class="total">'+res[sc_obj[i].id-1].nowprice+'</span></li><li class="td td-handle dingdan"><a href="javascript:;" id='+res[sc_obj[i].id-1].id+'>删除</a></li></ul></div>'
							//html += '<div class="cart-list"><ul class=" clear goods"><li class="td td-good"><a href="xiangqing.html" class="clear"  target="_blank" id='+res[sc_obj[i].id-1].id+' title='+res[sc_obj[i].id-1].name+'><img class="img" src='+res[sc_obj[i].id-1].url+' /></a><a href="javascript:;"id='+res[sc_obj[i].id-1].id+' class="clear title-name" target="_blank"><span class="title">'+res[sc_obj[i].id-1].brank+'</span><br /><span>'+res[sc_obj[i].id-1].name+'</span></a></li><li class="td td-number"><div class="clear"><a href="javascript:;" class="btn-number f1 btn-reduce" id='+sc_obj[i].id+'><span class="ico-reduce"></span></a><input type="text" value='+sc_obj[i].num+' class="number-in" /><a href="javascript:;" class="btn-number btn-add f1" id='+sc_obj[i].id+'><span class="ico-add"></span></a></div></li><li class="td td-total">¥<span class="total">'+res[sc_obj[i].id-1].nowprice+'</span></li><li class="td td-handle"><a href="javascript:;" id='+sc_obj[i].id+'>删除</a></li></ul></div>'
						}
						//console.log(html);
						$('.cart-box').html(html);//商品信息 添加到 购物车详情页面
						$('.td-good').find('a').click(function(){//点击 记录cook 可以继续跳入详情
							$.cookie('id',$(this).attr('id'))
						})
						
						
						//$('input[type=checkbox]').is(':checked')
						//进去后 input全部勾选
						$('input[type=checkbox]').prop('checked','checked');//遍历所有$('input[type=checkbox]')添加属性
				      	
				      	
				      	//全选
				        $('.allcheck').click(function(){

							if($(this).is(':checked')){
								$('input[type=checkbox]').prop('checked','checked');//遍历所有$('input[type=checkbox]')添加属性
								sc_car();
							}
							else{
								$('input[type=checkbox]').removeProp('checked');//遍历 移除
								$('.sumprice').find('span').html(0+'.00');  //全部取消 总价为0
							}
							
				        })
				        //购物车  商品 勾选时
				        $('.check').on('click',function(){
				        	var sum=0;
				        	for(var i=0; i<$('.check').length;i++){		//遍历所有商品input
				        		if($('.check').eq(i).is(':checked'))
								{
									sum+=1;							//有一个勾选的 +1
									console.log(sum);
								}
							}
				        	if(sum==$('.check').length){			//全部勾选 是  全部勾选 按钮 勾选
				        		$('.allcheck').prop('checked','checked')
				        	}
				        	else{
				        		$('.allcheck').removeProp('checked')
				        	}

							var zongjia=$('.sumprice').find('span').html();
							if(!$(this).is(':checked')){		//若未勾选
								console.log(zongjia)
								var xiaoji=$(this).parent().parent().find('.total').html();//获取 当前商品 小计价格
								zongjia=parseInt(zongjia)-parseInt(xiaoji);		//总价 减去 小计价格
								console.log(zongjia);
								$('.sumprice').find('span').html(zongjia+'.00');//最后总价 赋值给 总计
							}
							else{         //勾选上
								var xiaoji=$(this).parent().parent().find('.total').html();//获取 当前商品 小计价格
								zongjia=parseInt(zongjia)+parseInt(xiaoji);			//总价 加上 小计价格
								console.log(zongjia);
								$('.sumprice').find('span').html(zongjia+'.00');//最后总价 赋值给 总计
							}
				        })
						
						
						//勾掉后价格不计算

						//$('.check').on('click',function(){			//点击
						//	var zongjia=$('.sumprice').find('span').html();
						//	if(!$(this).is(':checked')){		//若未勾选
						//		console.log(zongjia)
						//		var xiaoji=$(this).parent().parent().find('.total').html();//获取 当前商品 小计价格
						//		zongjia=parseInt(zongjia)-parseInt(xiaoji);		//总价 减去 小计价格
						//		console.log(zongjia);
						//		$('.sumprice').find('span').html(zongjia+'.00');//最后总价 赋值给 总计
						//	}
						//	else{         //勾选上
						//		var xiaoji=$(this).parent().parent().find('.total').html();//获取 当前商品 小计价格
						//		zongjia=parseInt(zongjia)+parseInt(xiaoji);			//总价 加上 小计价格
						//		//console.log(zongjia);
						//		$('.sumprice').find('span').html(zongjia+'.00');//最后总价 赋值给 总计
						//	}
						//})
						
						
						
						sc_car();
						//购物车内 事件
				       
				        //每次点击+1 
				        $('.btn-add').click(function(){
				        	 var x=$(this).prev().val();
				        	//alert(1);//WW
				        	$(this).prev().val(++x);
				        	var id = this.id
				        	var str = $.cookie('goods');
							var arr = eval(str);
							//遍历所有对象。如果id相同，让该商品数量递增 ;
							for(var attr in arr){
								if(arr[attr].id == id){	
									arr[attr].num = arr[attr].num + 1  //让json结构中num自增。
									$('.cart-mini-ct').find('.number-in').eq(attr).val(arr[attr].num);
									var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
									$.cookie('goods',cookieStr);
									same = true;
								}
							}
							sc_car();
				        	
				        })
				        
				        
				        
				        //点一次 数量-1 最小为1
				        $('.btn-reduce').click(function(){
				        	var x=$(this).next().val();
				        	if(x<=1){
				        		$(this).next().val(1);
				        		var id = this.id
				        		var str = $.cookie('goods');
								var arr = eval(str);
				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
								for(var attr in arr){
									if(arr[attr].id == id){		
										arr[attr].num = 1;  //让json结构中num自增。
										$('.cart-mini-ct').find('.number-in').eq(attr).val(arr[attr].num);
										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
										$.cookie('goods',cookieStr);
										same = true;
									}
								}
								sc_car()
				        	}
				        	else{
				        		$(this).next().val(--x);
				        		var id = this.id
				        		var str = $.cookie('goods');
								var arr = eval(str);
				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
								for(var attr in arr){
									if(arr[attr].id == id){	
										arr[attr].num = arr[attr].num - 1;  //让json结构中num自增。
										$('.cart-mini-ct').find('.number-in').eq(attr).val(arr[attr].num);
										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
										$.cookie('goods',cookieStr);
										same = true;
									}
								}
								sc_car()
					        	}
				        })
				        
				        
				        
				        var a=$('.jiesuan').offset().top-685;
				        //删除 按钮
				        $('.td-handle').find('a').click(function(){
				        	
				        	//this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
				        	//$('.cart-mini-ct').fin.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
				        	//对a→li→ul→div删除a→li→ul
				        	
				        		var id = this.id
				        		var str = $.cookie('goods');
								var arr = eval(str);
				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
								for(var attr in arr){
									if(arr[attr].id == id){	
										arr.splice(attr, 1);  //删除当前。
										console.log(attr);
										$('.cart-box').find('.cart-list').eq(attr).remove();	//将他删除
					        			$('.cart-mini-ct').find('.cart-list').eq(attr).remove();		//在右侧购物车栏 将它删除
										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
										$.cookie('goods',cookieStr);
										same = true;
									}
								}
								sc_car()
								if($('.cart-box').find('.cart-list').length==0)
								{
									$.cookie('goods',null);
								}

								a-=122;
								var top1= document.body.scrollTop || document.documentElement.scrollTop;
								if(top1>a){//如果垂直滚动条 top值大于(结算块的 top值-屏幕高度)
									//$('.jiesuan')[0].style.position="";//去除定位
									$('.jiesuan').removeClass('floating');//移除class  复原
								}
								else{
									//$('.jiesuan')[0].style.position="fixed";
									//$('.jiesuan')[0].style.bottom=0+'px';
									$('.jiesuan').addClass('floating');//添加class 
								}
					        	
				        })
				        
				        
				        
				        
				        
				        
				        
				        
				        //删除选中
		        		var str = $.cookie('goods');
						var arr = eval(str);
				         $('.option').find('a').eq(0).click(function(){		//删除选中商品
							 console.log($('.check').length)
				        	for(var i=0;i<$('.check').length;i++){			//对所有商品循环
				        		if($('.check').eq(i).is(':checked')){		//如果被选中
				        			$('.cart-box').find('.cart-list').eq(i).remove();	//将他删除
				        			$('.cart-mini-ct').find('.cart-list').eq(i).remove();		//在右侧购物车栏 将它删除
				        			arr.splice(i, 1);		//cookie对应删除
									same = true;
				        		}
								var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
								$.cookie('goods',cookieStr);
				        	}
					        	
					        	sc_car()
								if($('.cart-box').find('.cart-list').length==0)//判断 如果 购物车 没有商品清除cookie
								{
									$.cookie('goods',null);
								}
								
								
								a=a-122*$('.check').length;	
								var top1= document.body.scrollTop || document.documentElement.scrollTop;
								if(top1>a){//如果垂直滚动条 top值大于(结算块的 top值-屏幕高度)
									//$('.jiesuan')[0].style.position="";//去除定位
									$('.jiesuan').removeClass('floating');//移除class  复原
								}
								else{
									//$('.jiesuan')[0].style.position="fixed";
									//$('.jiesuan')[0].style.bottom=0+'px';
									$('.jiesuan').addClass('floating');//添加class 
								}
				        })
				        				        
				        				        
				        				        
				        				        
				        				        
				        				        
				        				        
				        				        
				        				        
				        
				        
				                //计算   结算块的 top值-屏幕高度
				        var a=$('.jiesuan').offset().top-$(window).height();
				        //当结算顶部 坐标大于740px
				        console.log($('.jiesuan').offset().top);
						if($('.jiesuan').offset().top>=top-$(window).height()+60){
							//alert(1);
						  	//$('.jiesuan')[0].style.position="fixed";//定位
							//$('.jiesuan')[0].style.bottom=0+'px';//定位到 屏幕底部
							$('.jiesuan').addClass('floating');//给div添加class 变宽
						}
				       window.onscroll= function(){     //滑轮滚动事件
					        var top1= document.body.scrollTop || document.documentElement.scrollTop;
							if(top1>a){//如果垂直滚动条 top值大于(结算块的 top值-屏幕高度)
								//$('.jiesuan')[0].style.position="";//去除定位
								$('.jiesuan').removeClass('floating');//移除class  复原
							}
							else{
								//$('.jiesuan')[0].style.position="fixed";
								//$('.jiesuan')[0].style.bottom=0+'px';
								$('.jiesuan').addClass('floating');//添加class 
							}
		
						}
				        
						
					}
				}
			})

		}
        
        	$('.btn-count-1').click(function(){
				
				//if($.cookie('name')==null){
				//	alert('您还没有登陆!请登录!');
				//	window.location.href("login.html")
				//}
				 if($.cookie('goods')==null){
					alert('对不起!你还没有选购商品!!!');
				}
				else{
					window.location.href="./orderInfo.html"
				}
			})
        
        
        
        
                //右侧菜单js
        window.onscroll= function(){     //滑轮滚动事件
		        var top1= document.body.scrollTop || document.documentElement.scrollTop;
				if(top1>200){//如果垂直滚动条 top值大于500
					$('.goTop').css('display','block');
				}
				else{
					$('.goTop').css('display','none');
				}
		}

        //工具栏点击   工具箱 展开 active
        $('.sidebar-btn').click(function(){
        	if($('.close').css('display')=="block")//判断是否展开
        	{
        		$('.sidebar-btn').removeClass('active');//清除黑色
	        	$('.da-sidebar').animate({//合上
			        'width':'40px',
			    })
	        	$('.close').css('display','none');//x隐藏
        	}
        	else{
	        	$(this).toggleClass('active');//点击的 变红
	        	$('.close').toggle();//x显示隐藏
	        	$('.da-sidebar').animate({//展开
			        'width':'320px',
			    })
        	}
        })
        //点击close关闭
        $('.close').click(function(){
        	$('.sidebar-btn').removeClass('active');//清除黑色
        	$('.da-sidebar').animate({//合上
		        'width':'40px',
		    })
        	$(this).css('display','none');//x隐藏
        })
        
      
})

















				        var a=$('.jiesuan').offset().top-685; //当结算顶部 坐标大于740px

						if($('.jiesuan').offset().top>=745){

							$('.jiesuan').addClass('floating');//给div添加class 变宽
						}
				       window.onscroll= function(){     //滑轮滚动事件
					    var top1= document.body.scrollTop || document.documentElement.scrollTop;
							if(top1>a){                  //如果垂直滚动条 top值大于(结算块的 top值-屏幕高度)
								$('.jiesuan').removeClass('floating');//移除class  复原
							}
							else{
								$('.jiesuan').addClass('floating');//添加class
							}

						}