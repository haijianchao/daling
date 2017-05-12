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
//      $('#div-banner').load("index.html #banner",function(){
//      	sc_car();
//      })
//		//加载nav
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
        //加载 mini购物车
//      $('.cart-fix').load("cart.html .da-sidebar",function(){
//  			sc_car()
//		                //右侧菜单js
//		        window.onscroll= function(){     //滑轮滚动事件
//				        var top1= document.body.scrollTop || document.documentElement.scrollTop;
//						if(top1>200){//如果垂直滚动条 top值大于500
//							$('.goTop').css('display','block');
//						}
//						else{
//							$('.goTop').css('display','none');
//						}
//				}
//		        
//		        //工具栏点击   工具箱 展开 active
//		        $('.sidebar-btn').click(function(){
//		        	if($('.close').css('display')=="block")//判断是否展开
//		        	{
//		        		$('.sidebar-btn').removeClass('active');//清除红色
//			        	$('.da-sidebar').animate({//合上
//					        'width':'40px',
//					    })
//			        	$('.close').css('display','none');//x隐藏
//		        	}
//		        	else{
//			        	$(this).toggleClass('active');//点击的 变红
//			        	$('.close').toggle();//x显示隐藏
//			        	$('.da-sidebar').animate({//展开
//					        'width':'320px',
//					    })
//			        	sc_msg()
//		        	}
//		        })
//		        //点击close关闭
//		        $('.close').click(function(){
//		        	$('.sidebar-btn').removeClass('active');//清除红色
//		        	$('.da-sidebar').animate({//合上
//				        'width':'40px',
//				    })
//		        	$(this).css('display','none');//x隐藏
//		        })
//      })
        //尖货女装 点击
        $('.sort-name').click(function(){
        	$('.drop').css('display','inline-block');
        	
        	$('.drop').find('li').click(function(){
        		$('.drop').css('display','none');
        		$('.sort-name').html($(this).html());
        	})
        })

	$.ajax({
	        url:"data/"+window.localStorage.getItem("data_json"),
	        type:"GET",
	        dataType:'json',
	        success:function(res){
                    //1.计算分页数量
                    var showNum=40;
                    var dataL=res.length;
                    var pageNum=Math.ceil(res.length/showNum);
                    $('#Pagination').pagination(pageNum,{
                        num_edge_entries: 1, //边缘页数
                        num_display_entries: 4, //主体页数
                        items_per_page: 1, //每页显示1项
                        prev_text: "上一页",
                        next_text: "下一页",
                        callback:function(index){
							var html='';
								for(var i = index*showNum ; i < (index+1)*showNum; i++){
								 if( i < res.length)
								{										
									html+='<li><a href="xiangqing.html" target="_blank" id="'+res[i].id+'" class="new-li-img"><img src='+res[i].url+' title='+res[i].name+'/><div class="option"id='+res[i].id+' nowprice='+res[i].nowprice+'>加入购物车<span class="ico-g-cart"></span></div></a><div class="data"><p class="price clear"><span class="collect">'+res[i].pinglun+'人收藏</span><span class="red">¥</span><span class="now-price">'+res[i].nowprice+'</span><span class="old-price">'+res[i].oldprice+'</span></p><p class="title"><span class="red">'+res[i].zhekou+'</span><a href="xiangqing.html" target="_blank" id="'+res[i].id+'">'+res[i].title+'</a></p></div></li>';
								}
								//console.log(html);
							}
							$('.w285')[0].innerHTML=html;
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
						    $('.w285').children().find('a').click(function(){
						    	$.cookie('id',$(this).attr('id'))
						    })
						}
	
                    })
            }
    	})	
    	
