

var loginOption;//短信登录选项
	var smsLoginOption = false;
	
	//动态口令登陆
	var tploginFlag;
	var tcloginFlag;
	var tokenLoginClick = false;
	
	var isOpenDCToken=false;
	$(function(){
		
		corpTab_click();
		
		$("#registerUrlHref").attr("href",registerUrl+"?flag=corp");
		$("#findLoginPwdUrlHref").attr("href",findLoginPwdUrl+"?flag=corp");
		$("#businessClient").click(corpTab_click);
		$("#personalClient").click(persTab_click);	
		
		//
		//adjustFaceAndShowErrMsg(userType,state,errMsg);
		
	});
	
	function corpTab_click(){
		hideAllError();
		$("#corpTopLinkPanel").show();
		$("#persTopLinkPanel").hide();
		
		$("#operatorId").show();
		
		openOpr();
		
		username_change();
		
		clean(this,'idtips');
		
		$(".pgweb-login-box .pgweb-tabs li").removeClass("current");
		$("#businessClient").parent().addClass("current");
		
		$("#userType").val("20");
		$("#errmsg").text("");
		$("#registerUrlHref").attr("href",registerUrl+"?flag=corp");
		$("#findLoginPwdUrlHref").attr("href",findLoginPwdUrl+"?flag=corp");
		$("#nameerr").text("");
		$("#passwordLi").show();

		$("#verifyCodeLi").css("display","none");
		
		
		$("#hnaFlag").hide();

		loginOption=false;
		tploginFlag=false;
		
	//	$("#placeholder").hide();
		$(".userstips").text("邮箱/手机号");
		
		//$("#placeholder").show();
	}
	
	function persTab_click(){
		hideAllError();
		$("#corpTopLinkPanel").hide();
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
	
	function username_change(){
		var userName=$.trim($("#username").val());
		var userType=$.trim($("#userType").val());
		var opr=$.trim($("#opr").val());
		
		if($("#opr").is(":hidden")){
			opr="";
		}
		
		var jsonpname = "tokencallback";
		$("#username").val(userName);
		$("#userType").val(userType);
		$("#opr").val(opr);
		
		if(userName){
			$.ajax({
		        url:authUrl+"/tokenSender?ts=" + new Date().getTime(),
		        data:{userName:userName,userType:userType,opr:opr,jsonpname:jsonpname},
		        jsonpCallback:"tokencallback",
		        success:function(data) {
		        	/*
			        	    if($.trim(data.isOpen) == "1"){
			        	    	$("#tokenCodeLi").show();
			        	    	isOpenDCToken=true;
			    			}else {
			    				$("#tokenCodeLi").hide();
			        	    	isOpenDCToken=false;
			    			}*/
		                 },
		        async:false,
		        dataType:"jsonp"
		   });
		}else{
			$("#tokenCodeLi").hide();
			isOpenDCToken=false;
		}
	}
	
	function tokencallback(data) {
		
	    if($.trim(data.isOpen) == "1"){
	    	$("#tokenCodeLi").show();
	    	isOpenDCToken=true;
		}else {
			$("#tokenCodeLi").hide();
	    	isOpenDCToken=false;
		}
     }
	
	function aToken_click(isCorp){
		hideAllError();
		$("#"+(isCorp?'tokenCorpLoginClick':'tokenPersLoginClick')).hide();
		$("#"+(isCorp?'returnCorpNormalOption':'returnPersNormalOption')).show();
		
		if(isCorp){			
			$("#operatorId").hide();
		}else{
			$("#smsLoginOption").hide();
		}
		
		$("#userType").val(isCorp?"71":"70");
		
		$("#passwordLi").hide();
		$("#tokenCodeLi").show();
		$(".userstips").text(isCorp?"邮箱":"邮箱/手机号");
	}
	
	function aTokenReturn_click(isCorp){
		hideAllError();
		$("#"+(isCorp?'tokenCorpLoginClick':'tokenPersLoginClick')).show();
		$("#"+(isCorp?'returnCorpNormalOption':'returnPersNormalOption')).hide();
		
		if(isCorp){
			$("#operatorId").show();
		}else{
			$("#smsLoginOption").show();
		}
		
		$("#userType").val(isCorp?"20":"10");
		
		$("#passwordLi").show();
		$("#tokenCodeLi").hide();
		
		$(".userstips").text(isCorp?"邮箱":"邮箱/手机号");
		
	}
	
	function aSms_click(){
		hideAllError();
		$("#returnOrdinaryOption").show()
		$("#smsLoginOption").hide();
		$('#tokenPersLoginClick').hide();
		
		$("#passwordLi").hide();
		$("#verifyCodeLi").show();
		$(".userstips").text("手机号");
		
		$("#userType").val("60");
	}
	
	function aSmsReturn_click(){
		hideAllError();
		$("#smsLoginOption").show();
		$("#returnOrdinaryOption").hide();
		$('#tokenPersLoginClick').show();
		
		$("#passwordLi").show();
		$("#verifyCodeLi").hide();
		$(".userstips").text("邮箱/手机号");
		
		$("#userType").val("10");
	}
	
	
	
	function adjustFaceAndShowErrMsg(userType,state,errMsg){
		//alert(userType+','+errMsg);
		adjustFace(userType);
		showErrMsg(userType,errMsg);	
		
		if(state=='2'){
			showAuditDlg();
		}		
	}
	
	function adjustFace(userType){
		if(userType=='10'){
			persTab_click();
		}else if(userType=='21'||userType=='22'){
			$("#oprSelect").val("2");
			openOpr();
			
			if($("#opr").val()){
				clean(this,'idtips');
			}
			
			
		}else if(userType=='60'){
			persTab_click();
			aSms_click();
		}
		username_change();
	}
	
	function showErrMsg(userType,errMsg){
		if(!errMsg){
			return;
		}
		
		if(userType=='70'||userType=='71'){
			tokenErrorShow(errMsg);
		}else if(userType=='60'){
			smsErrorShow(errMsg);
		}else{
			errorShow(errMsg);
		}
		
		
	}
	
	function showAuditDlg(){
		$("#unauditCorpDialog").dialog({  
			width: 395,
			height: 250,		
			autoOpen: true,
			modal: true
		});	
	}
	
	function hideAllError(){
		$("#errmsg").text("").hide();
		$("#smsErrmsg").text("").hide();
		$("#tokenErrmsg").text("").hide();
	}
	
	function errorShow(message){
		$("#errmsg").text(message).show();
	}
	function smsErrorShow(message){
		$("#smsErrmsg").text(message).show();
	}
	function tokenErrorShow(message){
		$("#tokenErrmsg").text(message).show();
	}