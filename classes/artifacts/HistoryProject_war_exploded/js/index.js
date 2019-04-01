/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

var tab;
var menuArray=new Array();
var thisMenuList = new Array();
var isShowLock = false;
var menusData=[];
var pageNo = 1;
var pageSize = 0;
var yjtanarg=true;//预警弹窗控制
var allcn=0;//预警信息当前数量，发生变化才声音提醒，以及弹窗控制
jQuery(document).ready(function(e) {
	layui.config({
	    base: 'js/',
	    version: new Date().getTime()
	}).use(['element', 'layer', 'navbar', 'tab'], function () {
	    var element = layui.element,
	        $ = layui.jquery,
	        layer = layui.layer,
	        navbar = layui.navbar();
	        pageSize = Number(($(document).width() - 320) / 200);
	    tab = layui.tab({
	        elem: '.admin-nav-card', //设置选项卡容器
	        maxSetting: {
	        	max: 20,
	        	tipMsg: '只能同时开20个页面。'
	        },
	        autoRefresh: true,
	        contextMenu: true,
	        onSwitch: function (data) {
	            /*console.log(data.id); //当前Tab的Id
	            console.log(data.index); //得到当前Tab的所在下标
	            console.log(data.elem); //得到当前的Tab大容器
	            console.log(tab.getCurrentTabId())*/
	        },
	        closeBefore: function (obj) { //tab 关闭之前触发的事件
	           /* console.log(obj);
	            //obj.title  -- 标题
	            //obj.url    -- 链接地址
	            //obj.id     -- id
	            //obj.tabId  -- lay-id
	            if (obj.title === 'BTable') {
	                layer.confirm('确定要关闭' + obj.title + '吗?', { icon: 3, title: '系统提示' }, function (index) {
	                    //因为confirm是非阻塞的，所以这里关闭当前tab需要调用一下deleteTab方法
	                    tab.deleteTab(obj.tabId);
	                    layer.close(index);
	                });
	                //返回true会直接关闭当前tab
	                return false;
	            }else if(obj.title==='表单'){
	                layer.confirm('未保存的数据可能会丢失哦，确定要关闭吗?', { icon: 3, title: '系统提示' }, function (index) {
	                    tab.deleteTab(obj.tabId);
	                    layer.close(index);
	                });
	                return false;
	            }
				*/
	            return true;
	        }
	    });

		jQuery.ajax({
			url:"jsp/tree_json.jsp",
			dataType:"json",
			data:{
				parent_menu: ''
			},
			type:'post',
			success: function(json){
				if(json.sta[0].cod=="9"){
					layer.alert('用户信息获取失败，请重新登录！',{skin:'layui-layer-molv',shade:false,closeBtn:0, end: function () {
						window.top.location = 'login.html';
					}});
					return;
				}
				var divHtml = "";
				var navHtml = "";		//下拉菜单
				formatMenu(json.datas);
				jQuery(menusData).each(function (index,element) {
					var className = "";
					var icon = element.layui_icon;
					if(icon==undefined||icon==null||icon==''){
						icon="&#xe63c;"
					}
					if(index==0){
						className = "class=\"layui-this\"";
					}
					//<dd class="layui-this" data-menu="contentManagement"><a href="javascript:;"><i class="layui-icon" data-icon="&#xe63c;">&#xe63c;</i><cite>内容管理</cite></a></dd>


					navHtml+="<dd "+className+" data-menu='"+element.nid+"'>" + "<a href=\"javascript:;\"><i class='layui-icon' data-icon='"+icon+"'>"+icon+"</i><cite>"+element.sname+"</cite></a></dd>";
					if(index<pageSize){
						divHtml+=" <li class='layui-nav-item' data-url='"+element.slink+"' data-default='"+element.defaulturl+"' data-target='"
						+element.opentype+"' data-menu='"+element.nid+"' data-end='"+element.end+"'>"
						+"<a href='javascript:;'>";
						if (icon.indexOf('fa-') !== -1) {
							divHtml += '<i class="fa ' + icon + '" aria-hidden="true" data-icon="' + icon + '"></i>';
						} else {
							divHtml += '<i class="layui-icon" data-icon="' + icon + '">' +icon + '</i>';
						}
						divHtml += "<cite>"+element.sname+"</cite></a></li>";
					}
				});
				if(menusData.length>pageSize){
					divHtml+="<img class='page-image' title='下一页' id='next-menus' src='images/next.png' width='20px' height='20px' style='margin-top:10px;margin-left:20px;cursor:pointer;'/>";
				}
				jQuery("#father-menu-ul").empty().append(divHtml);
				//一级菜单点击事件
				$(document).on("click",".topLevelMenus .layui-nav-item",function(){
					var pid = $(this).attr("data-menu");
					var dataUrl = $(this).attr("data-url");
					var dataDefault = $(this).attr("data-default");
					var dataTarget = $(this).attr("data-target");
					var dataEnd = $(this).attr("data-end");
					if(dataUrl!=undefined&&dataUrl!='0'&&dataUrl!=''&&dataTarget=='main'){
						var sideWidth = $('#admin-side').width();
						if (sideWidth === 200) {
							$(".admin-side-toggle").trigger("click");
						}
						tab.tabAdd({
							href: dataUrl, //地址
							icon: $(this).find("i").text(),
							title: $(this).find("cite").text()
						});
						return false;
					}else if(dataUrl!=undefined&&dataUrl!='0'&&dataUrl!=''&&dataTarget=='windowOpen'){
						window.open(dataUrl);
						return false;
					}else{
						var sideWidth = $('#admin-side').width();
						if (sideWidth != 200) {
							$(".admin-side-toggle").trigger("click");
						}
					}
					//默认页面
					linkDefault(this);
					if (!Number(dataEnd)) {
						jQuery.ajax({
							url:"jsp/tree_json.jsp",
							dataType:"json",
							data:{
								parent_menu: pid
							},
							type:'post',
							success: function(json){
								if(json.sta[0].cod=="9"){
									layer.alert('用户信息获取失败，请重新登录！',{skin:'layui-layer-molv',shade:false,closeBtn:0, end: function () {
										window.top.location = 'login.html';
									}});
									return;
								}
								menuArray = [];
								$(json.datas).each(function (index, item) {
									var obj = {};
									obj.end = item.menu_end;
									obj.href = item.menu_href;
									obj.title = item.menu_name;
									obj.icon = '&#xe649;';
									if (item.menu_end == '0') {//存在子级
										obj.children = [];
										jQuery.ajax({
											url:"jsp/tree_json.jsp",
											dataType:"json",
											async: false,
											data:{
												parent_menu: item.menu_id
											},
											type:'post',
											success: function(json){
												if(json.sta[0].cod=="9"){
													layer.alert('用户信息获取失败，请重新登录！',{skin:'layui-layer-molv',shade:false,closeBtn:0, end: function () {
														window.top.location = 'login.html';
													}});
													return;
												}
												$(json.datas).each(function (index, item) {
													var objChild = {
														href: item.menu_href,
														title: item.menu_name,
														icon: '&#xe64c;'
													};
													obj.children.push(objChild);
												});
											},error:function(data){
												layer.msg('获取菜单异常', {icon: 7});
											}
										});
									}
									menuArray.push(obj);
									thisMenuList=[];
									thisMenuList = menuArray;
									//设置navbar
									navbar.set({
										spreadOne: true,
										elem: '#admin-navbar-side',
										cached: true,
										pid:pid,
										data: thisMenuList
										/*cached:true,
										url: 'datas/nav.json'*/
									});
									//渲染navbar
									navbar.render();
									 //监听点击事件
									navbar.on('click(side)', function (data) {
										var href = data.field.href;
										if(""==href||'0'==href){
											href='/error/404.jsp';
										}
										data.field.href = href;
										if(data.field.target=='windowOpen'){
											window.open(data.field.href);
											return false;
										}
										tab.tabAdd(data.field);
									});
								});
							},error:function(data){
								layer.msg('获取菜单异常', {icon: 7});
							}
						});
					}
				});
			    $(document).on("click",".second-menu",function(){
					linkDefault(this);
				});  
				jQuery("#father-menu-ul li").eq(0).addClass('layui-this').click();//默认点击第一个菜单
			},error:function(data){
				layer.msg('获取菜单异常', {icon: 7});
			}
		});
	    //iframe自适应
	    $(window).on('resize', function () {
	        var $content = $('.admin-nav-card .layui-tab-content');
	        $content.height($(this).height() - 237);
	        $content.find('iframe').each(function () {
	            $(this).height($content.height());
	        });
	    }).resize();
		  
	    //清除缓存
	    $('#clearCached').on('click', function () {
	        navbar.cleanCached();
	        layer.alert('清除完成!', { icon: 1, title: '系统提示' }, function () {
	            location.reload();//刷新
	        });
	    });
	    $('.admin-side-toggle').on('click', function () {
	        var sideWidth = $('#admin-side').width();
	        if (sideWidth === 200) {
	            $('#admin-body').animate({
	                left: '0'
	            }); //admin-footer
	            $('#admin-footer').animate({
	                left: '0'
	            });
	            $('#admin-side').animate({
	                width: '0'
	            });
	        } else {
	            $('#admin-body').animate({
	                left: '200px'
	            });
	            $('#admin-footer').animate({
	                left: '200px'
	            });
	            $('#admin-side').animate({
	                width: '200px'
	            });
	        }
	    });
	    $('.admin-side-full').on('click', function () {
	        var docElm = document.documentElement;
	        //W3C  
	        if (docElm.requestFullscreen) {
	            docElm.requestFullscreen();
	        }
	        //FireFox  
	        else if (docElm.mozRequestFullScreen) {
	            docElm.mozRequestFullScreen();
	        }
	        //Chrome等  
	        else if (docElm.webkitRequestFullScreen) {
	            docElm.webkitRequestFullScreen();
	        }
	        //IE11
	        else if (elem.msRequestFullscreen) {
	            elem.msRequestFullscreen();
	        }
	        layer.msg('按Esc即可退出全屏');
	    });
	    $('#setting').on('click', function () {
	        tab.tabAdd({
	            href: '/Manage/Account/Setting/',
	            icon: 'fa-gear',
	            title: '设置'
	        });
	    });
	    //锁屏
	    $(document).on('keydown', function () {
	        var e = window.event;
	        if (e.keyCode === 76 && e.altKey) {
	            //alert("你按下了alt+l");
	            lock($, layer);
	        }
	    });
	    $('#lock').on('click', function () {
	        lock($, layer);
	    });
	    //手机设备的简单适配
	    var treeMobile = $('.site-tree-mobile'),
	        shadeMobile = $('.site-mobile-shade');
	    treeMobile.on('click', function () {
	        $('body').addClass('site-mobile');
	    });
	    shadeMobile.on('click', function () {
	        $('body').removeClass('site-mobile');
	    });
		//菜单搜索框清除事
		$("body").on("click",".menu-search-clear",function(){
			$("#menuSearch").val("");
			$(".menu-search-clear").hide();
			navbar.set({
				spreadOne: true,
				elem: '#admin-navbar-side',
				cached: true,
				pid:'',
				data: thisMenuList
			});
			//渲染navbar
			navbar.render();
			navbar.on('click(side)', function (data) {
				if(data.field.target=='windowOpen'){
					window.open(data.field.href);
					return false;
				}
				tab.tabAdd(data.field);
			});
		});
		//菜单搜索
		$("body").on("keyup","#menuSearch",function(){
			if ($("#menuSearch").val() == "") {
				$(".menu-search-clear").hide();
					//显示默认菜单
				navbar.set({
					spreadOne: true,
					elem: '#admin-navbar-side',
					cached: true,
					pid:'',
					data: thisMenuList
				});
				//渲染navbar
				navbar.render();
				navbar.on('click(side)', function (data) {
					if(data.field.target=='windowOpen'){
						window.open(data.field.href);
						return false;
					}
					tab.tabAdd(data.field);
				});
			} else {
				$(".menu-search-clear").show();
				//显示搜索结果菜单
				var k = strTotrim($("#menuSearch").val());
				if (k == "") return;
				var arr = [];
				var patt = new RegExp(k);
				for (var i = 0; i < thisMenuList.length; i++) {
					if (thisMenuList[i].href != 0) {
						if (patt.test(thisMenuList[i].title) || patt.test(thisMenuList[i].href)) {
							arr.push({title: thisMenuList[i].title, href: thisMenuList[i].href, icon: thisMenuList[i].icon,target: thisMenuList[i].target});
						}
					}
					if (thisMenuList[i].children) {
						for (var j = 0; j < thisMenuList[i].children.length; j++) {
							if (patt.test(thisMenuList[i].children[j].title) || patt.test(thisMenuList[i].children[j].href)) {
								arr.push({
									title: thisMenuList[i].children[j].title,
									href: thisMenuList[i].children[j].href,
									icon: thisMenuList[i].children[j].icon,
									target: thisMenuList[i].children[j].target
								});
							}
						}
					}
				}
				navbar.set({
					spreadOne: true,
					elem: '#admin-navbar-side',
					cached: true,
					pid:'',
					data: arr
					/*cached:true,
					url: 'datas/nav.json'*/
				});
				//渲染navbar
				navbar.render();
				navbar.on('click(side)', function (data) {
					if(data.field.target=='windowOpen'){
						window.open(data.field.href);
						return false;
					}
					tab.tabAdd(data.field);
				});
			}
		});
		jQuery("#chage-pwd").click(function(){
			var url = "chagePassword.jsp";
			LayOpen('修改密码',url,'540px','380px');
		});
		jQuery("#work-space").click(function(){
			jQuery("#cent-iframe").attr("src",$(this).attr("data-url"));
		});
		jQuery(document).on("click","#prev-menus",function(){
			if(pageNo==1){
				return false;
			}
			pageNo=pageNo-1;
			anaMenus(menusData);
		});
		jQuery(document).on("click","#next-menus",function(){
			var pages = Math.ceil(menusData.length/pageSize);
			if(pageNo==pages){
				return false;
			}
			pageNo=pageNo+1;
			anaMenus(menusData);
		});
	});
});
//顶级菜单跳转到默认页面
function linkDefault(_this){
	var defaulturl = $(_this).attr("data-default");
	if(defaulturl!= 'undefined' && defaulturl!=""){
		menu_name = $(_this).find("cite").text();
		defaulturl = defaulturl+"?menu_name="+menu_name;
		$(".layui-show").removeClass("layui-show");
		$("#defualt-ifm").addClass("layui-show").find("iframe").attr("src",defaulturl);
	}
}
//去空格
function strTotrim(str) {
	return str.replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}
