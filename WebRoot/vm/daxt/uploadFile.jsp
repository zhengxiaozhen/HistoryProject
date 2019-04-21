<%--
  Created by IntelliJ IDEA.
  User: zhoulq
  Date: 2019/2/13
  Time: 8:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery.form.js"></script>

    <script type="text/javascript">
        function fileOnchage(){
            var option = {
                type:"post",
                data:{myUploadFile:'uploadFile'},
                dataType:"json",
                url:"${pageContext.request.contextPath }/uploadContorller",
                success:function(data){
                    //String格式json，转json对象
                     //var data = eval(json.toString());
                    //将对象转String格式的json（例如数组）
                    //JSON.stringify('obj');
                    for(var i in data){
                        //var json = $.parseJSON(data[i]);
                        //console.log(json.fullPath);

                         $("#picImg").append('<img id="myImg" src="'+data[i].fullPath+'"/>');
                    }
                },
                error:function(data) {
                 console.log(data);
                }
            };
            $("#fileForm").ajaxSubmit(option);
        }
    </script>
</head>
<body>
<form id="fileForm" method="post">
    <div id="picImg"></div>
    <input type="file" name="uploadFile" value="请选择" multiple="multiple" onchange="fileOnchage()"/>
    <input type="hidden" id="relativePath" value="">
</form>
</body>
</html>