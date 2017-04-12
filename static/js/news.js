	$(function(){
		/*
		* author:zhangmei
		* date:2016-11-1
		* function:tab切换
		*/
		$(".tab .hd ul li").on("click",function(){
			var that = this;
			if(!$(that).hasClass("current")){
				$(that).addClass("current").siblings().removeClass("current");
				var index = $(that).index();
				$(".tab .tabBox").each(function(i, o) {
                    if(i == index){
						$(".news-day i,.news-day s").attr("class","num0");
						numSlide();
						$(o).slideDown(300);
						setTimeout(function(){
							$(o).find(".newslist li").addClass("active");	
						},300)
					}else{
						$(o).slideUp(300);	
						setTimeout(function(){
							$(o).find(".newslist li").removeClass("active");
						},300)
					}
                });
			}
		})
		/*
		* author:zhangmei
		* date:2016-11-1
		* function:日期效果
		*/
		function numSlide(){
			$(".news-day i,.news-day s").each(function(i, o) {
				var num = $(o).attr("data-num");
				$(o).attr("class","num"+num);
			});  	
		}
		//numSlide();
	})