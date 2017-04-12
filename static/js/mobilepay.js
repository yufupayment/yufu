/**
 * Created by Nick on 2016/11/22.
 */

$(document).ready(function() {
    $('#fullpage').fullpage({
        scrollingSpeed: 800,
        onLeave: function(index,nextIndex,direction){

            if(direction == "down"){
                $(".head-fixed").fadeIn();
                var curIndex = index - 1;
                if(index<5){
                    $(".fixed-nav li").eq(curIndex).addClass("active").siblings().removeClass("active");
                }else{
                    $(".fixed-nav li.active").removeClass("active");
                }
            }else{
                var curIndex = nextIndex - 2;
                if(nextIndex == 1){
                    $(".head-fixed").fadeOut();
                }
                if(curIndex >= 0){
                    $(".fixed-nav li").eq(curIndex).addClass("active").siblings().removeClass("active");
                }else{
                    $(".fixed-nav li.active").removeClass("active");
                }
            }



        //    处理第二屏out-box1动画部分
            if(nextIndex == 2 || nextIndex == 1){
                $(".out-box1").addClass("current");
            }
            if(index == 2 && direction == "down" || index == 1 && nextIndex != 2){
                $(".out-box1").removeClass("current");
            }

        //    处理第五屏out-box4动画部分
            if(nextIndex == 5 || nextIndex == 6 && direction == "down"){
                $(".out-box4").addClass("current");
            }
            if(index == 5 && direction == "up"){
                $(".out-box4").removeClass("current");
            }

            //    第一屏和最后一屏时，去掉边栏的样式
            var length = $(".section").length;
            if(nextIndex == 1 || nextIndex == length ){
                $(".fixed-nav li").removeClass("active");
            }


        },
        afterRender:function () {
            var head = $(".header").clone().addClass("head-fixed").appendTo($("body"));
        },
        afterLoad:function () {
            $(".inner").each(function(index,obj){
                var $height = $(obj).outerHeight();
                $(obj).css("margin-top",-$height/2);
            })
        }
    });
    $(".fixed-nav li").on("click",function(){
        var index = $(this).index();
        index = index +　2;
        $('#fullpage').fullpage.moveTo(index, 0);
        $(this).addClass("active").siblings().removeClass("active")
        return false;
    });
    function init(){
        page = $.getUrlParam("page");
        if(page){
            $('#fullpage').fullpage.moveTo(page, 0);
            if(page - 2 >= 0){
                $(".fixed-nav li").eq(page-2).addClass("active").siblings().removeClass("active")

            }
        }
    }
    init();

    $(".out-box1").addClass("current");

});

// $(function(){
//     function changeHeight(){
//         var $left1 = $(".mobilepay .out-box1 .left");
//         var $left2 = $(".mobilepay .out-box3 .left");
//         var $winHeight = $(window).height();
//         // var $wrapperHeight = $left1.siblings(".wrapper").height();
//
//         var $height = $winHeight;
//         $left1.height($height + 150);
//         $left2.height($height + 150);
//     }
//
//     changeHeight();
//     $(window).on("resize",changeHeight);
//
// });

