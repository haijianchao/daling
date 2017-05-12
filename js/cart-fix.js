$(function(){
	
				        //加载banner图
		        $('#div-banner').load("index.html #banner",function(){
		        	sc_car();
		        })
	
	
			
					//加载nav
		        $('.div-nav').load("index.html .nav",function(){
			             $('.ico-down').parent().parent().mouseover(function(){
			            	$('.ico-up').hide().prev().css('display','inline-block')
			            	$('.fenlei').find('.dd').css('display','block');
			            })
			            $('.ico-down').parent().parent().mouseout(function(){
			            	$('.ico-down').hide().next().show();
			            	$('.fenlei').find('.dd').css('display','none');
			            })
			            //全部分类里的 每个 dl滑入滑出 对应的 隐藏的 dd 显示隐藏
						    console.log($('.nav').length);
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
		        })
	
	
			//加载 mini购物车
		        $('.cart-fix').load("cart.html .da-sidebar",function(){
		    			sc_car()
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
				        		$('.sidebar-btn').removeClass('active');//清除红色
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
					        	sc_msg()
				        	}
				        })
				        //点击close关闭
				        $('.close').click(function(){
				        	$('.sidebar-btn').removeClass('active');//清除红色
				        	$('.da-sidebar').animate({//合上
						        'width':'40px',
						    })
				        	$(this).css('display','none');//x隐藏
				        })
		        })
		        
		        
		sc_msg()
    	//页面刷新时获取购物车数量;
		sc_car()
			//事件委托
			$('.w285').on('click','.option',function(event){
	    	var id=this.id;
	    	//console.log(id);
			var nowprice=$(this).attr('nowprice');
			//购物车数量增加;
			var id = this.id
			var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
			var same = false;//判断时候已经追加
			//是否是第一次添加
			if(first){
				//第一次添加,建立json结构。
				$.cookie('goods','[{id:'+id+',nowprice:'+nowprice+',num:1}]');
				$.cookie('first','false');
			}else{
				var str = $.cookie('goods');
				var arr = eval(str);
				//遍历所有对象。如果id相同，让该商品数量递增 ;
				for(var attr in arr){
					if(arr[attr].id == id){		
						arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
						var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
						$.cookie('goods',cookieStr);
						same = true;
					}
				}
				//如果id不同，重新建立商品对象;
				
				if(!same){
					var obj  = {id:id,nowprice:nowprice,num:1};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods',cookieStr);
				}
			}
			sc_car()
			sc_msg()
	    	return false;
	    })
			
			//如果 cookie为空 购物车 显示 购物车图标
			if(!$.cookie('goods')){
				$('.cart-table-none').css('display','block');
			}
			
			
		//购物车商品数量;
		function sc_car(){
			//如果 cookie为空 购物车 显示 购物车图标
			if(!$.cookie('goods')){
				$('.cart-table-none').css('display','block');
			}
			
			var sc_str = $.cookie('goods');
			if(sc_str){//如果购物车cookie不为空。
				var sc_obj = eval(sc_str);
				var sc_num = 0 ; 
				for(var i in sc_obj){
					sc_num = Number(sc_obj[i].num) + sc_num;
				}
				$('.ico-number').html(sc_num);
				$('.head-cart-count').html(sc_num);
				$('.count').html(sc_num);
			}
				var str = $.cookie('goods');
				var arr = eval(str);
				var price=0;
				//遍历所有对象。把他们的价钱 相加;
				for(var attr in arr){
					price+=parseFloat(arr[attr].nowprice*arr[attr].num);
				}
				$('.amount').find('span').html(price+'.00');
				$('.sumprice').find('span').html(price+'.00');
		}
		
		
		
		//右侧 购物车 工具栏
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
							html += '<div class="cart-list"><ul class=" clear goods"><li class="td td-good"><a href="xiangqing.html" class="clear"  target="_blank" id='+res[sc_obj[i].id-1].id+' title='+res[sc_obj[i].id-1].name+'><img class="img" src='+res[sc_obj[i].id-1].url+' /></a><a href="javascript:;"id='+res[sc_obj[i].id-1].id+' class="clear title-name" target="_blank"><span class="title">'+res[sc_obj[i].id-1].brank+'</span><br /><span>'+res[sc_obj[i].id-1].name+'</span></a></li><li class="td td-number"><div class="clear"><a href="javascript:;" class="btn-number f1 btn-reduce" id='+sc_obj[i].id+'><span class="ico-reduce"></span></a><input type="text" value='+sc_obj[i].num+' class="number-in" /><a href="javascript:;" class="btn-number btn-add f1" id='+sc_obj[i].id+'><span class="ico-add"></span></a></div></li><li class="td td-total">¥<span class="total">'+res[sc_obj[i].id-1].nowprice+'</span></li><li class="td td-handle"><a href="javascript:;" id='+sc_obj[i].id+'>删除</a></li></ul></div>'
						}
						$('.cart-mini-ct').html(html);
						//mini购物车 点击添加的商品 跳转至 详情页
						$('.goods').children().find('a').click(function(){
						    	$.cookie('id',$(this).attr('id'))
						   })
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
									arr[attr].num = parseInt(arr[attr].num) + 1  //让json结构中num自增。
									$('.cart-box').find('.number-in').eq(attr).val(arr[attr].num);
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
										$('.cart-box').find('.number-in').eq(attr).val(arr[attr].num);
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
										$('.cart-box').find('.number-in').eq(attr).val(arr[attr].num);
										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
										$.cookie('goods',cookieStr);
										same = true;
									}
								}
								sc_car()
					        	}
				        })
				        
				        
				        
				        
				        //删除 按钮
				        $('.td-handle').find('a').click(function(){
				        	//this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
				        	//对a→li→ul→div删除a→li→ul
				        	
				        		var id = this.id
				        		var str = $.cookie('goods');
								var arr = eval(str);
				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
								for(var attr in arr){
									if(arr[attr].id == id){	
										arr.splice(attr, 1);;  //删除
										$('.cart-box').find('.cart-list').eq(attr).remove();	//将他删除
				        				$('.cart-mini-ct').find('.cart-list').eq(attr).remove();		//在右侧购物车栏 将它删除
										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
										$.cookie('goods',cookieStr);
										same = true;
									}
								}
								sc_car()
								if($('.cart-mini-ct').find('.cart-list').length==0)
								{
									$.cookie('goods',null);
								}
								//window.location.reload();//重新加载 让购物车 页面也对应删除
								
							
					        	
				        })
				        
				        
				        
				        
				        
						
					}
				}
		})
		}
		
		
		//首页 w589 类 单独   (单独写进index.js内 sc_car()  sc_msg()说未定义
			
		$('.w589').on('click','.option',function(event){
	    	var id=this.id;
	    	//console.log(id);
			var nowprice=$(this).attr('nowprice');
			//购物车数量增加;
			var id = this.id
			var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
			var same = false;//判断时候已经追加
			//是否是第一次添加
			if(first){
				//第一次添加,建立json结构。
				$.cookie('goods','[{id:'+id+',nowprice:'+nowprice+',num:1}]');
				$.cookie('first','false');
			}else{
				var str = $.cookie('goods');
				var arr = eval(str);
				//遍历所有对象。如果id相同，让该商品数量递增 ;
				for(var attr in arr){
					if(arr[attr].id == id){		
						arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
						var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
						$.cookie('goods',cookieStr);
						same = true;
					}
				}
				//如果id不同，重新建立商品对象;
				
				if(!same){
					var obj  = {id:id,nowprice:nowprice,num:1};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods',cookieStr);
				}
			}
			sc_car()
			sc_msg()
	    	return false;
	    })
})