$(function(){
var public={
	//导航判断	
		changeNav:function(){
			var arr=['index','product','case','safe','service','aboutus'];
			var curPage = $(".page").attr("data-page");
			$('.nav > ul > li').each(function(i, o) {
				var page = $(o).attr("data-page");
				if(page == curPage){
					$(o).addClass('current');	
					return false;
				}
                
            });
			//左侧菜单
			var subPage = $(".page").attr("sub-page");			
			if(subPage == undefined) return;
			/*//招聘左侧菜单
			if($(".sidemenu2").length == 0){				
				public.sideItem();
				subPage = subPage.split("-");
				$(".J-sidemenu > ul > li").each(function(i, o) {
					var cursubpage = $(o).attr("sub-page");
					if(cursubpage == subPage[0]){
						$(o).find(".submenu").show();
						var oP = $(o).find(".submenu > p");
						oP.each(function(i,o){
							var curTag =$(o).attr("sub-page");
							if(curTag == subPage[1]){
								$(o).addClass("current");
								return false;
							}
						})
						
					}
				});
			}else{
				$(".sidemenu2 > ul > li").each(function(i,o){
					var cursubpage = $(o).attr("sub-page");
					if(cursubpage == subPage){
						$(o).addClass("current");
						return false;
					}
				})
			}*/
			//招聘左侧菜单
            if ($(".sidemenu").length != 0) {
                public.sideItem();
                subPage = subPage.split("-");
                $(".J-sidemenu > ul > li").each(function (i, o) {
                    var cursubpage = $(o).attr("sub-page");
                    if (cursubpage == subPage[0]) {
                       $(o).addClass("current");
                       $(o).find(".icon-ab").toggleClass("current");
                        var oP = $(o).find(".submenu > p");
                        oP.each(function (i, o) {
                            var curTag = $(o).attr("sub-page");
                            if (curTag == subPage[1]) {
                            	$(o).closest(".submenu").show();
                                $(o).addClass("current");
                                return false;
                            }
                        })

                    }
                });
            } else if ($(".J-sidemenu2").length != 0) {
                $(".J-sidemenu2 > ul > li").each(function (i, o) {
                    var cursubpage = $(o).attr("sub-page");
                    if (cursubpage == subPage) {
                        $(o).addClass("current");
                        return false;
                    }
                })
            }
			
		},	
		//左侧菜单
		sideToggle:function(){
			$(".J-sidemenu ul li > a.hd").on("click",function(){
				$(this).siblings(".submenu").slideToggle("fast");
				$(this).find(".icon-ab").toggleClass("current");
				return false;
			})
		},
		/*
		@author:zhangmei 2016-11-8
		@function:侧边栏跟随页面滚动
		*/
		scrollTop: function(){
		var scrollTop = $(document).scrollTop();	
		if(scrollTop > 215){
			$(".sidemenu").addClass("sidemenu-fixed");
			var selector = ".sidemenu";
			public.ieScroll(selector);
		}else{
			$(".sidemenu").removeClass("sidemenu-fixed").removeClass("ie-fixed");;
		}
	},
		/*
		@author:zhangmei 2016-11-8
		@function:侧边栏二级菜单设置动画延迟时间
		*/
		sideItem: function(){
			$(".submenu p").each(function( index ) {
				$( this ).css({'animation-delay': (index/10)+'s'});
			});
		},
		/*
		*author：zhongcheng 2016-11-8
		*function：招聘页面和案例页，左侧菜单
		*
		*/
		jobScroll: function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop > 240){
				$(".J-sidemenu2").addClass("sidemenu-fixed");
				var selector = ".J-sidemenu2";
				public.ieScroll(selector);
			}else{
				$(".J-sidemenu2").removeClass("sidemenu-fixed").removeClass("ie-fixed");
			}
		},
		/*
		*author:zhongcheng 2016-11-22
		* function:ie7、8兼容左侧菜单吸顶
		*
		*/
		ieScroll : function(selector){
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
			var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
			var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
			if (isIE)
			{
				var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
				reIE.test(userAgent);
				var fIEVersion = parseFloat(RegExp["$1"]);
				if(fIEVersion == 7 || fIEVersion == 8)
				{
					var win_width = $(window).width();
					// console.log(win_width);
					if(win_width <= 1200){
						$(selector).addClass("ie-fixed")
					}else{
						$(selector).removeClass("ie-fixed")
					}
				}

			}//isIE end
		},
		/*
		* @zhongcheng，2016-11-29
		* @service页面，内容不足时更改高度
		* */
		changeHeight : function(){
			var $winHeight = $(window).height();
			var $bodyHeight = $("body").height();
			if($bodyHeight < $winHeight){
				var $qs2 = $(".qs2");
				var qs2Height = $winHeight - $bodyHeight +$qs2 .height();
				$qs2.height(qs2Height);
			}
		}
		/*
		@author:zhangmei 2016-11-11
		@登录获取验证码
		*/		
		/*getyzm:function(){
			$(".J-getyzm").on("click",function(){
				$(this).hide().siblings(".J-timedown").show();
				$(".time").html("60");
				setTimeout(function(){
					public.timedown(10);	
				},1000);				
			})
		},*/
		/*
		@author:zhangmei 2016-11-11
		@登录获取验证码倒计时
		*/	
		/*timedown:function(time){
			time--;
			if(time == 0){
				$(".J-timedown").hide().siblings(".J-getyzm").html("再次获取验证码").show();
			}else{
				setTimeout(function(){
					public.timedown(time);	
				},1000);
			}
			$(".time").html(time);
		},*/
		/*
		@author:zhangmei 2016-11-11
		@切换个人登录方式
		*/
		/*selType: function(){
			$(".login-type").on("click",function(){
				$(this).hide().siblings().show();
				$(".msglabel,.pwdlabel").toggle();
			})	
		},*/
		/*
		@author:zhangmei 2016-11-11
		@切换个人企业用户
		*/
		/*changeUser: function(){
			$(".loginsel li").on("click",function(){
				if(!$(this).hasClass("current")){
					$(this).addClass("current").siblings().removeClass("current");
					var index = $(this).index();
					if(index == 1){
						$(".customlabel").hide();
						$(".J_personal").show();
					}else{
						$(".customlabel,.pwdlabel,.login-type:eq(0)").show();
						$(".J_personal,.login-type:eq(1),.msglabel").hide();
						//$(".login-type")
					}
					$(".pgweb-tabs .item").hide();
					$(".pgweb-tabs .item").eq(index).show();
				}
				
			})
		}*/
		
}

	public.changeNav();
	
	
	/*$(".J-login").on("click",function(){
		var url = "loginV2.jhtml";
		$.ajax({
			cache: true,
			async: false,
			url:url,
			type:'GET',
			success: function(data){
				var pop=new PZ_Dialog({
					width:530,		//可选参数，可以自由配置对话框的尺寸
					height:540,       //可选参数，可以自由配置对话框的尺寸
					text:"  ",//可选参数，对话框的标题
					tipsText:data,//对话框提示内容
					mask:0.4,     //开起遮罩，并且设置遮罩的透明度
					isDrag:false,//是否可以拖动	
					callback:function(){
					//alert(222)
					}				
				});
				//public.changeUser();
				//public.selType();			
				corpTab_clicks();				
				$("#registerUrlHref").attr("href",registerUrl+"?flag=corp");
				$("#findLoginPwdUrlHref").attr("href",findLoginPwdUrl+"?flag=corp");
				//$("#businessClient").click(corpTab_clicks);
				//$("#personalClient").click(persTab_clicks);
				//点击确定执行关闭
				$(".confirm").click(function(){
					//pop.closeDialog();
					if(submitForm()){
			    		doCheckAuthCode();
			    	}
				})
				//输入框清除错误提示及输入提示
				$(".inp1").on("focus",function(){
					var obj = $(this).siblings("em");
					var errtips = $(this).closest("li").find(".errtips");
					obj.hide();	
					errtips.html("");
				}).on("blur",function(){
					var val = $(this).val();
					if(val == '')
					var obj = $(this).siblings("em");
					obj.show();	
				})	
				//企业用户下拉
				$(".J-seldown").on("click",function(){
					$("#oprSelect").toggle();
				})
				$(".seldown-box").mouseleave(function(){
					$("#oprSelect").hide();
				})
				$(".seldown-box .menu p").on("click",function(){
					var html = $(this).html();
					$(".J-seldown").val(html);
					$(".seldown-box .menu").hide();
					var index = $(this).index();
					if(index == 0){
						$(".J-id").hide();	
					}else{
						$(".J-id").show();	
					}
				})	
			}
		})
	})*/
	 
	
	
	if(!!$(".sidemenu")){
		public.sideToggle();
		public.scrollTop();
		$(window).on("scroll",public.scrollTop);
		$(window).on("resize",public.scrollTop);
	}
	
	//public.getyzm();
	/*
	@author:zhangmei
	@消除css3动画积累
	*/
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       ||
			  window.webkitRequestAnimationFrame ||
			  window.mozRequestAnimationFrame    ||
			  function( callback ){
				window.setTimeout(callback, 1000 / 60);
			  };
	})();
	if($(".sidemenu2")){
		public.jobScroll();
		$(window).on("scroll",public.jobScroll);
		$(window).on("resize",public.jobScroll);
	}
	if($(".qs2").length != 0){
		public.changeHeight();
		$(window).on("resize",public.changeHeight);
	}
})


