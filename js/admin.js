/**
 * Created by Lenovo on 2017/3/20.
 */
$(function(){
    //���صײ�
    $('#div-foot').load("login.html #foot")
    //����ͷ��
    $('#div-head').load("index.html #head",function(){
        //�ж��Ƿ��е�½���� cookie  �� �Ƿ��¼
        if($.cookie('name'))
        {
            $('.weidenglu').css('display','none');
            $('.yidenglu').css('display','block');
            var html='��ӭ��,'+$.cookie("name").substring(0,4)+'****'+$.cookie("name").substring(8,11);		//��ӭ����
            $('.name').html(html);
            $('.exit').click(function(){//�˳���¼
                $.cookie('name',null); //ɾ��cookie
                location.reload();//ҳ��ˢ��
            })
        }
        else{//δ��¼
            $('.weidenglu').css('display','block');
            $('.yidenglu').css('display','none');
        }
    })
    //ҳ���л�




    $('#example-name').select3({
        inputType: 'Email',
        placeholder: '��������Ʒ����'
    });
    $('#example-title').select3({
        inputType: 'Email',
        placeholder: '��������Ʒ���'
    });
    $('#example-1').select3({
        allowClear: true,
        items: ['��������', 'ȫ����ʳ','��������','ʱ������','���Ůװ','3C�ҵ�'],
        placeholder: '��ѡ��һ������'
    });
    $('#example-4').select3({
        allowClear: true,
        items: ['������Ʒ', 'ȫ��û�','��Ʒ����'],
        placeholder: '��ѡ���������'
    });
    $('#example-2').select3({
        allowClear: true,
        items: [{
            text: '��������',
            children: [ { id: 11, text: '��Ĥ' },{ id: 12, text: '��ױˮ' },{ id: 13, text: '����' },{ id: 14, text: '����' },{ id: 15, text: '��˪' },{ id: 16, text: 'жױ' },{ id: 17, text: '����' } ]
        },{
            text: 'ȫ����ʳ',
            children: [ { id: 21, text: '����' },{ id: 22, text: '����' },{ id: 23, text: '����' },{ id: 24, text: '���' } ]
        },{
            text: '��������',
            children: [ { id: 31, text: '��������' },{ id: 32, text: '��������' },{ id: 33, text: '���˻���' },{ id: 34, text: 'Ʒ������' } ]
        },{
            text: 'ʱ������',
            children: [ { id: 41, text: '��Ʒ' },{ id: 42, text: '����' },{ id: 43, text: '�ݳ�' },{ id: 44, text: '����' },{ id: 45, text: '��������' } ]
        },{
            text: '���Ůװ',
            children: [ { id: 51, text: 'ȹװ' },{ id: 52, text: '��֯ȹ' },{ id: 53, text: 'ȫ��Ⱥ' },{ id: 54, text: '���п�' },{ id: 55, text: '��׿�' } ]
        },{
            text: '3C�ҵ�',
            children: [ { id: 61, text: '����' },{ id: 62, text: '����' },{ id: 63, text: '���' },{ id: 64, text: '�յ�' } ]
        }],
        placeholder: '��ѡ���������'
    });
    $('#example-3').select3({
        inputType: 'Email',
        placeholder: '�����˱��'
    });
    $('#example-num').select3({
        inputType: 'Email',
        placeholder: '������'
    });
    $('#example-style').select3({
        allowClear: true,
        items: ['����', '֧����','΢��',"QQǮ��"],
        placeholder: '��ѡ��֧����ʽ'
    });
    $("#begin").mdater({format:"YYYY-MM-DD"});
    $("#end").mdater({format:"YYYY-MM-DD"});
//    ������ڵĺϷ�����
    function checkTimeLegal(startDateStr,endDateStr){
        if(startDateStr&&!endDateStr) {
            $.showInfoMsg({
                title: "��ʾ",
                text: "�������������",
                type: "msg",
                timer: 2000
            });
            return false;
        }
        if(!startDateStr&&endDateStr){
            $.showInfoMsg({
                title: "��ʾ",
                text: "�����뿪ʼ����",
                type: "msg",
                timer: 2000
            });
            return false;
        }

//        �жϽ��������Ƿ�Ϸ�
        if(startDateStr&&endDateStr){

            if(startDateStr>endDateStr){
                $.showInfoMsg({
                    title: "��ʾ",
                    text: "��ʼ���ڲ��ܴ��ڽ�������",
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