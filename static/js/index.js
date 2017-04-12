$(function () {
	  //新闻中心
var timerup = "";
    function slideUp(){
    	$(".slideBox").html($("#topList").html());      
        var animate = $(".slideBox .slideList1");
        timerup = setInterval(function() {
            animate.animate({'top': '-32px'}, 500,
                    function () {
                        animate.find('li').first().appendTo(animate);
                        animate.css('top', 0);
                    });
                
            }, 2000);
    }

    

    function slide() {
    	var oH = $(window).height(),
	        section1T = $('.slideBox1').offset().top + 50,
	        oTop = $('#section1').offset().top + oH,
	        section2T = $('#section2').offset().top,
	        section2H = $('#section2').height(),
	        section3T = $('#section3').offset().top,
	        section4T = $('#section4').offset().top;
	    section5T = $('#section5').offset().top;
        var $this = $(window);
        targetTop = $this.scrollTop() + oH;
        if (targetTop >= oTop) {
            $('#section1').addClass('sectionFixed');
        } else {
            $('#section1').removeClass('sectionFixed');
        }
        if (targetTop >= section1T + oH / 3 && targetTop <= section2T + oH) {
            $('#section1').addClass('show');
        } else {
            $('#section1').removeClass('show');
        }
//        if (targetTop >= section2T + oH / 3 && targetTop <= section3T + oH) {
//            $('#section2').addClass('show');
//        } else {
//            $('#section2').removeClass('show');
//        }
        if (targetTop >= section3T + oH / 3 && targetTop <= section4T + oH) {
            $('#section3').addClass('show');
            $(".news-box").addClass("active");
        } else {
            $('#section3').removeClass('show');
            $(".news-box").removeClass("active");
        }
        if (targetTop >= section4T + oH / 3 && targetTop <= section5T + oH) {
            $('#section4').addClass('show');
            setTimeout(function () {
                $('.list3').addClass('active');
            }, 1800)
        }


    }

    /*slide();
    $(window).bind('scroll', slide);*/
    $("#section2 .item1 > a").eq(0).addClass("current");
    var obj =  $("#section2 .item1 > a").eq(0).siblings("a");
    //console.log(obj.length)
    obj.hide();
    function autoFade() {
        var next = $("#section2 .item1 a.current").next();
        var len = $("#section2 .item1 a").length;
        if (next.length == 0 || next.index() == len) {
            next = $("#section2 .item1 a").eq(0);
        }

        $("#section2 .item1 a").stop().fadeOut(1000);
        next.stop().fadeIn(500);
        next.addClass("current").siblings().removeClass("current");
        var index = next.index();//对应索引
        $(".item1-nav>li").eq(index).addClass("current").siblings().removeClass("current");
    }

    var timer = setInterval(autoFade, 5000);

    $(".item1-nav").delegate("li","click",function(){
//    	console.log(this);
        if($(this).hasClass("current")){
        	return false;
        }else{
        	 clearInterval(timer);
        	 $(this).addClass("current").siblings().removeClass("current");//修改点击后的样式
             var index = $(this).index();
             var next = $("#section2 .item1 a").eq(index);
             $("#section2 .item1 a").stop().fadeOut(1000);
             next.stop().fadeIn(500);
             next.addClass("current").siblings().removeClass("current");
             timer = setInterval(autoFade, 5000);
        }
    })
    /*
    @author:zhangmei 2016-11-30
    @function:首页焦点大图
    */
   function slideInit() {
       var oh = $(window).height()-172;
       $(".banner,.banner .item").height(oh);
       //执行scroll动画
       slide();
       $(window).bind('scroll', slide);
       var i = 0;
       $(".banner .item").hide();
    var $active = $(".banner div.active");
       /*   $active.stop().fadeOut(4000);*/
       mainSlide($active,i);
       $(".tp-bannertimer").stop().css("width","0").animate({"width":"100%"},8000);
   }
   slideInit();
var timer1 = '',timer2 = '';
   function mainSlide($active,i){
       $(".tp-bannertimer").stop().css("width","0").animate({"width":"100%"},8000);
       //$active.removeClass("active");
       $(".banner div.active").stop().fadeOut(2000).removeClass("active");
       $(".txt-box span").eq(i).addClass("active").siblings().removeClass("active");
       timer2 = setTimeout(function () {
           $(".txt-box span").eq(i-1).attr("class","fadeOut");
       },7000)
       $(".banner .item").eq(i).stop().fadeIn(2000).addClass("active");
       //$(".tp-tab").eq(i).addClass("selected").siblings().removeClass("selected");
       i++;
       if(i >= $(".banner .item").length){
           i = 0;
       }
       $active = $active.next();
       timer1 = setTimeout(function () {
           $(".txt-box span").attr("class","");
           mainSlide($active,i);
       },8000)
   }
   //往左走
   $(".tp-leftarrow").on("click",function(){
       clearTimeout(timer1);
       clearTimeout(timer2);
       $(".txt-box span").attr("class","");
       var len = $(".banner .item").length-1,
           index = parseInt($(".banner .active").index());
       
       var $active = index == 0 ? $(".banner .item").eq(len) : $(".banner .item").eq(index-1);
       var i = $active.index();
       mainSlide($active,i);
   })
   //往右走
   $(".tp-rightarrow").on("click",function(){
       clearTimeout(timer1);
       clearTimeout(timer2);
       $(".txt-box span").attr("class","");
       var len = $(".banner .item").length-1,
           index = parseInt($(".banner .active").index());
       
       var $active = index == len ? $(".banner .item").eq(0) : $(".banner .item").eq(index+1);
       var i = $active.index();
       mainSlide($active,i);
   })
   //选中当前项
   $(".tp-tab").on("click",function(){
       if($(this).hasClass("selected")) return;
       clearTimeout(timer1);
       clearTimeout(timer2);
       $(".txt-box span").attr("class","");
       var rel = $(this).attr("data-liindex");
       var $active = $(this);
       mainSlide($active,rel);
   })
  var timer0 = '';
   
  $(window).on("resize",function () {
	  clearInterval(timerup);
	  slideUp()
	  clearTimeout(timer0);
	  timer0 = setTimeout(function(){
		  var oh = $(window).height()-172;
	        $(".banner,.banner .item").height(oh);
	        slide();
	        $(window).unbind('scroll').bind('scroll', slide);
	  },150)
        
    })
    setTimeout(function(){
    	$(window).trigger("resize");       	
    },50)      
    /*
    @author:zhangmei 2016-12-15
    @function:首页产品效果
    */
    var newAnimate = $(".newslideList"),
    	newDisdance = "1186",
    	newTimer = '';
   function newAutoSlide(){
	   newAnimate.stop().animate({"left":-1*newDisdance},300,function(){		    	
	    	newAnimate.find('.productList').first().appendTo(newAnimate);
	    	newAnimate.css("left",0);
	    	var curRel = newAnimate.find('.productList').first().attr("data-rel");
	    	newDisdance = "1186";
	    	$(".slideRel a").each(function(i,o){
	    		var rel = $(o).attr("rel");
	    		if(rel == curRel){
	    			$(o).addClass("current").siblings().removeClass("current");
	    		}
	    	})
	    })		    
   }
   newTimer = setInterval(newAutoSlide,5000);
    
    $(".slideRel a").on("click",function(){
    	clearInterval(newTimer);
    	if($(this).hasClass("current")) return
    	$(this).addClass("current").siblings().removeClass("current");
    	var rel = $(this).attr("rel");
    	$(".newslideList .productList").each(function(i,o){
    		var curRel = $(o).attr("data-rel");
    		//console.log(curRel)
    		
    		if(curRel == rel){
    			var index = $(o).index();
    			//console.log(index);
    			newDisdance = index * 1186;
    			newAnimate.stop().animate({"left":-1*newDisdance},300,function(){		
    				//console.log($('.newslideList .productList:lt('+ index +')').length)
    		    	$('.newslideList .productList:lt('+ index +')').appendTo(newAnimate);    		    	
    		    	newAnimate.css("left",0);    		    	
    		    	newDisdance = "1186";
    		    	
    		    })	
    			
    			//newAutoSlide();
    			newDisdance = "1186";
    			newTimer = setInterval(newAutoSlide,5000);
    			return false
    		}
    	})
    })
});