//  	sc_msg()
//  	//页面刷新时获取购物车数量;
//		sc_car()
//			//事件委托
//			$('.w285').on('click','.option',function(event){
//	    	var id=this.id;
//	    	//console.log(id);
//			var nowprice=$(this).attr('nowprice');
//			//购物车数量增加;
//			var id = this.id
//			var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
//			var same = false;//判断时候已经追加
//			//是否是第一次添加
//			if(first){
//				//第一次添加,建立json结构。
//				$.cookie('goods','[{id:'+id+',nowprice:'+nowprice+',num:1}]');
//				$.cookie('first','false');
//			}else{
//				var str = $.cookie('goods');
//				var arr = eval(str);
//				//遍历所有对象。如果id相同，让该商品数量递增 ;
//				for(var attr in arr){
//					if(arr[attr].id == id){		
//						arr[attr].num = arr[attr].num + 1;  //让json结构中num自增。
//						var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
//						$.cookie('goods',cookieStr);
//						same = true;
//					}
//				}
//				//如果id不同，重新建立商品对象;
//				
//				if(!same){
//					var obj  = {id:id,nowprice:nowprice,num:1};
//					arr.push(obj);
//					var cookieStr = JSON.stringify(arr);
//					$.cookie('goods',cookieStr);
//				}
//			}
//			sc_car()
//			sc_msg()
//	    	return false;
//	    })
//		//购物车商品数量;
//		function sc_car(){
//			var sc_str = $.cookie('goods');
//			if(sc_str){//如果购物车cookie不为空。
//				var sc_obj = eval(sc_str);
//				var sc_num = 0 ; 
//				for(var i in sc_obj){
//					sc_num = Number(sc_obj[i].num) + sc_num;
//				}
//				$('.ico-number').html(sc_num);
//				$('.head-cart-count').html(sc_num);
//				$('.count').html(sc_num);
//			}
//				var str = $.cookie('goods');
//				var arr = eval(str);
//				var price=0;
//				//遍历所有对象。把他们的价钱 相加;
//				for(var attr in arr){
//					price+=parseFloat(arr[attr].nowprice*arr[attr].num);
//				}
//				$('.amount').find('span').html(price+'.00')
//		}
//		
//		
//		
//		//右侧 购物车 工具栏
//		function sc_msg(){
//			$.ajax({
//				url:"data/all.json",
//				type:'GET',
//				success:function(res){
//					var sc_str = $.cookie('goods');
//					if(sc_str){
//						var sc_obj = eval(sc_str);
//						var sc_num = 0 ;
//						var html = ''; 
//						for(var i in sc_obj){					
//							html += '<div class="cart-list"><ul class=" clear goods"><li class="td td-good"><a href="xiangqing.html" class="clear"  target="_blank" id='+res[sc_obj[i].id-1].id+' title='+res[sc_obj[i].id-1].name+'><img class="img" src='+res[sc_obj[i].id-1].url+' /></a><a href="javascript:;"id='+res[sc_obj[i].id-1].id+' class="clear title-name" target="_blank"><span class="title">'+res[sc_obj[i].id-1].brank+'</span><br /><span>'+res[sc_obj[i].id-1].name+'</span></a></li><li class="td td-number"><div class="clear"><a href="javascript:;" class="btn-number f1 btn-reduce" id='+sc_obj[i].id+'><span class="ico-reduce"></span></a><input type="text" value='+sc_obj[i].num+' class="number-in" /><a href="javascript:;" class="btn-number btn-add f1" id='+sc_obj[i].id+'><span class="ico-add"></span></a></div></li><li class="td td-total">¥<span class="total">'+res[sc_obj[i].id-1].nowprice+'</span></li><li class="td td-handle"><a href="javascript:;" id='+sc_obj[i].id+'>删除</a></li></ul></div>'
//						}
//						$('.cart-mini-ct').html(html);
//						//mini购物车 点击添加的商品 跳转至 详情页
//						$('.goods').children().find('a').click(function(){
//						    	$.cookie('id',$(this).attr('id'))
//						   })
//						//购物车内 事件
//				        var x=$('.number-in').val();
//				        //console.log(x);//WW
//				        //每次点击+1 
//				        $('.btn-add').click(function(){
//				        	//alert(1);//WW
//				        	$(this).prev().val(++x);
//				        	var id = this.id
//				        	var str = $.cookie('goods');
//							var arr = eval(str);
//							//遍历所有对象。如果id相同，让该商品数量递增 ;
//							for(var attr in arr){
//								if(arr[attr].id == id){	
//									arr[attr].num = arr[attr].num + 1  //让json结构中num自增。
//									var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
//									$.cookie('goods',cookieStr);
//									same = true;
//								}
//							}
//							sc_car();
//				        	
//				        })
//				        
//				        
//				        
//				        //点一次 数量-1 最小为1
//				        $('.btn-reduce').click(function(){
//				        	if(x<=1){
//				        		$(this).next().val(1);
//				        		var id = this.id
//				        		var str = $.cookie('goods');
//								var arr = eval(str);
//				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
//								for(var attr in arr){
//									if(arr[attr].id == id){		
//										arr[attr].num = 1;  //让json结构中num自增。
//										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
//										$.cookie('goods',cookieStr);
//										same = true;
//									}
//								}
//								sc_car()
//				        	}
//				        	else{
//				        		$(this).next().val(--x);
//				        		var id = this.id
//				        		var str = $.cookie('goods');
//								var arr = eval(str);
//				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
//								for(var attr in arr){
//									if(arr[attr].id == id){	
//										arr[attr].num = arr[attr].num - 1;  //让json结构中num自增。
//										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
//										$.cookie('goods',cookieStr);
//										same = true;
//									}
//								}
//								sc_car()
//					        	}
//				        })
//				        
//				        
//				        
//				        
//				        //删除 按钮
//				        $('.td-handle').find('a').click(function(){
//				        	this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
//				        	//对a→li→ul→div删除a→li→ul
//				        	$(this).next().val(--x);
//				        		var id = this.id
//				        		var str = $.cookie('goods');
//								var arr = eval(str);
//				        		//遍历所有对象。如果id相同，让该商品数量递增 ;
//								for(var attr in arr){
//									if(arr[attr].id == id){	
//										arr.splice(attr, 1);;  //让json结构中num自增。
//										var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
//										$.cookie('goods',cookieStr);
//										same = true;
//									}
//								}
//								sc_car()
//					        	
//				        })
//				        
//				        
//				        
//				        
//				        
//						
//					}
//				}
//			})
//
//
//		}


	    //更多  点击触发事件
	    $('.more').click(function(){
	    	//判断是否是  第二次点击    第二次点击 内html为 收起
	    	if($(this).find('.text-more').html()=="收起")
	    	{
	    	$(this).find('.text-more').html("更多");//改为更多
	    	$(this).find('.ico-r').css('border-color', 'transparent transparent transparent #ccc');//箭头改为向下
	    	$(this).find('.ico-r').css('border-width','4px 7px');//边宽
	    	$(this).find('.ico-r').css('margin','-2px 3px 0 10px');//位置
	    	$(this).parent().parent().find('dd').css('height','24px');//dd高度
	    	$(this).parent().parent().find('dd').css('overflow','hidden');//溢出隐藏
	    	}
	    	else{
	    	$(this).find('.text-more').html("收起");//改为收起
	    	$(this).find('.ico-r').css('border-color', '#ccc transparent transparent');//箭头改为向下
	    	$(this).find('.ico-r').css('border-width','7px 4px');//边宽
	    	$(this).find('.ico-r').css('margin','4px 10px 0');//位置
	    	$(this).parent().parent().find('dd').css('height','auto');//dd高度  默认
	    	$(this).parent().parent().find('dd').css('overflow','visible');//溢出   默认
	    	}
	    })
	    //排序  方式
	    $('.sortinner').find('a').click(function(){
	    	$('.sortinner').find('a').removeClass('current');//其他  不红
	    	$('.sortinner').find('a').children().removeClass('ico-sort-dr');//其他 后 箭头 去红
	    	$(this).addClass('current');//当前 点击的 字体变红
	    	$(this).children().addClass('ico-sort-dr');//当前箭头变红
	    	$('.sortinner').find('.up').css('border-color','transparent transparent #c2c2c2');//up变灰
	    	$('.sortinner').find('.down').css('border-color','#c2c2c2 transparent transparent ');//down变灰
	    	$(this).children().children().eq(0).css('border-color','transparent transparent #e14958');//后箭头变红
	    	//console.log($('.sortinner').find('a').eq(1))
	    	//console.log($(this).html()=="价格");
			
	    })

})			