function lock($, layer) {
    if (isShowLock)
        return;
    //自定页
    layer.open({
        title: false,
        type: 1,
        closeBtn: 0,
        anim: 6,
        content: $('#lock-temp').html(),
        shade: [0.9, '#393D49'],
        success: function (layero, lockIndex) {
            isShowLock = true;
            layero.find('input[name=password]')
            .on('focus', function () {
                var $this = $(this);
                if ($this.val() === '输入密码解锁..') {
                    $this.val('').attr('type', 'password');
                }
            })
            .on('blur', function () {
                var $this = $(this);
                if ($this.val() === '' || $this.length === 0) {
                    $this.attr('type', 'text').val('输入密码解锁..');
                }
            });
            //在此处可以写一个请求到服务端删除相关身份认证，因为考虑到如果浏览器被强制刷新的时候，身份验证还存在的情况			
            //do something...
            //e.g. 
            $.getJSON('/Account/Logout', null, function (res) {
                if (!res.rel) {
                    layer.msg(res.msg);
                }
            }, 'json');
            //绑定解锁按钮的点击事件
            layero.find('button#unlock').on('click', function () {
                var $lockBox = $('div#lock-box');
                var userName = $lockBox.find('input[name=username]').val();
                var pwd = $lockBox.find('input[name=password]').val();
                if (pwd === '输入密码解锁..' || pwd.length === 0) {
                    layer.msg('请输入密码..', {
                        icon: 2,
                        time: 1000
                    });
                    return;
                }
                unlock(userName, pwd);
            });
			/**
			 * 解锁操作方法
			 * @param {String} 用户名
			 * @param {String} 密码
			 */
            var unlock = function (un, pwd) {
                //这里可以使用ajax方法解锁
                $.post('/Account/UnLock', { userName: un, password: pwd }, function (res) {
                    //验证成功
                    if (res.rel) {
                        //关闭锁屏层
                        layer.close(lockIndex);
                        isShowLock = false;
                    } else {
                        layer.msg(res.msg, { icon: 2, time: 1000 });
                    }
                }, 'json');
                //isShowLock = false;
                //演示：默认输入密码都算成功
                //关闭锁屏层
                //layer.close(lockIndex);
            };
        }
    });
};
function anaMenus(data){
	var divHtml = "";
	jQuery(data).each(function (index,element) {
		if(index>=pageSize*(pageNo)){
			return false;
		}
		if(index<pageSize*(pageNo-1)){
			return true;
		}
		var icon = element.layui_icon;
		if(icon==undefined||icon==null||icon==''){
			icon="&#xe63c;"
		}
		divHtml+=" <li class='layui-nav-item' data-url='"+element.slink+"' data-default='"+element.defaulturl+"' data-target='"
		+element.opentype+"' data-menu='"+element.nid+"' data-end='"+element.end+"'>"
		+"<a href='javascript:;'>";
		if (icon.indexOf('fa-') !== -1) {
			divHtml += '<i class="fa ' + icon + '" aria-hidden="true" data-icon="' + icon + '"></i>';
		} else {
			divHtml += '<i class="layui-icon" data-icon="' + icon + '">' +icon + '</i>';
		}
		divHtml += "<cite>"+element.sname+"</cite></a></li>";
	});
	if(1==pageNo){

	}else{
		divHtml+="<img class='page-image' title='上一页' id='prev-menus' src='images/before.png'  width='20px' height='20px' style='margin-top:10px;margin-left:20px;cursor:pointer;'/>";
	}
	var pages = Math.ceil(menusData.length/pageSize);
	if(pages==pageNo){

	}else{
		divHtml+="<img class='page-image' title='下一页' id='next-menus' src='images/next.png'  width='20px' height='20px' style='margin-top:10px;margin-left:20px;cursor:pointer;'/>";
	}
	$("#father-menu-ul").empty().append(divHtml);
}
function LayOpen(title,url,width,height,isTop) {
	if (typeof(isTop) == "undefined" || isTop == null) {
		var index = layui.layer.open({
			type: 2,
			title:title,
			skin: 'layui-layer-molv',
			content: url,
			area: [width, height],
			resize: false,
			anim: 1,
			success: function (layero, index) {
			}
		})
	}
}
// 转化菜单数据
function formatMenu(data) {
	$(data).each(function (index, item) {
		var obj = {};
		obj.end = item.menu_end;
		if (item.menu_parent == '0') {//一级菜单
			obj.nid = item.menu_id;
			obj.sname = item.menu_name;
			obj.icon = '&#xe647;';
			obj.layui_icon = '&#xe647;';
		}
		if (item.menu_end == '1') {//没有子级
			if (item.menu_href != '') {
				obj.slink = item.menu_href;
				obj.opentype = 'main';
			}
		} else {
			obj.opentype = '';
			obj.children = [];
		}
		menusData.push(obj);
	});
}
