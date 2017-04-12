$(document).ready(function () {
    function wrapHeight() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                var oHeight = $(window).height();
                $(".finace-section .section1 .wrapper,.finace-section .section2 .wrapper,.finace-section .section3 .wrapper").height(oHeight);
            }

        }//isIE end

    }

    $('#fullpage').fullpage({
        // sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        // anchors: ['f-section0', 'f-section1', 'f-section2', 'f-section3', 'f-section4'],
        //  menu: '#menu',
        scrollingSpeed: 800,
        onLeave: function (index, nextIndex, direction) {

            if (direction == "down") {
                $(".head-fixed").fadeIn();
                var curIndex = index - 1;
                if (index < 4) {
                    $(".fixed-nav li").eq(curIndex).addClass("active").siblings().removeClass("active");
                } else {
                    $(".fixed-nav li.active").removeClass("active");
                }
            } else {
                var curIndex = nextIndex - 2;
                if (nextIndex == 1) {
                    $(".head-fixed").fadeOut();
                }
                if (curIndex >= 0) {
                    $(".fixed-nav li").eq(curIndex).addClass("active").siblings().removeClass("active");
                } else {
                    $(".fixed-nav li.active").removeClass("active");
                }
            }


            //    处理动画部分
            //    处理第二屏out-box1动画部分
            if (nextIndex == 2 || nextIndex == 1) {
                $(".section1").addClass("current");
            }
            if (index == 2 && direction == "down" || index == 1 && nextIndex != 2) {
                $(".section1").removeClass("current");
            }

            //    处理第四屏动画部分
            if (nextIndex == 4 || nextIndex == 5 && direction == "down") {
                $(".section3").addClass("current");
            }
            if (index == 4 && direction == "up") {
                $(".section3").removeClass("current");
            }

            //    第一屏和最后一屏时，去掉边栏的样式
            var length = $(".section").length;
            if(nextIndex == 1 || nextIndex == length ){
                $(".fixed-nav li").removeClass("active");
            }

        },

        afterRender: function () {

            wrapHeight()
            var head = $(".header").clone().addClass("head-fixed").appendTo($("body"));
        },
        afterResize: function () {
            wrapHeight()
        }
    });
    $(".fixed-nav li").on("click", function () {

        var index = $(this).index();
        index = index + 2;
        $('#fullpage').fullpage.moveTo(index, 0);
        $(this).addClass("active").siblings().removeClass("active")
        return false;
    })

    /* $.getUrlParam = function (name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r != null) return unescape(r[2]); return null;
     }*/

    function init() {
        page = $.getUrlParam("page");
        if (page) {
            $('#fullpage').fullpage.moveTo(page, 0);
            if(page - 2 >= 0){
                $(".fixed-nav li").eq(page-2).addClass("active").siblings().removeClass("active")
            }
        }
    }

    init();

    $(".section1").addClass("current");

});