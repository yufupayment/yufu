//支付密码控件
//var pwdCtrl;

//$(function() {
//	var img = document.getElementById('authCodeImg');
//	img.onload = imgload();
//
//});
//
//function imgload(){
//	refreshCheckCode();
//	$.ajaxSetup({ cache: false });
//    
//    //密码控件
//	pwdCtrl=new PwdControl("password","passwdDiv",188,25,null);
//	//获取密码控件uuid
//
//	getPwdUUID();
//	
//	//获取CAS的lt
//    getCasLT();
//
//   
//    if($("#username").val()){
//        $(".userstips").hide();
//    }
//    //点击登陆按钮(原来按钮是submit,现在改为button)
//    $("#loginBtn").click(function(){
//    	//submitForm是验证除了验证的那些验证,现在把验证分为两部分,1submitForm里的验证,2doCheckAutoCode的验证
//    	//如果submitForm返回为true,执行doCheckAuthCode()
//    	if(submitForm()){
//    		doCheckAuthCode();
//    	}
//    });
//}



/*$(function() {
    $.ajaxSetup({ cache: false });
    
    //密码控件
	pwdCtrl=new PwdControl("password","passwdDiv",188,25,null);
	
	//获取密码控件uuid

	getPwdUUID();
	
	//获取CAS的lt
    getCasLT();

   
    if($("#username").val()){
        $(".userstips").hide();
    }
    
});*/

function getPwdUUID(){ 
	var url=authUrl+"/getPwdUUID?ts=" + new Date().getTime();
	var jsonpname = "uuidcallback";
	$.ajax({url:url,
		data:{jsonpname:jsonpname},
		jsonpCallback:"uuidcallback",
        xhrFields: {
            withCredentials: true
        },
		success:function(data){
		//	pwdCtrl.uuid=dataObj.uuid;
			},
			dataType:"jsonp"});
}

function uuidcallback(data) {
    pwdCtrl.uuid=data.uuid;
    $("#pwdToken").val(data.uuid);
}

function getCasLT(){
	var _services = 'service='+ encodeURIComponent(portalUrl+"/auth");
	var url = authUrl+'/login?' + _services + '&get-lt=true&n=' + new Date().getTime();
    var jsonpScript = document.createElement('script');
    jsonpScript.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(jsonpScript);
}

function callback(data){
	$("#casLT").val(data.loginTicket);
}

function submitForm(){
	disableLoginBtn();
	var ok = false;
	
	var userType=$.trim($("#userType").val());
	
	ok = checkForm(userType);
	if(ok){
		if("10,20,21,22".indexOf(userType)>-1){
			if(decryptPwd()){
				//ok =true;				
				if(!microdone()){
					ok = false;
				}
			}
		}
	}

	if(ok){
		if(!$("#casLT").val()){
			alert("lt加载失败,请刷新页面重试");
			ok=false;
		}
	}
//	var pas =$.trim($("#password").val());
//	//console.info(pas);
//	if(!$.trim($("#password").val())){		
//		$("#password").val("pwd");
//	}
	
//	if(!doCheckAuthCode()){
//		alert("3333333333333333333")
//		$("#authCodeMsg").text("验证码错误").show();
//		ok =false;
//	}else{
//		$("#authCodeMsg").text("").hide();
//	}
	
	if(!ok){
		enableLoginBtn();
	}
	
	return ok;
}


function checkForm(userType){
	var ok=false;
    
//	if(!doCheckAuthCode()){
//		alert("3333333333333333333")
//		$("#authCodeMsg").text("验证码错误").show();
//		return false;
//	}else{
//		$("#authCodeMsg").text("").hide();
//	}
	
	if("20,21,22".indexOf(userType)>-1){
		ok=checkCorpNormal()
	}else if("10"==userType){
		ok=checkPersNormal()
	}else if("60"==userType){
		ok=checkPersSms()
	}	
	
	return ok;
}

