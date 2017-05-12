(function($) {
  $.fn.mdater = function(config) {
    var defaults = {
      maxDate: new Date(2531, 0, 1),
      minDate: new Date(1800, 0, 1),
	  format: 'YYYY/MM/DD h:m', //日期格式  type:'YYYY-MM-DD h:m:s'
    };
    var option = $.extend(defaults, config);
    var input = this;

    //通用函数
    var F = {
      //计算某年某月有多少天
      getDaysInMonth: function(year, month) {
        return new Date(year, month + 1, 0).getDate();
      },
      //计算某月1号是星期几
      getWeekInMonth: function(year, month) {
        return new Date(year, month, 1).getDay();
      },
      getMonth: function(m) {
        return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][m];
      },
      //计算年某月的最后一天日期
      getLastDayInMonth: function(year, month) {
        return new Date(year, month, this.getDaysInMonth(year, month));
      }
    }
	var chars = option.format.slice(4,5);//年月日分割符
	var hasHour = /h/.test(option.format);//显示时
	var hasMinute = /m/.test(option.format);//显示分
	var hasSecond = /s/.test(option.format);//显示秒
	
	var hourScroll = null;//小时滚动事件
	var minuteScroll = null;//分钟滚动事件
	var secondScroll = null;//秒滚动事件
	
	//滚动暂存时分秒
	var hh = null;
	var mm = null;
	var ss = null;
			
    //为$扩展一个方法，以配置的方式代理事件
    $.fn.delegates = function(configs) {
      el = $(this[0]);
      for (var name in configs) {
        var value = configs[name];
		
        if (typeof value == 'function') {
          var obj = {};
          obj.click = value;
          value = obj;
        };
        for (var type in value) {
          el.delegate(name, type, value[type]);
        }
      }
      return this;
    }

    var mdater = {
      value: {
        year: '',
        month: '',
        date: '',
		hour:'',
		minute:'',
		second:''
      },
      lastCheckedDate: '',
      init: function() {
        this.initListeners();
      },
	  
	  
      renderHTML: function() {
        var $html = $('<div class="md_mask"></div>\
		<div class="md_panel">\
			<div class="md_head">\
				<div class="md_selectarea"><a class="md_prev change_year" href="javascript:void(0);"><i class="bb-icon-left"></i></a><a class="md_headtext yeartag" href="javascript:void(0);"></a><a class="md_next change_year" href="javascript:void(0);"><i class="bb-icon-right"></i></a></div><div class="md_selectarea"><a class="md_prev change_month" href="javascript:void(0);"><i class="bb-icon-left"></i></a><a class="md_headtext monthtag" href="javascript:void(0);">月</a><a class="md_next change_month" href="javascript:void(0);"><i class="bb-icon-right"></i></a></div>\
			</div>\
			<div class="md_body">\
				<ul class="md_weekarea">\
					<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>\
				</ul>\
				<ul class="md_datearea in"></ul>\
				<ul class="moreYear"></ul>\
			</div>\
			<div class="md_foot flex_con">\
				<div class="flex_list wrapper hour">\
					<div id="hourWrapper"><ul class="text-center"></ul></div>\
				</div>\
				<span class="placed noFlex gray">:</span>\
				<div class="flex_list wrapper minute">\
					<div id="minuteWrapper"><ul class="text-center"></ul></div>\
				</div>\
				<span class="placed noFlex gray">:</span>\
				<div class="flex_list wrapper second">\
					<div id="secondWrapper"><ul class="text-center"></ul></div>\
				</div>\
			</div>\
			<div class="noFlex determine placed">确定</div>\
			<div class="noFlex cancel">取消</div>\
		</div>');
        if ($('.md_mask').length == 0) { $(document.body).append($html); }
		//填充小时
		var str = '';
		for(var i=0;i<24;i++){
			if(i<10){
				i='0'+i;
			}
			str+='<li>'+i+'</li>'
		}
		$('#hourWrapper ul').html(str);
		
		//填充分钟 填充秒
		var strhs = '';
		for(var i=0;i<60;i++){
			if(i<10){
				i='0'+i;
			}
			strhs+='<li>'+i+'</li>'
		}
		$('#minuteWrapper ul').html(strhs);
		$('#secondWrapper ul').html(strhs);
		
        return $html;
      },
      _showPanel: function(container) {
		  
        this.refreshView();
        $('.md_panel, .md_mask').addClass('show');
      },
      _hidePanel: function() {
        $('.md_panel, .md_mask').remove();
		
		//销毁节省资源
		hourScroll.destroy();
		minuteScroll.destroy(); 
		secondScroll.destroy();
      },
      _changeMonth: function(add, checkDate) {

        //先把已选择的日期保存下来
        this.saveCheckedDate();

        var monthTag = $('.md_selectarea').find('.monthtag'),
			num = ~~monthTag.data('month') + add;
        //月份变动发生了跨年
        if (num > 11) {
			num = 0;
			this.value.year++;
			$('.yeartag').text(this.value.year+"年").data('year', this.value.year);
        } else if (num < 0) {
			num = 11;
			this.value.year--;
			$('.yeartag').text(this.value.year+"年").data('year', this.value.year);
        }

        var nextMonth = F.getMonth(num) + '月';
        monthTag.text(nextMonth).data('month', num);
        this.value.month = num;
        if (checkDate) {
			this.value.date = checkDate;
        } else {
			//如果有上次选择的数据，则进行赋值
			this.setCheckedDate();
        }
        this.updateDate(add);
      },
      _changeYear: function(add) {
        //先把已选择的日期保存下来
        this.saveCheckedDate();

        var yearTag = $('.md_selectarea').find('.yeartag'),
          num = ~~yearTag.data('year') + add;
        yearTag.text(num + '年').data('year', num);
        this.value.year = num;
        this.setCheckedDate();

        this.updateDate(add);
      },
      //保存上一次选择的数据
      saveCheckedDate: function() {
        if (this.value.date) {
			this.lastCheckedDate = {
				year: this.value.year,
				month: this.value.month,
				date: this.value.date,
				hour:this.value.hour,
				minute:this.value.minute,
				second:this.value.second
			}
        }
      },
      //将上一次保存的数据恢复到界面
      setCheckedDate: function() {
        if (this.lastCheckedDate && this.lastCheckedDate.year == this.value.year && this.lastCheckedDate.month == this.value.month) {
          this.value.date = this.lastCheckedDate.date;
        } else {
          this.value.date = '';
        }
      },
      //根据日期得到渲染天数的显示的HTML字符串
      getDateStr: function(y, m, d,h,mi,s) {
        var dayStr = '';
        //计算1号是星期几，并补上上个月的末尾几天
        var week = F.getWeekInMonth(y, m);
        var lastMonthDays = F.getDaysInMonth(y, m - 1);
        for (var j = week - 1; j >= 0; j--) {
          dayStr += '<li class="prevdate" data-day="' + (lastMonthDays - j) + '">' + (lastMonthDays - j) + '</li>';
        }
        //再补上本月的所有天;
        var currentMonthDays = F.getDaysInMonth(y, m);
        //判断是否超出允许的日期范围
        var startDay = 1,
			endDay = currentMonthDays,
			thisDate = new Date(y, m, d),
			firstDate = new Date(y, m, 1);
			lastDate = new Date(y, m, currentMonthDays),
			minDateDay = option.minDate.getDate();


        if (option.minDate > lastDate) {
          startDay = currentMonthDays + 1;
        } else if (option.minDate >= firstDate && option.minDate <= lastDate) {
          startDay = minDateDay;
        }

        if (option.maxDate) {
          var maxDateDay = option.maxDate.getDate();
          if (option.maxDate < firstDate) {
            endDay = startDay - 1;
          } else if (option.maxDate >= firstDate && option.maxDate <= lastDate) {
            endDay = maxDateDay;
          }
        }


        //将日期按允许的范围分三段拼接
        for (var i = 1; i < startDay; i++) {
          dayStr += '<li class="disabled" data-day="' + i + '">' + i + '</li>';
        }
        for (var j = startDay; j <= endDay; j++) {
          var current = '';
          if (y == this.value.year && m == this.value.month && d == j) {
            current = 'current';
          }
          dayStr += '<li class="' + current + '" data-day="' + j + '">' + j + '</li>';
        }
        for (var k = endDay + 1; k <= currentMonthDays; k++) {
          dayStr += '<li class="disabled" data-day="' + k + '">' + k + '</li>';
        }

        //再补上下个月的开始几天
        var nextMonthStartWeek = (currentMonthDays + week) % 7;
        if (nextMonthStartWeek !== 0) {
          for (var i = 1; i <= 7 - nextMonthStartWeek; i++) {
            dayStr += '<li class="nextdate" data-day="' + i + '">' + i + '</li>';
          }
        }

	
		//回显小时
		hourScroll.scrollTo(0, -h*20, 1000, IScroll.utils.ease.elastic);
		minuteScroll.scrollTo(0, -mi*20, 1000, IScroll.utils.ease.elastic);
		secondScroll.scrollTo(0, -s*20, 1000, IScroll.utils.ease.elastic);
		
        return dayStr;
      },
	  
      updateDate: function(add) {
        var dateArea = $('.md_datearea.in');
        if (add > 0) {
          var c1 = 'out_left';
          var c2 = 'out_right';
        } else {
          var c1 = 'out_right';
          var c2 = 'out_left';
        }
        var newDateArea = $('<ul class="md_datearea ' + c2 + '"></ul>');
		
		//333333333333333
		// 年月日 时分秒
		if(hasHour&&hasMinute&&hasSecond){
			newDateArea.html(this.getDateStr(this.value.year, this.value.month, this.value.date,this.value.hour,this.value.minute,this.value.second));
			
		}else if(hasHour&&hasMinute&&!hasSecond){//年月日 时分
			newDateArea.html(this.getDateStr(this.value.year, this.value.month, this.value.date,this.value.hour,this.value.minute));
		}else{
			newDateArea.html(this.getDateStr(this.value.year, this.value.month, this.value.date));
		}

		
        $('.md_body').append(newDateArea);
		$(".moreYear").remove();
		$(".md_body").append('<ul class="moreYear"></ul>');
        setTimeout(function() {
			newDateArea.removeClass(c2).addClass('in');
			dateArea.removeClass('in').addClass(c1);
	
        }, 0);
      },
      //每次调出panel前，对界面进行重置
      refreshView: function() {
        if (this.input.hasClass('input-group')) {
          var initVal = this.input.children('input').val();
        } else {
          var initVal = this.input.val();
        }
        var date = null;
		

		//如果input有值
        if (initVal) {

			/*
			 * 1、只有年月日
			 * 2、年月日 时 分
			 * 3、年月日 时 分 秒
			*/
			// 年月日 时分秒
			if(hasHour&&hasMinute&&hasSecond){
		
				$(".md_foot").css("opacity",1).find(".placed").show().next(".second").show();
				var arr = initVal.split(/\s+/)[0].split(chars);
				var arr2 = initVal.split(/\s+/)[1].split(':');
				date = new Date(arr[0], arr[1] - 1,arr[2],arr2[0],arr2[1],arr2[2]);
				
			}else if(hasHour&&hasMinute&&!hasSecond){//年月日 时分
				$(".md_foot").css("opacity",1).find(".second").hide().prev(".placed").hide();
				var arr = initVal.split(/\s+/)[0].split(chars);
				var arr2 = initVal.split(/\s+/)[1].split(':');
				date = new Date(arr[0], arr[1] - 1,arr[2],arr2[0],arr2[1]);
				
				
			}else{//年月日
				$(".md_foot").css("opacity",0);
				var arr = initVal.split(chars);
				date = new Date(arr[0], arr[1] - 1,arr[2]);
				
			}

        } else {
			
			/*
			 * 1、只有年月日
			 * 2、年月日 时 分
			 * 3、年月日 时 分 秒
			*/
			// 年月日 时分秒
			if(hasHour&&hasMinute&&hasSecond){
		
				$(".md_foot").css("opacity",1).find(".placed").show().next(".second").show();

			}else if(hasHour&&hasMinute&&!hasSecond){//年月日 时分
				$(".md_foot").css("opacity",1).find(".second").hide().prev(".placed").hide();

			}else{//年月日
				$(".md_foot").css("opacity",0);

			}
			
          date = new Date();
        }


		hourScroll = new IScroll('#hourWrapper', {
			scrollX: false,
			scrollY: true,
			momentum: false,
			snap: true,
			snapSpeed: 100,
			keyBindings: true
		});

		minuteScroll = new IScroll('#minuteWrapper', {
			scrollX: false,
			scrollY: true,
			momentum: false,
			snap: true,
			snapSpeed: 100,
			keyBindings: true
		});

		secondScroll = new IScroll('#secondWrapper', {
			scrollX: false,
			scrollY: true,
			momentum: false,
			snap: true,
			snapSpeed: 100,
			keyBindings: true
		});

		var y = this.value.year = date.getFullYear(),//年
			m = this.value.month = date.getMonth(),//月
			d = this.value.date = date.getDate();//日
			h = this.value.hour = date.getHours();//时
			mi = this.value.minute = date.getMinutes();//分
			s = this.value.second = date.getSeconds();//秒


		//切换小时
		hourScroll.on("scrollEnd",function(){
			hh = Math.abs(this.y/20);
		})
		//切换小时
		minuteScroll.on("scrollEnd",function(){
			mm = Math.abs(this.y/20);
		})
		//切换小时
		secondScroll.on("scrollEnd",function(){
			ss = Math.abs(this.y/20);
		})
		
        $('.yeartag').text(y+"年").data('year', y);
        $('.monthtag').text(F.getMonth(m) + '月').data('month', m);
        var dayStr = this.getDateStr(y, m, d,h,mi,s);
        $('.md_datearea').html(dayStr);
      },
      input: null, //暂存当前指向input
      initListeners: function() {
        var _this = this;
        input.on('focus', function() {
          _this.input = $(this); //暂存当前指向input
          if ($('.md_mask').length) {
            _this._hidePanel();
          } else {
            _this.renderHTML();
            var panel = $('.md_panel'),
				mask = $('.md_mask');
            _this.afterShowPanel(mask, panel);
            setTimeout(function() {
				_this._showPanel();
            }, 50);
          }
        });
      },
      saveValueToInput: function() {
        var _this = this;
		
		//月
        var monthValue = ~~_this.value.month + 1;
        if (monthValue < 10) {
          monthValue = '0' + monthValue;
        }
		
		//日
        var dateValue = _this.value.date;
        if (dateValue === '') {
          dateValue = _this.value.date = 1;
        }
        if (dateValue < 10) {
          dateValue = '0' + dateValue;
        }
		
		//时
		if(hh){
			 var hourValue = hh;
		}else{
			var hourValue = _this.value.hour;
		}
        if (hourValue === '') {
          hourValue = _this.value.hour = 1;
        }
        if (hourValue < 10) {
          hourValue = '0' + hourValue;
        }

		//分
		if(mm){
			 var minuteValue = mm;
		}else{
			var minuteValue = _this.value.minute;
		}
        if (minuteValue === '') {
          minuteValue = _this.value.minute = 1;
        }
        if (minuteValue < 10) {
          minuteValue = '0' + minuteValue;
        }
		
		//秒
		if(ss){
			 var secondValue = ss;
		}else{
			var secondValue = _this.value.second;
		}
        
        if (secondValue === '') {
          secondValue = _this.value.second = 1;
        }
        if (secondValue < 10) {
          secondValue = '0' + secondValue;
        }

		
		var inputVal = '';
		
		// 年月日 时分秒
		if(hasHour&&hasMinute&&hasSecond){
			inputVal = _this.value.year + chars + monthValue + chars + dateValue+' '+hourValue+':'+minuteValue+':'+secondValue;
			
		}else if(hasHour&&hasMinute&&!hasSecond){//年月日 时分
			inputVal = _this.value.year + chars + monthValue + chars + dateValue+' '+hourValue+':'+minuteValue;
		}else{//年月日
			inputVal = _this.value.year + chars + monthValue + chars + dateValue;
			
		}
		
        if (_this.input.hasClass('input-group')) {
			
			_this.input.children('input').val(inputVal);
			_this.input.children('input').trigger('input');
        } else {

			_this.input.val(inputVal);
			_this.input.trigger('input');
        }
        _this._hidePanel();
      },
      afterShowPanel: function(mask, panel) {
        var _this = this;
        mask.on('click', function() {
          _this._hidePanel();
        });

		
		//整体改变年
		var nowYear = null;
		var dis = '';
        panel.delegates({
			//改变月
          '.change_month': function() {
            var add = $(this).hasClass('md_next') ? 1 : -1;
            _this._changeMonth(add);
          },
		  //改变年 ++
          '.change_year': function() {
            var add = $(this).hasClass('md_next') ? 1 : -1;
			$(".moreYear").remove();
            _this._changeYear(add);
          },
          '.out_left, .out_right': {
            'webkitTransitionEnd': function() {
				$(this).remove();
            }
          },
		  //选择天
          '.md_datearea li': function() {
            var $this = $(this);
            if ($this.hasClass('disabled')) {
              return;
            }
            _this.value.date = $this.data('day');
            //判断是否点击的是前一月或后一月的日期
            var add = 0;
            if ($this.hasClass('nextdate')) {
              add = 1;
            } else if ($this.hasClass('prevdate')) {
              add = -1;
            }
            if (add !== 0) {
              _this._changeMonth(add, _this.value.date);
            } else {
              $this.addClass('current').siblings('.current').removeClass('current');
              _this.saveValueToInput();
            }
          },
		  //点击选择年
          ".md_selectarea .yeartag":function() {
			nowYear = $(this).data("year");
			var years = '<li class="prevYear">...</li>';
			for(var i=0;i<47;i++){
				
				if(option.minDate.getFullYear() <= parseInt(nowYear+i) && parseInt(nowYear+i) <= option.maxDate.getFullYear()){
					dis='';
				}else{
					dis = 'disabled';
				}
				if(i==0){
					years+='<li class="current firstYear '+dis+'">'+parseInt(nowYear+i)+'</li>';
				}else{
					years+='<li class="'+dis+'">'+parseInt(nowYear+i)+'</li>';
				}
			}
			years+='<li class="nextYear">...</li>';
			$(".moreYear").html(years).show();
        },
		//年上一页
		'.moreYear .prevYear':function() {
			
			nowYear = $(this).next(".firstYear").text();
			if($(this).hasClass('disabled')) return;
			var years = '<li class="prevYear">...</li>';
			for(var i=47;i>0;i--){
				if(option.minDate.getFullYear() <=parseInt(nowYear-i)&&parseInt(nowYear-i)<= option.maxDate.getFullYear()){
					dis='';
				}else{
					dis = 'disabled';
				}
				if(i==47){
					years+='<li class="firstYear '+dis+'">'+parseInt(nowYear-i)+'</li>';
				}else{
					years+='<li class="'+dis+'">'+parseInt(nowYear-i)+'</li>';
				}
			}			
			years+='<li class="nextYear">...</li>';
			$(".moreYear").html(years);
        },
		//年下一页
		'.moreYear .nextYear':function() {
			
			nowYear = parseInt($(this).prev("li").text());

			if($(this).hasClass('disabled')) return;
			
			var years = '<li class="prevYear">...</li>';
			for(var i=1;i<48;i++){
				
				if(option.minDate.getFullYear() <= parseInt(nowYear+i)&&parseInt(nowYear+i) <= option.maxDate.getFullYear()){
					dis='';
				}else{
					dis = 'disabled';
				}
				
				if(i==1){
					years+='<li class="firstYear '+dis+'">'+parseInt(nowYear+i)+'</li>';
				}else{
					years+='<li class="'+dis+'">'+parseInt(nowYear+i)+'</li>';
				}
			}
			years+='<li class="nextYear">...</li>';
			$(".moreYear").html(years);
        },
		 //点击选择年 li
		 '.moreYear li':function() {
			if($(this).hasClass('disabled')) return;
			var num = $(this).text()-$(".yeartag").data("year");
			$(this).parent().remove();
            _this._changeYear(num);
         },
		 //确定按钮
		 '.determine':function(){
			 _this.saveValueToInput();
			 
		 },
		 //取消按钮
		 '.cancel':function(){
			_this._hidePanel();
		 }
        });
      }
    }
	
	
	
    mdater.init();



	
  }
})(Zepto);
