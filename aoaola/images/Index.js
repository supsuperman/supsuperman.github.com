var UserSign = function(this_sign){
    $('#user_sign').unbind('click').removeAttr('onclick');
    ZarkF.login(function(){
        ZarkAPI.userSign({
            callback: function(data){
                if (data.success){
                    $('#user_sign').text('已签到').removeClass('not_sign').addClass('is_sign');
                    $('<span style="position:absolute;top:-10px;right:19px;font-size:14px;color:#e26">金币 +1</span>').prependTo('.wrapright').animate({top:'-22px',opacity:'hide'}, 1200);
                }
            }
        });
    });
}

var cycleVar = {
    fx:         'scrollLeft',
    speed:		900,
    timeout:	5000,
    pager:		'#showbox_info_text',
    pagerEvent:	'mouseover',
    pagerAnchorBuilder: function(idx, slide){
        return '<a onclick="window.open(\''+$(slide).attr('href')+'\')" target="_blank" >'+$(slide).attr('title')+'<i class="outter">&diams;</i></a>'
    }
}

$(function(){
    if($.browser.msie){
        $("#signup_others").hover(function(){
                $(this).css({"background":"url(/img/page/other_login_bg.jpg) top center no-reteat transparent #6e6e6e","color":"#fff"});
            },function(){
                $(this).css({"background":"none","color":"#888"});
            });
        
        $("#signup_others #reg_list li").hover(function(){
               $(this).css({"background-color":"#555"});
           },function(){
               $(this).css({"background-color":"#6e6e6e"});
           });

    }


    $('#slides').slides({
				preload: true,
				preloadImage: 'img/loading.gif',
				play: 4000,
				pause: 1000,
                slideSpeed: 600,
				hoverPause: true,
				animationStart: function(current){
					$('.caption').animate({
						bottom:-80
					},200);
					if (window.console && console.log) {
						// example return of current slide number
						console.log('animationStart on slide: ', current);
					};
				},
				animationComplete: function(current){
					$('.caption').animate({
						bottom:0
					},500);
					if (window.console && console.log) {
						// example return of current slide number
						console.log('animationComplete on slide: ', current);
					};
				},
				slidesLoaded: function() {
					$('.caption').animate({
						bottom:0
					},500);
				}
			});

});