function checkCorpNormal(){
	var ok=false;
	ok=verifyUserName();
	if(ok){
		var selOprValue = $("#oprSelect").val();
		if(selOprValue=="1"){
			$("#oprId").val("999");
			$("#userType").val("20");
		}else{
			
				var opr = $.trim($("#opr").val());
				if(opr == "999"){
					$("#oprerr").text("此ID为管理员ID，请重新选择或填写").show();
					return false;
				}
				if(!opr){
					$("#oprerr").text("请输入ID").show();
					return false;
				}
				
				if(!(/^[0-9]*[1-9][0-9]*$/).test(opr)){
					$("#oprerr").text("操作员ID为数字组成，请重新填写").show();
					return false;
				}
				$("#oprId").val(opr);
				
				if(opr.charAt(0)=="0"){
					$("#userType").val("22");
				}else if(opr.charAt(0)=="1"){
					$("#userType").val("21");
				}
				
				ok= true;
			
		}
		
		if(ok&&isOpenDCToken){
			ok=verifyTockenCode();
			if(ok){
				setFingerinfo("tokenCode");
			}
		}
		
		
	}
	
	
	return ok;
}

function checkCorpTocken(){
	var ok=false;
	ok=verifyUserName();
	
	if(ok){
		ok=verifyTockenCode();
	}
		
	if(ok){
		setFingerinfo("tokenCode");
	}
	return ok;
}

function checkPersNormal(){
	var ok=false;
	ok=verifyUserName();
	
	if(ok&&isOpenDCToken){
		ok=verifyTockenCode();
		if(ok){
			setFingerinfo("tokenCode");
		}
	}
	
	return ok;
}

function checkPersTocken(){
	var ok=false;
	ok=verifyUserName();
	
	if(ok){
		ok=verifyTockenCode();
	}
	
	if(ok){
		setFingerinfo("tokenCode");
		$("#authCode").val($.trim($("#authCode").val()));
	}
	return ok;
}

function checkPersSms(){
	var ok=false;
	ok=verifyUserName();
	
	if(ok){
		ok=verifySmsCode();
	}
	
	if(ok&&isOpenDCToken){
		ok=verifyTockenCode();
		if(ok){
			setFingerinfo("tokenCode");
		}
	}
	return ok;
}

function verifyUserName(){
	var ok=false;
	ok=verifyMobile();
	
	if(ok){
	  return ok;
	}else if($("#username").val()&&$("#username").val().indexOf('@')>0){
		ok=verifyEmail();
		return ok;
	}
	
	return ok;
}

function verifySmsCode(){
	var ok=false;
	var v=$.trim($("#verifyCode").val());
	if(!v){
		smsErrorShow("短信验证码不能为空");
	}else if(!new RegExp('^[0-9]{6}$').test(v)){
		smsErrorShow("短信验证码格式错误");
	}else{
		$("#password").val(v);
		$("#smsErrmsg").text("").hide();
		ok=true;
	}
	
	return ok;
}

function verifyTockenCode(){
	var ok=false;
	var v=$.trim($("#tokenCode").val());
	if(!v){
		tokenErrorShow("动态口令不能为空");
	}else if(!new RegExp('^[0-9]{6}$').test(v)){
		tokenErrorShow("动态口令格式错误");
	}else{
		$("#tokenErrmsg").text("").hide();
		ok=true;
	}
	
	return ok;
}

var isCheckCodeOK = false;	
function doCheckAuthCode(){
	//var isVali = false;	
		if(!$.trim($("#authCode").val())){
	        $("#authCodeMsg").text("请输入验证码").show();
	        refreshCheckCode();
	        enableLoginBtn();
			return false;
		}
		var code = $("#authCode").val();
    	var timestamp = (new Date()).getTime();
    	var jsonpname = "cmscodecallback";
    	if(code != "" && $.trim(code).length == 5){
    		//执行ajax,返回结果之后执行回调函数cmscodecallback()
    		jQuery.ajax({
    	         url:authUrl+"/checkAuthCode?timestamp=" + timestamp,
    	         jsonp : "callback",
    	         jsonpCallback : "cmscodecallback",
    	         success:function(data) {
/*	    	        	    if($.trim(data.result) == 1){
	    	        	    	isVali = true;
	    	    			}*/
    	                  },
    	         async:false,
    	         dataType:"jsonp",
    	         data:{authCode:code,jsonpname:jsonpname}
            });
        }
 //   	alert("验证后======="+isCheckCodeOK)
	
/*	if(!isVali){
		alert("2222222222222222");
		$("#authCodeMsg").text("验证码错误").show();
	}*/
	
	return isCheckCodeOK;
}

