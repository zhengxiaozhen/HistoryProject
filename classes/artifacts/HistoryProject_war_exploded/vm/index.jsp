<%@ page contentType="text/html;charset=utf-8" language="java" import="java.sql.*" errorPage="" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>广西居住证制证系统</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=8,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="format-detection" content="telephone=no">
	<%@include file="/vm/resource.jsp" %>
	<link rel="stylesheet" href="../css/global.css" media="all">
	<link rel="stylesheet" href="../js/plugins/font-awesome-4.7.0/css/font-awesome.min.css">
	<script src="../js/public/html5shiv.min.js"></script>
	<script src="../js/index.js"></script>
	<style>
		.clearfix:after {
			content: "\200B";
			display: block;
			height: 0;
			clear: both;
		}
		.clearfix {
			*zoom: 1;
		}
		.layui-header {
			height: 40px;
		}
		.admin-login-box {
			height: 40px;
		}
		.admin-side-toggle,
		.admin-side-full {
			top: 8px;
		}
		.logo {
			top: 10px;
		}
		.header-demo .layui-nav .layui-nav-item {
			line-height: 40px;
		}
		.layui-nav-child {
			top: 40px;
		}
		.layui-layout-admin .layui-side,
		.layui-layout-admin .layui-body {
			top: 135px;
		}
		.layui-tab-title {
			height: 30px;
		}
		.layui-tab-title li {
			line-height: 30px;
		}
		.layui-tab-title .layui-this:after {
			height: 34px;
		}
		.header .layui-nav-bar {
			top: 40px !important;
		}
		.logo-img {
			background: url(../images/background-image.jpg) no-repeat;
		}
		.layui-nav-item {
			float: left;
		}
		.layui-side-scroll {
			overflow-y: auto;
		}
	</style>
</head>
<body>
	<div class="layui-layout layui-layout-admin" style="border-bottom: solid 5px #1aa094;">
  <div style="width:100%;height:90px;" class="logo-img">
			<img src="../images/logo.png" style="margin:20px 0 0 20px" />
		</div>
		<div class="layui-header header header-demo">
	  		<div class="admin-login-box">
	  			<a href="#" class="logo">平台首页</a>
				<div class="admin-side-toggle">
					<i class="fa fa-exchange" aria-hidden="true"></i>
				</div>
				<!-- 仅IE11及以上可以使用该全屏功能，先屏蔽 -->
				<!-- <div class="admin-side-full">
					<i class="fa fa-life-bouy" aria-hidden="true"></i>
				</div> -->
	  		</div>
	  		<ul class="layui-nav topLevelMenus" id="father-menu-ul"></ul>
			<ul class="layui-nav top_menu clearfix">
				<li class="layui-nav-item" id="userInfo">
					<a href="/gxjzz/jsp/logout.jsp" class="signOut" style="color:#fff">
						<i class="fa fa-power-off"></i>
						<cite>退出</cite>
					</a>

				</li>
			</ul>
		</div>
		<div class="layui-side layui-bg-black" id="admin-side">

			<div class="layui-side-scroll" id="admin-navbar-side" lay-filter="side"></div>
		</div>
		<div class="layui-body" style="bottom: 0;border-left: solid 2px #1AA094;" id="admin-body">
			<div class="layui-tab admin-nav-card layui-tab-brief" lay-filter="admin-tab">
				<ul class="layui-tab-title">
					<li class="layui-this" id="work-space" data-url="">
						<i class="fa fa-dashboard" aria-hidden="true"></i>
						<cite>我的工作平台</cite>
					</li>
				</ul>
				<div class="layui-tab-content" style="min-height: 150px; padding: 5px 0 0 0;">
					<div class="layui-tab-item layui-show" id="defualt-ifm">
						<iframe id="cent-iframe" src="demo/demo-1.html"></iframe>
					</div>
				</div>
			</div>
		</div>
		<div class="layui-footer footer footer-demo" id="admin-footer">
			<div class="layui-main">
				<p>2018 &copy; 福建天创信息科技股份有限公司 </p>
			</div>
		</div>
		<div class="site-tree-mobile layui-hide"> <i class="layui-icon">&#xe602;</i> </div>
		<div class="site-mobile-shade"></div>
	</div>
</body>
</html>