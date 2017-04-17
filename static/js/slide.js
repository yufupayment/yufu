$(function(){
	/*
	@author:zhangmei
	@date: 2016-11-8
	@焦点图效果完善
	*/
	//获取单个li宽度
	var oWidth = $(".slideList li").outerWidth()+90,
		oSize = $(".slideList li").size();//获取轮播图片数量
	var animate = $(".slideList");
	animate.css("width",oWidth*oSize+500);
	
	var slide = {
		//向左移
		moveLeft: function(){
			var left = parseInt(animate.css("left"));
			var next = $(".slideList li.current").next();
			if(next.length != 0){
				var index = $(".slideList li.current").index();
				var oLeft = -1 * oWidth * (index + 1);
				$(".slideList li.current").attr("class","blur").next().attr("class","current");

				animate.stop().animate({"left":oLeft + "px"},300);
				slide.fullData();
			}
		},
		//向右移
		moveRight: function(){
			var left = parseInt(animate.css("left"));
			var prev = $(".slideList li.current").prev();		
			if(prev.length != 0){
				var index = $(".slideList li.current").index();
				var oLeft = -1 * oWidth * (index - 1);
				$(".slideList li.current").attr("class","blur").prev().attr("class","current");
				animate.stop().animate({"left":oLeft + "px"},300);
				slide.fullData();
			}
		},
		fullData: function(){
			var rel = parseInt($(".slideList li.current").attr("data-rel")) + 1,
				title = $(".slideList li.current").attr("data-title");
			$(".J-rel").html(rel);
			//$(".J-title").html(title);
		}
	}
	
	
	$(".slideAl").on("click",function(){
		slide.moveRight();
	})
	$(".slideAr").on("click",function(){
		slide.moveLeft();
	})
	
	
	
})