function cmscodecallback(data) {
//	var isCheckCodeOK = false;
	//如果返回结果是1,则执行登陆
	
    if($.trim(data.result) == 1){
    	isCheckCodeOK = true;
    	//去除上次错误验证码提示
    	$("#authCodeMsg").text("").hide();
    	//alert("验证码成功");
    	//执行login方法
    	$("#fm1").submit();
	}else{
		isCheckCodeOK = false;
		$("#authCodeMsg").text("验证码错误").show();
		refreshCheckCode();
		enableLoginBtn();
	}
/*	if(!isCheckCodeOK){
		isCheckCodeOK = false;
		$("#authCodeMsg").text("验证码错误").show();
	}*/
 //   return isCheckCodeOK;
}

function decryptPwd(){
    //支付密码加密
	//delete by liuyu, 20170203, microdone新密码控件
//	pwdCtrl.encrypt();
//	$("#password").val(pwdCtrl.getPurePwdCipher());
    return true;
}

function openOpr(){
	var o = $("#oprSelect").val();
	if(o == '1'){
		$("#opr").hide();
		$(".idtips").hide();		
		$("#oprId").val("999");
		$("#oprerr").text("").hide();
	}else{
		$("#opr").show();
		$(".idtips").show();
		$("#oprId").val("");
		$("#oprerr").text("");
	}
}

function verifyMobile(){
	var mobile =/^(13|15|17|18)[0-9]{9}$/;
	var mobileNo=$("#username").val();
	if(!mobile.test(mobileNo)){
		$("#nameerr").text("请输入正确的手机号");
		$("#nameerr").show();
		return false;
	}else{
		$("#nameerr").hide();
		return true;
	}
}
function verifyEmail(){
	var email =/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
	var emailNo=$("#username").val();
	if(!email.test(emailNo)){
		$("#nameerr").text("请输入正确的手机号/邮箱");
		$("#nameerr").show();
		return false;
	}else{
		$("#nameerr").hide();
		return true;
	}
}

function setFingerinfo(domId){
	$("#fingerInfo").val($.trim($("#"+domId).val()));
}


function disableLoginBtn(){
	$("#loginBtn").addClass("hasclicked");
	$("#buttonTxt").html("登录中...");
}

function enableLoginBtn(){
	$("#loginBtn").removeClass("hasclicked");
	$("#buttonTxt").html("登录");
}

function clean(obj,css){
	$("."+css).hide();
}
function cleanTwo(obj,css){
	if(obj.value==""){
		$("."+css).show();		
	}
}

