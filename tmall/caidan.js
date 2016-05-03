
				dingwei();
				$(window).scroll(dingwei);	//让卷动窗口的时候，执行定位函数
				$(window).resize(dingwei);	//让改变窗口尺寸的时候，执行定位函数

				//定位函数：
				function dingwei(){
					var A = $(window).scrollTop();
					var B = $(window).height();
					var C = $("#subnav ul").outerHeight(true);

					$("#subnav ul").stop();
					$("#subnav ul").animate(
						{
							"top":A+(B-C)/2
						}
					,1000);
				}

				
		