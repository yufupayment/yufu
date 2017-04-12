var pgeditor = new $.pge({
	pgePath: authUrl + "/gopay/tools/ocx/",//控件下载目录，可以指定绝对路径，如"http://www.baidu.com/download/"
	pgeId: "_ocx_password",//控件ID
	pgeEdittype: 0,//控件显示类型,0(星号),1(明文)
	pgeEreg1: "[\\s\\S]*",//输入过程中字符类型限制，如"[0-9]*"表示只能输入数字
	pgeEreg2: "[\\s\\S]{0,30}",	//输入完毕后字符类型判断条件，与pgeditor.pwdValid()方法对应
	pgeMaxlength: 30,//允许最大输入长度
	pgeTabindex: 2,//tab键顺序
	pgeClass: "ocx_style",//控件css样式
	pgeInstallClass: "ocx_style1",//针对安装或升级的css样式
	pgeOnkeydown:"FormSubmit()",//回车键响应函数，需焦点在控件中才能响应
	tabCallback:"input2",//火狐tab键回调函数,设置要跳转到的对象ID
	//windows10相关
	pgeWindowID:"password"+new Date().getTime()+1,
	pgeRZRandNum:sKey,
	pgeRZDataB:enStr
});
window.pgeCtrl = pgeditor;

function microdone() {
	var length = pgeditor.pwdLength();
	if (length == 0 || length == undefined) {
		setTimeout(function(){//防止回车提交时跟alert冲突
			$("#errmsg").text("密码不能为空");
			$("#errmsg").show();
			if(_$("_ocx_password")){
				_$("_ocx_password").focus();
			}
		},0);
		return false;
	}
	$.ajax( {
		url : CTX + "/getSrandNum.jhtml?t=" + get_time(),
		type : "GET",
		async : false,
		success : function(srand_num) {
			pgeditor.pwdSetSk(srand_num);
			_$("pwdToken").value = srand_num;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
		}
	});
	var pwdResult = pgeditor.pwdResult();
	var machineNetwork = pgeditor.machineNetwork();//获取网卡信息密文
	var machineDisk = pgeditor.machineDisk();//获取硬盘信息密文
	var machineCPU = pgeditor.machineCPU();//获取CPU信息密文
	var pwdHardList = pgeditor.pwdHardList();//获取硬件信息密文
	_$("password").value = pwdResult;//将密码密文赋值给表单
	_$("local_network").value = machineNetwork;//将网卡和MAC信息密文赋值给表单
	_$("local_disk").value = machineDisk;//将硬盘信息密文赋值给表单
	_$("local_cpu").value = machineCPU;//将CPU信息密文赋值给表单
	_$("local_hardList").value = pwdHardList;//将CPU信息密文赋值给表单
	return true;
}

function get_time() {
	return new Date().getTime();
}

function _$(v) {
	return document.getElementById(v);
}
