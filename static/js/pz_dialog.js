(function(){
/**
@基于jQuery的对话框效果
@实现4中常见的对话框效果，可以根据需要修改css样式达到自己想要的效果
@调用方式和配置参数，可以看下对应的4中创建方式
@版本:1.0
*/
function PZ_Dialog(args){
	//保存参数对象
	this.args=args;
	//初始化参数默认值
	this.dialogWidth=args.width||400;//弹出框宽度
	this.dialogHeight=args.height||80;//弹出框高度
	this.dialogText=args.text||"提示信息";//弹出框提示信息
	this.isMask=args.mask||false;//遮罩层及透明度
	this.dialogType=args.type||false;//弹出框类型
	this.dialogAlertTips=args.tipsText||"";//弹出框内容区域
	this.dialogDrag=args.isDrag||false;//是否可拖拽
	this.buttonSureText=args.buttonSureText||"确定";//确定按钮
	this.buttonCancelText=args.buttonCancelText||"取消";//取消按钮
	this.dialogCallBack=args.callBack;//执行的回调函数
	
	//如果指定了对话框类型，就设定自身的默认尺寸
	if(this.dialogType=="alert"){
		this.dialogWidth=args.width||200;
		this.dialogHeight=args.height||107;
		this.dialogCallBack=args.callBack;	
	}else if(this.dialogType=="confirm"){
		this.dialogWidth=args.width||200;
		this.dialogHeight=args.height||107;
		this.dialogCallBack=args.callBack;
	}else if(this.dialogType=="prompt"){
		this.dialogWidth=args.width||200;
		this.dialogHeight=args.height||112;
		this.dialogCallBack=args.callBack;
	}else if(this.dialogType=="tips"){
		this.dialogWidth=args.width||150;
		this.dialogHeight=args.height||30;
		this.delay=args.delay*1000||3000;
		this.dialogCallBack=args.callBack;
	};
	//插入到页面
	this.insertDialogDOM();
};
PZ_Dialog.prototype={
	setDialogPrompt:function(){
		var _this=this,
			tipsTextBox=$("<div class='dialog_alert_tips'></div>"),
			textArea=$("<input placeholder='"+this.dialogText+"'/>"),
			btnBox=$("<div class='dialog_btn_box'></div>"),
			dialogBtnBox=$("<div class='dialog_btn_inner'></div>"),
			btn=$("<div class='dialog_alert_btn'><div>"+this.buttonCancelText+"</div></div>"),
			btnSure=$("<div class='dialog_alert_btn'><div>"+this.buttonSureText+"</div></div>");
		//绑定取消和执行callback
		btn.click(function(){
			_this.closeDialog();
		});
		btnSure.click(function(){
			_this.closeDialog();
			//处理文本域内的值并且把值传递给callback
			_this.dialogCallBack(textArea.val());
		});		
		textArea.keypress(function(e){
			if(e.which==13){
				_this.closeDialog();
				//处理文本域内的值并且把值传递给callba
				_this.dialogCallBack(textArea.val());
			};
		});
		
		btnBox.append(dialogBtnBox);
		dialogBtnBox.append(btnSure,btn);
		tipsTextBox.append(textArea);
		this.J_PZDialog_content.append(tipsTextBox,btnBox);
		this.J_PZDialog_close.remove();
		tipsTextBox.height(26);
		//设为光标焦点
		textArea.focus();
	},
	setDialogTips:function(){
		var _this=this;
		//删除内容,关闭按钮
		this.J_PZDialog_content.remove();
		
		this.J_PZDialog_close.hide();
		this.J_PZDialog_caption_text.css("paddingLeft",0).parent().attr({'class':''});
		window.setTimeout(function(){
			_this.closeDialog();
		},this.delay);
		_this.dialogCallBack();
	},
	setDialogDef:function(){
		var _this=this;
		this.J_PZDialog_content.html(this.dialogAlertTips);
		//alert(111)
		//回调
		// _this.dialogCallBack();
		//_this.closeDialog();
	},
	setDialogConfirm:function(){
		var _this=this,
			tipsTextBox=$("<div class='dialog_alert_tips'>"+this.dialogAlertTips+"</div>"),
			btnBox=$("<div class='dialog_btn_box'></div>"),
			dialogBtnBox=$("<div class='dialog_btn_inner'></div>"),
			btn=$("<div class='dialog_alert_btn'><div>"+this.buttonCancelText+"</div></div>"),
			btnSure=$("<div class='dialog_alert_btn'><div>"+this.buttonSureText+"</div></div>");
		//绑定取消和执行callback
		btn.click(function(){
			_this.closeDialog();
		});
		btnSure.click(function(){
			_this.closeDialog();
			_this.dialogCallBack();
		});
		btnBox.append(dialogBtnBox);
		dialogBtnBox.append(btnSure,btn);
		this.J_PZDialog_content.append(tipsTextBox,btnBox);
		this.J_PZDialog_close.remove();
	},
	setDialogAlert:function(){
		var _this=this,
			tipsTextBox=$(_this.dialogAlertTips),
			//tipsTextBox=$('<div class="UDTips">'+_this.dialogAlertTips+'</div>'),
			btn=$("<a class='btn btn2' id='btn-wy1' target='_blank' href='gopay.html'>去网上银行支付</a>"),
			closeBtn=$('<i class="icon icon-popClose"></i>');
			btn.click(function(){
				_this.dialogCallBack();	
				_this.closeDialog();
				});
			closeBtn.click(function(){
				_this.closeDialog();
				});
			this.J_PZDialog_caption.remove();
		this.J_PZDialog_content.attr({'class':'UDTips iw'}).append(tipsTextBox,btn).prepend(closeBtn);		
	},
	createMask:function(){
		this.mask=$("<div class='J_PZDialog_mask'></div>");
		this.setMaskCenter();
		//如果提供的参数是transparent，标识完全透明锁屏
		if(this.isMask=="transparent"){
			this.mask.css("opacity",0);
		}else{
			this.mask.css("opacity",this.isMask);
		};
		//插入到对话框的前面
		this.mask.insertBefore(this.J_PZDialog).fadeIn(500);
	},
	setMaskCenter:function(){
		this.mask.css({
					width:this.getWindowSize().width+(/MSIE\s+6\.0/.test(window.navigator.userAgent)?document.documentElement.scrollLeft:0)+"px",
					height:this.getWindowSize().height+(/MSIE\s+6\.0/.test(window.navigator.userAgent)?document.documentElement.scrollTop:0)+"px"
					});
	},
	setDialogCenter:function(){//设置弹出层居中显示
		var top=(this.getWindowSize().height-this.dialogHeight-10)/2<0?30:(this.getWindowSize().height-this.dialogHeight-20)/2;
		this.J_PZDialog.css({
							left:(this.getWindowSize().width-this.dialogWidth-10)/2+"px",
							top:top+"px"
							});
	},
	getWindowSize:function(){//获取窗口大小
		return {
			width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
			height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
			};
	},
	closeDialog:function(){
		var _this=this;
		//隐藏并删除对话框
		this.J_PZDialog.fadeOut("fast",function(){
			_this.J_PZDialog.remove();
		});
		//隐藏并删除幕布
		if(this.isMask){
			this.mask.fadeOut("fast",function(){
				_this.mask.remove();
			});
		};
	},
	addEvts:function(){//添加相关事件
		var _this=this;
		//给关闭按钮添加事件
		this.J_PZDialog_close.click(function(){
			_this.closeDialog();
		});
		//当窗口发生改变的时候实时设置居中
		$(window).resize(function(){
			//优化反复调整窗口大小带来的阻塞
			window.clearTimeout(t);
			var t=window.setTimeout(function(){
				_this.setDialogCenter()	;
			},300);
			//如果开起幕布，就实时调整大小
			if(_this.isMask){
				_this.setMaskCenter();
			};
		});
		//兼容ie6
		if(/MSIE\s+6\.0/.test(window.navigator.userAgent)){
			$(window).scroll(function(){
				if(_this.isMask){
					_this.mask.height(_this.getWindowSize().height+document.documentElement.scrollTop+"px");
				};
				_this.J_PZDialog.css("top",(_this.getWindowSize().height-_this.dialogHeight-10)/2+document.documentElement.scrollTop-100+"px");
			});
		};
	},
	insertDialogDOM:function(){	//创建DOM结构
		this.J_PZDialog=$("<div class='J_PZDialog'></div>"),//创建弹出层最外层DOM
		this.J_PZDialog_box=$("<div class='J_PZDialog_box'></div>"),//创建内层inner
		this.J_PZDialog_caption=$("<div class='popHd iw'></div>"),//创建弹出层头
		this.J_PZDialog_close=$("<i class='icon_close'></i>"),//创建关闭按钮
		this.J_PZDialog_caption_text=$("<span class='J_PZDialog_caption_text'></span>"),//创建文本提示信息
		this.J_PZDialog_content=$("<div class='popBd'></div>");//创建内容区域
		//拼接DOM结构
		this.J_PZDialog.append(this.J_PZDialog_box);
		this.J_PZDialog_box.append(this.J_PZDialog_caption,this.J_PZDialog_content);
		this.J_PZDialog_caption.append(this.J_PZDialog_close,this.J_PZDialog_caption_text);
		//设置提示框文本
		this.J_PZDialog_caption_text.html(this.dialogText);
		//为了兼容IE8	一下，这里需要指定J_PZDialog_box的宽度
		this.J_PZDialog_box.width(this.dialogWidth);
		//设置对话框的整体宽高
		this.J_PZDialog.width(this.dialogWidth);
		this.J_PZDialog.height(this.dialogHeight);
		//设置对话框居中显示
		this.setDialogCenter();
		//绑定相关事件
		this.addEvts();
		//插入到最底部
		this.J_PZDialog.appendTo(document.body).fadeIn(500);	
		//如果开起幕布遮罩
		if(this.isMask){
			this.createMask();
		}		
		//如果Dialog类型存在
		if(this.dialogType=="alert"){
			//设置alert内容
			this.setDialogAlert();
		}else if(this.dialogType=="confirm"){
			this.setDialogConfirm();
		}else if(this.dialogType=="tips"){
			this.setDialogTips();
		}else if(this.dialogType=="prompt"){
			this.setDialogPrompt();
		}else{
			this.setDialogDef();
			//如果是么人弹窗,并且开起了拖动，就要阻止关闭按钮事件冒泡
			if(this.dialogDrag){
				this.J_PZDialog_close.mousedown(function(e){e.stopPropagation();});
			};
		};
		//如果配置了拖动参数
		if(this.dialogDrag){
			this.J_PZDialog_caption.css("cursor","move");
			new PZ_DND({
					   handle:this.J_PZDialog_caption,
					   target:this.J_PZDialog
					   });
		};
	}
};
//注册到全局对象
window["PZ_Dialog"]=PZ_Dialog;
/**
@基于jQuery拖放函数
@new PZ_DND({
		   handle:this.J_PZDialog_caption,      //指定拖动的手柄
		   target:this.J_PZDialog				//指定拖动的目标元素
		   });
@杨永
@QQ:377746756
@call:18911082352
@版本:1.0
*/
function PZ_DND(args){
	var _this_=this;
	//初始化参数
	this.handle=args.handle;
	this.target=args.target;
	//绑定事件
	this.handle.mousedown(function(evt){
		//为了解决ie鼠标移除浏览器无法捕捉
		if(this.setCapture){this.setCapture();};
		evt.preventDefault();
		//获取鼠标相对于拖动目标的偏移
		var $this=this,
			layerX=_this_.getLayerPos(evt).x,
		    layerY=_this_.getLayerPos(evt).y;
		//注册document移动事件
		$(document).mousemove(function(evt){
			evt.preventDefault();
			_this_.move(evt,layerX,layerY);
		}).mouseup(function(){
			$(this).unbind("mousemove");
			$(this).unbind("mouseup");
			//取消ie鼠标移除浏览器无法捕捉
			if(this.releaseCapture){this.releaseCapture();};
			_this_.target.css({
						opacity:1
						});
		});
		//鼠标按下拖动时的样式
		_this_.target.css({
						opacity:0.8
						});
	});
};
PZ_DND.prototype={
	setTargetPos:function(left,top){
		//防止因滚动条产生的距离
		if(!/MSIE\s+6\.0/.test(window.navigator.userAgent)){//ie6不需要减
			left=left-(document.documentElement.scrollLeft||document.body.scrollLeft);
			top=top-(document.documentElement.scrollTop||document.body.scrollTop);
		};
		top=top<0?0:top>(this.getWindowSize().height-this.target.get(0).offsetHeight)?this.getWindowSize().height-this.target.get(0).offsetHeight:top;
		left=left<0?0:left>(this.getWindowSize().width-this.target.get(0).offsetWidth)?this.getWindowSize().width-this.target.get(0).offsetWidth:left;
		this.target.css({
						left:left+"px",
						top:top+"px"
						});
	},
	move:function(evt,layerX,layerY){//鼠标在document上移动要执行的函数
			this.setTargetPos(evt.pageX-layerX,evt.pageY-layerY);	
	},
	getLayerPos:function(evt){//获取鼠标相对于拖动目标的偏移
		return {
				x:evt.pageX-this.target.offset().left,
				y:evt.pageY-this.target.offset().top
			   };
	},
	getWindowSize:function(){//获取窗口大小
		return {
			width:document.documentElement.clientWidth||document.body.clientWidth,
			height:document.documentElement.clientHeight||document.body.clientHeight
			};
	}
};
window["PZ_DND"]=PZ_DND;
})();
