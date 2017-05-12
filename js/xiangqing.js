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
        //加载banner图
        //$('#div-banner').load("index.html #banner")	
//      $('.div-nav').load("index.html .nav",function(){
//	             $('.ico-down').parent().parent().mouseover(function(){
//	            	$('.ico-up').hide().prev().css('display','inline-block')
//	            	$('.fenlei').find('.dd').css('display','block');	            	
//	            })
//	            $('.ico-down').parent().parent().mouseout(function(){
//	            	$('.ico-down').hide().next().show();
//	            	$('.fenlei').find('.dd').css('display','none');	            	
//	            })
//	            //全部分类里的 每个 dl滑入滑出 对应的 隐藏的 dd 显示隐藏
//				    console.log($('.nav').length);
//	            	$('.dd dl').mouseover(function(){
//					$('.category-drop').css('display','none');//其他 被隐藏的 dd继续隐藏
//					$(this).children().eq(2).css('display','block');//隐藏 dd显示
//					$(this).css('background','#fff');//背景色白色
//					$(this).css('border-color','#654579');//边框变色
//					$(this).css('border-right-color','#fff');//右边框无
//				})
//				 $('.dd dl').mouseout(function(){
//				 	$('.category-drop').css('display','none');//其他 被隐藏的 dd继续隐藏
//				 	$(this).css('background','#e8e3eb');//背景色恢复
//				 	$(this).css('border-color','#e8e3eb');//边框恢复			 	
//				 })
//      }) 
		//消费者告知书  小三角 变化
        $('.tip-note-box').bind('click',function(){
				$(this).toggleClass('note-hover');
				$('.note').toggle();
				$('.ico-5-4').toggleClass('ico-5-4h');
			})
        //购买数量 +-
        var x=$('.number-input').val();
        $('.btn-add').click(function(){
        	$('.number-input').val(++x);
        })
        $('.btn-reduce').click(function(){
        	if(x<1){
        		$('.number-input').val(1);
        	}
        	else{
        	$('.number-input').val(--x);
        	}
        })
        //商品信息 / 售后服务  点击后边样式
        $('.tag-ul').find('li').click(function(){
        	$(this).siblings().removeClass('current');
        	$(this).addClass('current');

        })
        
        //放大镜
			var oMark_book =document.getElementsByClassName('goods-big')[0];
			var oPosition_box=document.getElementsByClassName('position_box')[0];
			var oB_box_all=document.getElementById('b_box_all');
			var oB_box=document.getElementById('b_box');
			 oMark_book.onmousemove = function(event){
			 	var evt=event || window.event;
				
				console.log($('.goods-big').offset().top); //cs ww
				var left,top;
				 var top1 = document.body.scrollTop || document.documentElement.scrollTop;//滚动条TOP值
				left = evt.clientX - oPosition_box.offsetWidth/2-$('.goods-big').offset().left;
				top = evt.clientY - oPosition_box.offsetHeight/2-($('.goods-big').offset().top-top1);
				//边界检测
				 left = left <0 ? 0 : left;
				 top = top <0 ? 0 : top;
				 
				 left = left > oMark_book.offsetWidth-oPosition_box.offsetWidth ? oMark_book.offsetWidth-oPosition_box.offsetWidth : left;
				 top = top > oMark_book.offsetHeight-oPosition_box.offsetHeight ? oMark_book.offsetHeight-oPosition_box.offsetHeight : top;
				oPosition_box.style.left = left + "px";
				oPosition_box.style.top = top + "px";
				
				var sx=left/(oMark_book.offsetWidth-oPosition_box.offsetWidth);
				var sy=top/(oMark_book.offsetHeight-oPosition_box.offsetHeight);
				
				oB_box_all.style.left =  -(oB_box_all.offsetWidth-oB_box.offsetWidth)*sx + "px";
				oB_box_all.style.top =  -(oB_box_all.offsetHeight-oB_box.offsetHeight)*sy + "px";				
				//oB_box_all.style.left =  -(left)*3 + "px";
				//oB_box_all.style.top =  -(top)*3 + "px";				
			}
				oMark_book.onmouseover = function(){
					oPosition_box.style.display="block";
					oB_box.style.display="block";
				}
				oMark_book.onmouseout = function(){
					oPosition_box.style.display="none";
					oB_box.style.display="none";
				}
			var n=0;
		$.ajax({
	        url:"data/all.json",
	        type:"GET",
	        success:function(res){
					fn_succ();
						//更换  /下一页
					$('.scroll-down').click(function(){
						//alert(1);
						//console.log(Math.ceil(res.length/6)-1);
						if(n==Math.ceil(10/2)-1){
							n=0;
						}
						else{
							n++;
						}
						console.log(n);
						fn_succ();
					})
						//更换  /上一页
					$('.scroll-up').click(function(){
						//alert(1);
						//console.log(Math.ceil(res.length/6)-1);
						if(n==0){
							n=4;
						}
						else{
							n--;
						}
						console.log(n);
						fn_succ();
					})		
					function fn_succ(){
							var html='';
							console.log(res[1].url);
							for(var i = 2*n; i <2*(n+1); i++){//循环加载 第一个 ul内的 四个 li
								 if( i <10)
								{										
									html+='<li><a href="xiangqing.html" target="_blank"id="'+res[i].id+'"><div class="img-ct cover-img"><img src='+res[i].url+' /></div><p class="goods-price">¥'+res[i].nowprice+'<span class="old-price">'+res[i].oldprice+'</span></p><p class="goods-title">'+res[i].name+'</p></a></li>';
								}
							$('.tuijian')[0].innerHTML=html;
							$('.tuijian').find('a').click(function(){
								$.cookie('id',$(this).attr('id'))
							})
							//利用 详情页 右侧的 动态加载的  推荐 商品 并通过 跳转该页面 传入的cookie  id得知 该商品位于json的位置  进而可 获取相应属性  替换页面的  需动态加载的属性值
							$('.detail-link').find('li').eq(1).html(res[$.cookie('id')-1].name);
							$('.goods-data').find('h1').html(res[$.cookie('id')-1].title);
							$('.goods-data').find('.nowprice').html(res[$.cookie('id')-1].nowprice);			
							$('.goods-data').find('.oldprice').html(res[$.cookie('id')-1].oldprice);
							$('.goods-data').find('.price-off').html(res[$.cookie('id')-1].zhekou);
							$('.goods-data').find('.shoucang').html(res[$.cookie('id')-1].shoucang);
							$('.goods-data').find('.kuanshi').attr('src',res[$.cookie('id')-1].url);
							$('.goods-big').find('img').attr('src',res[$.cookie('id')-1].url);
							$('#b_box_all').find('img').attr('src',res[$.cookie('id')-1].url);
							$('.da-cart-add').attr('id',$.cookie('id'));//存入id
							$('.da-cart-add').attr('nowprice',res[$.cookie('id')-1].nowprice);//存入价格

					}

				}		
      		}
    	})
			
		$('.da-cart-add').click(function(){
	    	var id=this.id;
	    	//console.log(id);
			var nowprice=$(this).attr('nowprice');
			var num=$('.number-input').val();
			console.log(num);
			//购物车数量增加;
			var id = this.id
			var first =  $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
			var same = false;//判断时候已经追加
			//是否是第一次添加
			if(first){
				//第一次添加,建立json结构。
				$.cookie('goods','[{id:'+id+',nowprice:'+nowprice+',num:'+num+'}]');
				$.cookie('first','false');
			}else{
				var str = $.cookie('goods');
				var arr = eval(str);
				//遍历所有对象。如果id相同，让该商品数量递增 ;
				for(var attr in arr){
					if(arr[attr].id == id){		
						arr[attr].num = parseInt(arr[attr].num) + parseInt(num);  //让json结构中num自增。
						var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
						$.cookie('goods',cookieStr);
						same = true;
					}
				}
				//如果id不同，重新建立商品对象;
				
				if(!same){
					var obj  = {id:id,nowprice:nowprice,num:num};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie('goods',cookieStr);
				}
			}
			sc_car()
			sc_msg()
	    	return false;
	    })	
			
			
		//购物车商品数量;
		function sc_car(){
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
				        	this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
				        	//对a→li→ul→div删除a→li→ul
				        	
				        		var id = this.id
				        		var str = $.cookie('goods');
								var arr = eval(str);
				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
								for(var attr in arr){
									if(arr[attr].id == id){	
										arr.splice(attr, 1);;  //删除
										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
										$.cookie('goods',cookieStr);
										same = true;
									}
								}
								window.location.reload();//重新加载 让购物车 页面也对应删除
								sc_car()
							
					        	
				        })
						
						
						
						
						
						

					}
				}
			})
		}	
			
			
			

        
        
})
//吸顶 条
   	window.onscroll= function(){     
        //商品信息  售后服务
        var tg=document.documentElement.getElementsByClassName('tag')[0];
        var top1= document.body.scrollTop || document.documentElement.scrollTop;
		if(top1>=699){
		  tg.style.position="fixed";
			tg.style.top=0;
			$('.detail-content').addClass('floating');//>699时 
		}
		else{
		  tg.style.position="absolute";
			tg.style.top=699+"px";
			$('.detail-content').removeClass('floating');//<699时
		}
	}