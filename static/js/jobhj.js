/**
 * Created by Nick on 2016/11/8.
 */
$(function() {
    /*
     @author:zhongcheng
     @date: 2016-11-8
     @大屏轮播
     */

    //获取单个li宽度
    var banner = $(".banner");
    $(".banner li:first").clone().appendTo(banner);
    var banner_li = $(".banner li");
	banner_li.eq(0).addClass("current");

    var window_width = $(document).width();
    banner_li.width(window_width);
    banner.width(banner_li.width()*banner_li.size());

    var index = 0;
    var count = banner_li.size();
    var slide = {//向左移
        moveLeft : function(){
            index--;
            if(index == -1){
                index = count - 2;
                banner.css("left",-banner_li.width() * (count - 1))
            }
			
            var $left = -banner_li.width() * index;
            banner.stop().animate({left:$left},300);
			banner_li.eq(index).addClass("current").siblings().removeClass("current");
            slide.fullData();
        },
        moveRight : function(){
            index++;
            if(index == count){
                index = 1;
                banner.css("left",0)
            }
			
            var $left = -banner_li.width() * index;
            banner.stop().animate({left:$left},300);
			banner_li.eq(index).addClass("current").siblings().removeClass("current");
            slide.fullData();
        },
        fullData: function (){
            var rel = parseInt(banner_li.eq(index).attr("data-rel")) + 1;
            var title = banner_li.eq(index).attr("data-title");
            var content = banner_li.eq(index).attr("data-content");

            $(".J-rel").html(rel);
            $(".J-title").html(title);
            $(".J-content").html(content);
        }
    };
    var timer = setInterval(function () {
        slide.moveRight()
    },5000);
    $(".slideAl").click(function (){
        clearInterval(timer);
        slide.moveLeft();
        timer = setInterval(function () {
            slide.moveRight()
        },5000);
    });
    $(".slideAr").click(function (){
        clearInterval(timer);
        slide.moveRight();
        timer = setInterval(function () {
            slide.moveRight()
        },5000);
    });


    $(window).resize(function (){
        banner_li.width($(document).width());
        banner.width(banner_li.width()*banner_li.size());
		var index = $(".banner li.current").index();
        var $left = -banner_li.width() * index;
        banner.css("left",$left);
		 // banner.stop().animate({left:$left},300);
    })
});