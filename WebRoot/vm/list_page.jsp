<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.util.JdbcUtil"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0"> 
	<style>
		table{
			font-size:12px;
		}
	</style>   
  </head>
  
  <body>

<%
	Connection conn = null;
	Statement stmt = null;
	ResultSet rs = null;
	String sql = null;
	
	//定义分页的需要用到的变量
	int rsCount=  0;
	int pageSize = 10;
	int pageCount = 0;
	int currentPage = 1;
	
	//算总记录数
	sql = "Select count(1) as rsCount From tc_jcyw.t_org";
	conn = JdbcUtil.getConn();
	stmt = conn.createStatement();
	rs = stmt.executeQuery(sql);
	if (rs.next()){
		rsCount = rs.getInt("rsCount");
	}
	rs.close();
	rs = null;
	
	//算总页数
	pageCount = ((rsCount - 1)/pageSize) + 1;
	
	//获取当前页
	if (request.getParameter("currentPage") != null){
		currentPage = Integer.parseInt(request.getParameter("currentPage"));
	}
	
	sql = "Select ORGNAME orgname,SUNIT_CODE orgid  From tc_jcyw.t_org ";
	List<Map<String,Object>> userList = JdbcUtil.getResultList(sql);
%>
<form action="" method="post" name="form1">
  <table width="100%" border="1" cellpadding="0" cellspacing="0" bordercolorlight="#D1FEFB" bordercolordark="#FFFFFF">
    <tr>
      <td height="25" align="center"><input type="checkbox" name="checkbox" value="checkbox"></td>
      <td height="25" align="center">序号</td>
      <td height="25" align="center">用户名</td>
      <td align="center">真实姓名</td>
      <td align="center">性别</td>
      <td align="center">年龄</td>
      <td colspan="2" align="center">操作</td>
    </tr>
<% 
	if (userList.size()>0){
		int start = (currentPage-1)*pageSize;
		int end = currentPage*pageSize -1;
		if (end >userList.size()){
			end = userList.size()-1;
		}
	for(int i = start;i<=end;i++){
		Map<String,Object> map = userList.get(i);
%>
    <tr>
      <td height="25"><input type="checkbox" name="checkbox" value="checkbox"></td>
      <td height="25"><%=i+1%></td>
      <td height="25"><%=map.get("orgid")%></td>
      <td>&nbsp;<%=map.get("orgid")%></td>
      <td align="center">修改</td>
      <td align="center">
      
       删除
      
      </td>
    </tr>
<%}}%>
    <tr>
      <td height="25" colspan="8"><input type="submit" name="Submit" value="删除用户">
      <input type="reset" name="Submit2" value="取消选择"></td>
    </tr>
  </table>

</form>
  <br>
    <% 
  	out.println(request.getRequestURI());
  %>
  <form name="pageForm" id="pageForm" method="post" action="list_page.jsp">
  <table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td width="43%" height="25" align="center">
      	共有记录<%=rsCount%>条&nbsp;&nbsp;&nbsp;&nbsp;
      	每页<%=pageSize%>条&nbsp;&nbsp;&nbsp;&nbsp; 
      	现<%=currentPage%>/<%=pageCount%>页&nbsp;&nbsp;&nbsp;&nbsp;      </td>
      <td width="57%">
       <% 
       		int prev_page = currentPage -1 ;
       		if(prev_page<=0){
       			prev_page = 1;
       		}
       		int next_page = currentPage + 1;
       		if (next_page>=pageCount){
       			next_page = pageCount;
       		}
       %>
      	<a href="list_page.jsp?currentPage=1">首页</a>&nbsp;&nbsp;&nbsp;&nbsp; 
      	
      	<a href="list_page.jsp?currentPage=<%=prev_page%>">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;
      	
      	<a href="list_page.jsp?currentPage=<%=next_page%>">下一页</a>&nbsp;&nbsp;&nbsp;&nbsp;
      	
      	<a href="list_page.jsp?currentPage=<%=pageCount%>">尾页</a>&nbsp;&nbsp;&nbsp;&nbsp;
      	
      	跳到第
      	<select name="currentPage" onchange="submitPageForm();">
      		<%
      			for(int i = 1;i<=pageCount;i++){
      		%>
      			<option value="<%=i%>" <%if(i == currentPage){%> selected="selected"<%}%> ><%=i%></option>
      		<%}%>
      	</select>
      	页
      	</td>
    </tr>
  </table>
  </form>
<script language="javascript">
	function submitPageForm(){
		var pageForm = document.getElementById("pageForm");
		pageForm.submit();
	}
</script>
  </body>
</html>
