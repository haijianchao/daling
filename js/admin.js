/**
 * Created by Lenovo on 2017/3/20.
 */
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
    //页面切换




    $('#example-name').select3({
        inputType: 'Email',
        placeholder: '请输入商品名称'
    });
    $('#example-title').select3({
        inputType: 'Email',
        placeholder: '请输入商品简介'
    });
    $('#example-1').select3({
        allowClear: true,
        items: ['极致美护', '全球零食','创意生活','时尚配饰','尖货女装','3C家电'],
        placeholder: '请选择一级分类'
    });
    $('#example-4').select3({
        allowClear: true,
        items: ['早上新品', '全球好货','新品黑马'],
        placeholder: '请选择特殊分类'
    });
    $('#example-2').select3({
        allowClear: true,
        items: [{
            text: '极致美护',
            children: [ { id: 11, text: '面膜' },{ id: 12, text: '化妆水' },{ id: 13, text: '洁面' },{ id: 14, text: '防嗮' },{ id: 15, text: '面霜' },{ id: 16, text: '卸妆' },{ id: 17, text: '精华' } ]
        },{
            text: '全球零食',
            children: [ { id: 21, text: '饼干' },{ id: 22, text: '威化' },{ id: 23, text: '曲奇' },{ id: 24, text: '糕点' } ]
        },{
            text: '创意生活',
            children: [ { id: 31, text: '厨房伴侣' },{ id: 32, text: '创意礼物' },{ id: 33, text: '个人护理' },{ id: 34, text: '品质生活' } ]
        },{
            text: '时尚配饰',
            children: [ { id: 41, text: '饰品' },{ id: 42, text: '铰链' },{ id: 43, text: '奢侈' },{ id: 44, text: '包袋' },{ id: 45, text: '服饰配饰' } ]
        },{
            text: '尖货女装',
            children: [ { id: 51, text: '裙装' },{ id: 52, text: '针织裙' },{ id: 53, text: '全身群' },{ id: 54, text: '休闲裤' },{ id: 55, text: '打底裤' } ]
        },{
            text: '3C家电',
            children: [ { id: 61, text: '电脑' },{ id: 62, text: '冰箱' },{ id: 63, text: '茶具' },{ id: 64, text: '空调' } ]
        }],
        placeholder: '请选择二级分类'
    });
    $('#example-3').select3({
        inputType: 'Email',
        placeholder: '操作人编号'
    });
    $('#example-num').select3({
        inputType: 'Email',
        placeholder: '订单号'
    });
    $('#example-style').select3({
        allowClear: true,
        items: ['银联', '支付宝','微信',"QQ钱包"],
        placeholder: '请选择支付方式'
    });
    $("#begin").mdater({format:"YYYY-MM-DD"});
    $("#end").mdater({format:"YYYY-MM-DD"});
//    检查日期的合法输入
    function checkTimeLegal(startDateStr,endDateStr){
        if(startDateStr&&!endDateStr) {
            $.showInfoMsg({
                title: "提示",
                text: "请输入结束日期",
                type: "msg",
                timer: 2000
            });
            return false;
        }
        if(!startDateStr&&endDateStr){
            $.showInfoMsg({
                title: "提示",
                text: "请输入开始日期",
                type: "msg",
                timer: 2000
            });
            return false;
        }

//        判断结束日期是否合法
        if(startDateStr&&endDateStr){

            if(startDateStr>endDateStr){
                $.showInfoMsg({
                    title: "提示",
                    text: "开始日期不能大于结束日期",
                    type: "msg",
                    timer: 1500
                });
                return false;
            }
        }
        return true;
    }

    $('#require').on("click",function(){
        if(!checkTimeLegal($('#begin').val(),$('#end').val())){
            return false;
        }
    })
})