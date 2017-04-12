function corpTab_clicks(){
	$(this).addClass("current").siblings().removeClass("current");
	hideAllError();
	$("#persTopLinkPanel").hide();
	$("#operatorId").show();			
	openOprs();			
	username_change();			
	clean(this,'idtips');			
	$("#personalClient").removeClass("current");
	$("#businessClient").addClass("current");
	
	$("#userType").val("20");
	$("#errmsg").text("");
	$("#registerUrlHref").attr("href",registerUrl+"?flag=corp");
	$("#findLoginPwdUrlHref").attr("href",findLoginPwdUrl+"?flag=corp");
	$("#nameerr").text("");
	$("#passwordLi").show();
	$("#verifyCodeLi").css("display","none");
	loginOption=false;
	tploginFlag=false;
	//$(".userstips").text("邮箱/手机号");
}
function persTab_clicks(){
	$(this).addClass("current").siblings().removeClass("current");
	hideAllError();
	$("#persTopLinkPanel").show();			
	$("#operatorId").hide();
	$("#smsLoginOption").show();			
	username_change();
	aSmsReturn_click();
	
	$(".pgweb-login-box .pgweb-tabs li").removeClass("current");
	$("#personalClient").parent().addClass("current");
	
	$("#userType").val("10");
	$("#errmsg").text("");
	$("#registerUrlHref").attr("href",registerUrl);
	$("#findLoginPwdUrlHref").attr("href",findLoginPwdUrl);
	$("#oprerr").text("");
	$("#nameerr").text("");
	$("#hnaFlag").show();

	loginOption=false;
	tploginFlag=false;
	
	$("#placeholder").hide();
}
function openOprs(){
	var o = $("#oprSelect").val();
	if(o == '1'){
		//$("#oprs").hide();
		//$("#opr").hide();
		$("#oprId").val("999");
		$("#oprerr").text("").hide();
	}else{
		//$("#oprs").show();
		//$("#opr").show();
		$("#oprId").val("");
		$("#oprerr").text("");
	}
} 