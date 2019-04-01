<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../css/system.css"/>
    <%@include file="/vm/resource.jsp" %>
    <object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488" id="JITDSignOcx" width="0"
            codebase="./JITDSign.cab#version=2,0,24,19" style="height:0px;"></object>
</head>
<body style="position:relative;">

<img src="../img/bg.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;">
<div class="sys_coant" style="position:absolute;">
    <div class="sys_img">
        <img src="../img/logo.png"/>
    </div>
    <div class="sys_float">
        <div class="sysLeft"><img src="../img/zt.png"/></div>
        <div class="sysRight">
            <ul>
                <li class="landstyle">账号密码登录</li>
                <li>数字证书登录</li>
            </ul>
            <div class="landBox">
                <form name="form1" id="form" method="post" action="/gxjzz/jsp/login_check.jsp">
                    <input type="hidden" id="RootCADN" value="" width="30"/><!--font color="red">(过滤证书选择框中的证书)</font-->
                    <input type="hidden" id="signed_data" name="signed_data"/>
                    <input type="hidden" id="original_jsp" name="original_jsp"/>
                    <!--账号密码登录-->
                    <div class="landcont">
                        <div class="land_div">
                            <img src="../img/id1.png" alt=""/>
                            <input type="text" name="username" id="username" value="" placeholder="请输入用户名"/>
                            <img src="../img/closed.png" class="close"/>
                        </div>
                        <div class="land_div">
                            <img src="../img/id2.png" alt=""/>
                            <input type="password" name="password" id="password" value="" placeholder="请输入密码"/>
                            <img src="../img/closed.png" class="close"/>
                        </div>
                        <div class="land_div" id="checkCode">
                            <img src="../img/id3.png" alt=""/>
                            <input type="text" name="" id="code_input" class="code varify-input-code" value=""
                                   placeholder="请输入验证码"/>
                        </div>
                        <div class="land_sub"><input type="button" id="check-btn" name="" value="登录"></div>

                    </div>
                    <!--数字证书登录-->
                    <div class="landcont" hidden="hidden" style="display:none">
                        <div class="xsland_div" style="height:52px;"></div>
                        <div class="land_sub"><input type="button" id="" name="" value="数字证书登录"
                                                     style="width:284px; margin-left:18px;" onClick="pki_login()"/>
                        </div>
                        <div class="xsland_div" style="height:52px;"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="foot">
    <div class="footBox">历史档案 技术支持：TTWB.COM</div>
</div>
<script type="text/javascript" src="../js/verify.js"></script>
<script type="text/javascript">
    $(function () {
        //	切换
        var UL_list = $(".sysRight ul li");
        var landBox = $(".landBox .landcont");
        $(UL_list).on("click", function () {
            $(this).addClass("landstyle").siblings().removeClass("landstyle");
            $(landBox[$(this).index()]).show().siblings(".landBox .landcont").hide();
        });
        //  input获取焦点
        $(".land_div input").focus(function () {
            $(this).siblings('.close').show();
            $(this).parents().siblings().find('.close').hide()
        });
        // 清除input
        $('.land_div .close').click(function () {
            $(this).siblings('input').val('')
            $(this).hide();
        });
        code('#checkCode');

        //get_pki_rand();
    });

    // 验证码
    function code(id) {
        $(id).codeVerify({
            type: 1,
            width: '70px',
            height: '20px',
            fontSize: '14px',
            codeLength: 4,
            ready: function () {
            },
            success: function () {
                //alert('验证匹配！');
                btn_submit();
            },
            error: function () {
                alert('验证码不匹配！');
            }
        });
    }

    //登录
    function btn_submit() {
        if ($('#username').val() == "") {
            alert('账号不能为空！');
            return;
        }
        if ($('#password').val() == "") {
            alert('密码不能为空！');
            return;
        }
        // httpService.POST("111");
        var obj = {};
        obj.userName = $('#username').val();
        obj.password = $('#password').val();
        var call = function (data) {
           if (data.data=='true')
           {
               window.location.href="/index";
           }else {
               alert("账号或密码错误！");
               window.location.href="/login";
           }

        }
        var data = jQuery.extend(true, {}, obj);
        //时间格式要转换
        //Common.switchDateToTimestamp(data);
        httpService.POST('/login/user', data, call);

        //form.submit();
    }


    //数字证书登录
    function pki_login() {
        var Auth_Content = original;
        var DSign_Subject = document.getElementById("RootCADN").value;
        if (Auth_Content == "") {
            alert("认证原文不能为空!");
        } else {
            //控制证书为一个时，不弹出证书选择框
            JITDSignOcx.SetCertChooseType(1);
            JITDSignOcx.SetCert("SC", "", "", "", DSign_Subject, "");
            if (JITDSignOcx.GetErrorCode() != 0) {
                alert("错误码：" + JITDSignOcx.GetErrorCode() + "　错误信息：" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
                return false;
            } else {
                var temp_DSign_Result = JITDSignOcx.DetachSignStr("", Auth_Content);
                if (JITDSignOcx.GetErrorCode() != 0) {
                    alert("错误码：" + JITDSignOcx.GetErrorCode() + "　错误信息：" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
                    return false;
                }
                //如果Get请求，需要放开下面注释部分
                //	 while(temp_DSign_Result.indexOf('+')!=-1) {
                //		 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
                //	 }
                document.getElementById("signed_data").value = temp_DSign_Result;
            }
        }
        document.getElementById("original_jsp").value = Auth_Content;
        document.form.action = "/gxjzz/jsp/login_pki_authen.jsp";
        document.form.submit();
    }

    var original = "";

    function get_pki_rand() {
        $.ajax({
            url: "/gxjzz/jsp/get_pki_randNum.jsp",
            type: 'POST',
            data: {},
            dataType: 'json',
            timeout: 20000,
            error: function (err) {
                alert("请求失败" + JSON.stringify(err));
            },
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                if (status == 'timeout') {//超时,status还有success,error等值的情况
                    alert("超时");
                }
            },
            success: function (result) {
                var marker = result.datas[0];
                original = marker.original;
            }
        });
    }
</script>
</body>
</html>