function getVerifyCode(){
	if(!verifyMobile()){
		return;
	}
	
	var authCode = $("#authCode").val();
	if(!authCode){
		$("#authCodeMsg").show();
		$("#authCodeMsg").text("请输入验证码");
		return;
	}else{
		$("#authCodeMsg").hide();
	}
	
/*	if(!doCheckAuthCode()){
        $("#authCodeMsg").text("验证码错误").show();
		return false;
	}*/
	$("#getVerifyCodeButton").removeAttr("onclick");
	var jsonpname = "smscodecallback";
	$.ajax({
        url:authUrl+"/smsSender",
        jsonpCallback:"smscodecallback",
        success:function(data) {
        			
/*	        	    if($.trim(data.status) == "0"){
//	        	    	$("#password").val(data.token);
	        	    	runCount(180);
	    			}else if($.trim(data.status) == "2"){
	    				$("#nameerr").text(data.msg);
	    				$("#nameerr").show();
	    				$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	    			}else if(data.status == "3"){
	    				$("#nameerr").hide();
	    				$("#authCodeMsg").text(data.msg);
	    				$("#authCodeMsg").show();
	    				$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	    			}else if(data.status == "4"){
	    				$("#authCodeMsg").hide();
	    				$("#smsErrmsg").text(data.msg);
	    				$("#smsErrmsg").show();
	    				$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	    			}else {
	    				$("#authCodeMsg").hide();
	    				$("#smsErrmsg").text(data.msg);
	    				$("#smsErrmsg").show();
	    				$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	    			}*/
                 },
        async:false,
        dataType:"jsonp",
        data:{mobileNo:$("#username").val(),authCode:$("#authCode").val(),jsonpname:jsonpname}
   });
}

function smscodecallback(data) {
    if($.trim(data.status) == "0"){
//    	$("#password").val(data.token);
    	//$(".J-getyzm").on("click",function(){
    	$(".J-getyzm").hide().siblings(".J-timedown").show();
    		$(".time").html("60");
    		setTimeout(function(){
    			timedown(60);	
    		},1000);				
    	//});
	}else if($.trim(data.status) == "2"){
		$("#nameerr").text(data.msg);
		$("#nameerr").show();
		$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	}else if(data.status == "3"){
		$("#nameerr").hide();
		$("#authCodeMsg").text(data.msg);
		$("#authCodeMsg").show();
		$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	}else if(data.status == "4"){
		$("#authCodeMsg").hide();
		$("#smsErrmsg").text(data.msg);
		$("#smsErrmsg").show();
		$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	}else {
		$("#authCodeMsg").hide();
		$("#smsErrmsg").text(data.msg);
		$("#smsErrmsg").show();
		$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	}
}

/*
@author:zhangmei 2016-11-11
@登录获取验证码
*/		
function getyzm(){
	$(".J-getyzm").on("click",function(){
		$(this).hide().siblings(".J-timedown").show();
		$(".time").html("60");
		setTimeout(function(){
			timedown(60);	
		},1000);				
	})
}
/*
@author:zhangmei 2016-11-11
@登录获取验证码倒计时
*/	
function timedown(time){
	time--;
	if(time == 0){
		$(".J-timedown").hide().siblings(".J-getyzm").html("再次获取验证码").show();
	}else{
		setTimeout(function(){
			timedown(time);	
		},1000);
	}
	$(".time").html(time);
}

//function doCheckAuthCode(){
//	var isVali = false;
//	if(enableAuthCode == "1"){
//		var code = $("#authCode").val();
//    	var timestamp = (new Date()).getTime();
//    	if(code != "" && $.trim(code).length == 5){
//    		jQuery.ajax({
//    	         url:authUrl+"/checkAuthCode?timestamp=" + timestamp,
//    	         success:function(data) {
//	    	        	    if($.trim(data.result) == 1){
//	    	        	    	isVali = true;
//	    	    			}
//    	                  },
//    	         async:false,
//    	         dataType:"json",
//    	         data:{authCode:code}
//            });
//        }
//	}else{
//		isVali = true;
//	}
//	return isVali;
//}

function runCount(t){
	if(t>0){
		$("#getVerifyCodeButton").text("重新获取(" + t + "s)");
		t = t-1;
		setTimeout(function(){runCount(t);},1000);
	}else{
		$("#getVerifyCodeButton").text("获取短信验证码");
		$("#getVerifyCodeButton").attr("onclick","getVerifyCode()");
	}
}

function refreshCheckCode(){
	$("#authCode").val("");
	$("#tipsErrorImg").hide();
	$("#tipsSuccessImg").hide();
    var timestamp = (new Date()).getTime();
    $("#authCodeImg").attr("src", authUrl+"/randomcode.jpg?timestamp=" + timestamp);
}