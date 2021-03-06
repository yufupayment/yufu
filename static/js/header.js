$(function(){
	headerFn()
})
function headerFn(){
	var headHtml, footHtml;
	headHtml ='<div class="header pos_r">'+
        '<div class="wrapper">'+
            '<a href=""><img class="logo fl" src="../static/img/new.png"></a>'+
            '<div class="fr headR mt-30">'+
                '<div class="topHead pos_r index5 clearfix_fixed">'+
                    '<a class="fr topBtn ml-10" target="_blank" href="#" title="注册">注册</a>'+
                    '<a class="fr topBtn J-login" target="_blank" href="#" title="用户登录">用户登录</a>'+
                    '<ul class="fr font14">'+
                        '<li><a href="../../yufu/pages/abu_contactus.html" class="aline a-tel iw" target="_blank" href="#" title="获取帮助"><i class="icon icon-tel"></i>获取帮助</a></li>'+
                        '<li><a class="aline a-qq iw" target="_blank" href="#" title="在线客服"><i class="icon icon-qq"></i>在线客服</a></li>'+
                        '<li class="weixin"><a class="a-weixin iw" href="#"><i class="icon icon-weixin"></i>&nbsp;<img src="../static/img/ewm.png"> </a></li>'+
                        '<li class="last"><a class="a-weibo iw" target="_blank" href="#"><i class="icon icon-weibo"></i>&nbsp;</a></li>'+
                    '</ul>'+
                '</div>'+
                '<div class="nav font18 mt-20">'+
                    '<ul class="fr">'+
                        '<li data-page="index"><a class="iw home" href="../../yufu/pages/index.html" title="首页"><i class="icon icon-home"></i>首页</a></li>'+
                        '<li class="pos_r" data-page="product">'+
                            '<a href="javascript:void(0)">产品服务</a>'+
                            '<div class="navmenu navbox1 pos_a">'+
                                '<i></i>'+
                                '<div class="item">'+
                                    '<dl>'+
                                        '<dt><a href="#">网络支付</a></dt>'+
                                        '<dd>'+
                                            '<ul class="font14 zoom menu-list1">'+
                                                '<li><a href="../../yufu/pages/pr_netpay.html?page=2">企业网银支付</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_netpay.html?page=3">个人网银支付</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_netpay.html?page=4">批量付款</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_netpay.html?page=5">快捷支付</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_netpay.html?page=6">扫码支付</a></li>'+
                                            '</ul>'+
                                        '</dd>'+
                                    '</dl>'+
                                '</div>'+
                                '<div class="item">'+
                                    '<dl>'+
                                        '<dt><a href="#">移动支付</a></dt>'+
                                        '<dd>'+
                                            '<ul class="font14 zoom menu-list1">'+
                                                '<li><a href="../../yufu/pages/pr_mobilepay.html?page=2">移动支付插件</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_mobilepay.html?page=5">裕福支付钱包</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_mobilepay.html?page=3">Wap网银支付</a></li>'+
                                                '<li class="width100"><a href="../../yufu/pages/pr_mobilepay.html?page=4">商户移动管理平台</a></li>'+
                                            '</ul>'+
                                        '</dd>'+
                                    '</dl>'+
                                '</div>'+
                                '<div class="item iw">'+
                                    '<dl>'+
                                        '<dt><a href="#">金融服务</a></dt>'+
                                        '<dd>'+
                                            '<ul class="font14 zoom">'+
                                                '<li><a href="../../yufu/pages/pr_finance.html?page=2">在线供应链融资服务</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_finance.html?page=3">贷后监控预警服务</a></li>'+
                                                '<li><a href="../../yufu/pages/pr_finance.html?page=4">数据融资授信服务</a></li>'+
                                            '</ul>'+
                                        '</dd>'+
                                    '</dl>'+
                                '</div>'+
                            '</div>'+
                        '</li>'+
                        '<li class="pos_r" data-page="case"><a href="../../yufu/pages/pro_internetFinance.html">行业解决方案</a></li>'+
                        '<li class="pos_r" data-page="safe"><a href="../../yufu/pages/sa_safe.html">安全中心</a></li>'+
                        '<li class="pos_r" data-page="service"><a href="../../yufu/pages/cus_company.html">客户服务</a></li>'+
                        '<li class="pos_r" data-page="aboutus"><a href="../../yufu/pages/ab_aboutus.html">关于我们</a>'+
                            '<div class="navmenu navbox2 pos_a">'+
                                '<i></i>'+
                                '<div class="item">'+
                                    '<dl>'+
                                        '<dt><a href="../../yufu/pages/ab_aboutus.html">公司简介</a></dt>'+
                                        '<dt><a href="../../yufu/pages/ab_events.html">大事记</a></dt>'+
                                        '<dt><a href="../../yufu/pages/ab_partners.html">合作伙伴</a></dt>'+
                                    '</dl>'+
                                '</div>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                    '<br class="clear">'+
                '</div>'+
            '</div>'+
            '<br class="clear">'+
        '</div>'+
    '</div>';
	footHtml='<div class="footer font14 pos_r">'+
        '<div class="wrapper zoom">'+
            '<div class="fl footL tc">'+
                '<div class="pic">'+
                    '<a href="#" target="_blank" title="支付业务许可证"><img src="../static/img/identy.jpg"></a>'+
                '</div>'+
                '<p>支付业务许可证</p>'+
            '</div>'+
            '<div class="zoom">'+
                '<div class="font16 footer1">'+
                    '<a class="huib6" href="../../yufu/pages/ab_aboutus.html">关于我们</a><em>|</em>'+
                    '<a class="huib6" href="../../yufu/pages/abu_contactus.html">联系我们</a><em>|</em>'+
                    '<a class="huib6" href="../../yufu/pages/BusiJoin.html">加盟合作</a><em>|</em>'+
                    '<a class="huib6" href="../../yufu/pages/job_center.html">招聘信息</a><em>|</em>'+
                    '<a class="huib6" href="../../yufu/pages/map.html">网站地图</a><em>|</em>'+
                    '<a class="huib6" href="../../yufu/pages/agreement.html">服务协议</a>'+
                '</div>'+
                '<div class="footer2 mt-15">'+
				    '联系地址：北京市朝阳区光华里丙17号  客户咨询电话：010-65305555<br/>'+
                    'Copyright 2015 Fuka.cc Inc.Allrights reserved 京ICP备06060349号-1 京公网安备11010502013050'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'
	$('header').html(headHtml);
	$('footer').html(footHtml);
}


