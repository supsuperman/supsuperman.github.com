function submitSearch(obj){
    if ($(obj).val() != 0) {
        $(obj).parents('form').submit();
    };
}


function writeReview(makeupid){

    if (ZarkF.getCookie('myid')){
        ZarkAPI.isActivated({
            callback: function(datas){
                if (datas.state){
                    window.location.href = '/makeup/' + makeupid +'#write_review';
                }else{
                    window.location.href = '/noactivate?referer=' + window.location.href;
                    return false;
                }
            }
        });

    }else{
        window.location.href = '/login?referer=' + window.location.href
    };

    return false;
};




function shareTo(site, review_id){
    var review_content = $('#review_content').text();
    review_content = review_content.replace( /\s+/g, " " );
    if (review_content.length > 100){
        review_content = review_content.substr(0, 100) + '...';
    };
    review_content += '\n(来自凹凹啦 http://aoaola.com/review/' + review_id + ' )';
    review_content = '//' + review_content;

    if (site === 'renren'){
       
        review_content = '凹凹啦 http://aoaola.com';
        var share_url = 'http://share.renren.com/share/buttonshare.do?link=http://aoaola.com/review/'
            + review_id + '&title=' + encodeURIComponent(review_content);
        window.open(share_url);
    }else if (site === 'txweibo'){

        var _url = '';
		var _assname = encodeURI("801145870");//你注册的帐号，不是昵称
		var _appkey = encodeURI("14c911664a7d56afa6934513e2d34942");//你从腾讯获得的appkey
		var _pic = encodeURI('http://aoaola.com' + $('#makeup_pic').attr('src'));//（例如：var _pic='图片url1|图片url2|图片url3....）
		var _u = 'http://share.v.t.qq.com/index.php?c=share&a=index&url='+_url+'&appkey='+_appkey+'&pic='+_pic+'&assname='+_assname+'&title='+encodeURIComponent(review_content);
		window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );

    }else if (site === 'sinaweibo'){
       
        var share_url = 'http://v.t.sina.com.cn/share/share.php?title=' + encodeURIComponent(review_content)
            + '&appkey=3586533339'
        window.open(share_url);
    };
};


function openPostFollow(this_follow,followed_id){
    ZarkF.login(function(){
        ZarkAPI.follow({
            followed_id: followed_id,
            callback: function(data){
                if (data.success){
                    $(this_follow).text('已关注').attr('class','btn_nofollow');
                    $(this_follow).unbind('click').removeAttr('onclick').click(function(){   
                        openPostUnFollow(this_follow,data.model_id,followed_id);
                    });

                }
            }
        });
    });

};

function openPostUnFollow(this_follow,model_id,user_id){
    ZarkF.login(function(){
        if(confirm('确认不再关注该好友?')){
            ZarkAPI.nofollow({
                model_id: model_id,
                callback: function(data){
                    if (data.success){
                        $(this_follow).text('+关注').attr('class','btn_follow');
                        $(this_follow).unbind('click').removeAttr('onclick').click(function(){   
                            openPostFollow(this_follow,user_id);
                        });

                    }
                }
            });
        }
    });

};


function ie6Hack(){
    // 屏蔽掉ie6的div a获得焦点时的虚线框
    $('div a').focus(function(){
        $(this).blur();
    });

};


function appendNoticeNum(){
    ZarkAPI.getNoticeNum({
            callback: function(data){
                if (data.notice_num){
                    $('<a class="notice_num" id="notice_num" href="/notice">'+data.notice_num+'</a>').appendTo('#login_info');
                }
            }
        });
}



$(function(){

    // 顶部导航选中样式
    if (window.location.pathname.indexOf('/news') === 0){
        $('#mainnav a[href*=news]').parent().addClass('selected_a');
    }else if(window.location.pathname.indexOf('/find') === 0){ 
        $('#mainnav a[href*=find]').parent().addClass('selected_a');
    }else if(window.location.pathname.indexOf('/pk') === 0){ 
        $('#mainnav a[href*=pk]').parent().addClass('selected_a');
    }else if(window.location.pathname.indexOf('/gift') === 0){ 
        $('#mainnav a[href*=gift]').parent().addClass('selected_a');
    }else if(window.location.pathname.indexOf('/group') === 0){ 
        $('#mainnav a[href*=group]').parent().addClass('selected_a');
    }else if(window.location.pathname.indexOf('/exchange') === 0){ 
        $('#mainnav a[href*=exchange]').parent().addClass('selected_a');
    };


    ZarkF.showForMe();
    ZarkF.showForLeader();
    ZarkF.showForOthers();
    ZarkF.showForLogin();

    if(FX.detect.browser === 'IE'){
        ie6Hack();
    }

    ZarkAPI.isLogin({callback: function(data){
        if (data.state == true){
            
            $('<a href="/user/'+data.user_id +'"><img src="'+data.user_cover+'" class="user_img"/>'+data.user_name+'<em></em></a><ul id="user_nav"><li class="clearfix"><a href="/user/'+data.user_id +'" >个人主页</a></li><li class="clearfix"><a href="/accounts/share" style="color:#EB6478;" >邀请好友</a></li><li class="clearfix"><a href="/oauth/setting" >帐号绑定</a></li><li class="clearfix"><a href="/accounts" >帐号设置</a></li><li class="clearfix"><a href="/notice" >通知中心</a></li><li class="clearfix" ><a href="javascript:void(0);" onclick="ZarkF.logout();return false;">退出</a></li></ul>').appendTo('#login_info');

            if(data.user_id == '1783'){
                $('<li class="clearfix"><a href="/group/19/topic-add-bytime" style="color:#EB6478;" >定时发布</a></li>').prependTo('#user_nav');
            }

            $('#login_info').show();
        }else{
            $('#header_btn,#header_login_btn,#header_register_btn,#top_sina,#top_qq,#top_renren').show();

        }
    }});


    $('#search_category_choose_div a').each(function(){
        var href = window.location.href;
        var query_word = href.substr(href.indexOf('query_word=') + 11);
        $(this).attr('href', $(this).attr('href') + '?query_word=' + query_word);
    });

    $('.topic_tit').each(function(){
        $(this).css('top',-($(this).height()+16));
    });



});


window.onload = appendNoticeNum;
