var kuandu = 620; 	//这个数字是每张图片的宽度，记得按需更改
var shijian = 1000; //这个数字是动画时间
var jiangeshijian = 3000; //这个数字是间隔时间

//============================================================
//				          不用更改下面
//============================================================
var nowimg = 0; 	//信号量
var mytimer = null;

//将图片列表中的第一个节点复制，然后追加到队列的最后。
$("#czimg ul li:first").clone().appendTo("#czimg ul");

var mytimer = window.setInterval(
	function(){
		youanniu();
	}
,jiangeshijian);

$("#czlunbo").mouseenter(
	function(){
		window.clearInterval(mytimer);
	}
);

$("#czlunbo").mouseleave(
	function(){
		window.clearInterval(mytimer);
		mytimer = window.setInterval(
			function(){
				youanniu();
			}
		,jiangeshijian);
	}
);

$("#czrightbut").click(youanniu);
function youanniu(){
		if(!$("#czimg ul").is(":animated")){
			//折腾信号量
			if(nowimg < $("#czimg li").length - 2){
				nowimg = nowimg + 1;
				dongzuo();
			}else{
				nowimg = 0;
				$("#czimg ul").animate(
					{
						"left":-kuandu*($("#czimg li").length-1)
					},shijian,function(){
						$("#czimg ul").css("left",0);
					}
				);
				$("#czxinxi ul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
			}
		}
	}

$("#czleftbut").click(
	function(){
		if(!$("#czimg ul").is(":animated")){
			if(nowimg > 0){
				nowimg = nowimg - 1;
				dongzuo();
			}else{
				nowimg = $("#czimg li").length - 2;
				$("#czimg ul").css("left",-kuandu*($("#czimg li").length-1));
				$("#czimg ul").animate(
					{
						"left":-kuandu*nowimg
					},shijian
				);
				$("#czxinxi ul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
			}
		}
	}
);

$("#czxinxi ul li").click(
	function(){
		nowimg = $(this).index();
		dongzuo();
	}
);

function dongzuo(){
	//【业务1】根据信号量，来改变ul的left值
	$("#czimg ul").animate(
		{
			"left":-kuandu * nowimg
		}
		,shijian
	);

	//【业务2】根据信号量，让小圆点变蓝。
	$("#czxinxi ul li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
}