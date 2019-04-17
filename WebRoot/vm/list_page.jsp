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
	
	//�����ҳ����Ҫ�õ��ı���
	int rsCount=  0;
	int pageSize = 10;
	int pageCount = 0;
	int currentPage = 1;
	
	//���ܼ�¼��
	sql = "Select count(1) as rsCount From tc_jcyw.t_org";
	conn = JdbcUtil.getConn();
	stmt = conn.createStatement();
	rs = stmt.executeQuery(sql);
	if (rs.next()){
		rsCount = rs.getInt("rsCount");
	}
	rs.close();
	rs = null;
	
	//����ҳ��
	pageCount = ((rsCount - 1)/pageSize) + 1;
	
	//��ȡ��ǰҳ
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
      <td height="25" align="center">���</td>
      <td height="25" align="center">�û���</td>
      <td align="center">��ʵ����</td>
      <td align="center">�Ա�</td>
      <td align="center">����</td>
      <td colspan="2" align="center">����</td>
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
      <td align="center">�޸�</td>
      <td align="center">
      
       ɾ��
      
      </td>
    </tr>
<%}}%>
    <tr>
      <td height="25" colspan="8"><input type="submit" name="Submit" value="ɾ���û�">
      <input type="reset" name="Submit2" value="ȡ��ѡ��"></td>
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
      	���м�¼<%=rsCount%>��&nbsp;&nbsp;&nbsp;&nbsp;
      	ÿҳ<%=pageSize%>��&nbsp;&nbsp;&nbsp;&nbsp; 
      	��<%=currentPage%>/<%=pageCount%>ҳ&nbsp;&nbsp;&nbsp;&nbsp;      </td>
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
      	<a href="list_page.jsp?currentPage=1">��ҳ</a>&nbsp;&nbsp;&nbsp;&nbsp; 
      	
      	<a href="list_page.jsp?currentPage=<%=prev_page%>">��һҳ</a>&nbsp;&nbsp;&nbsp;&nbsp;
      	
      	<a href="list_page.jsp?currentPage=<%=next_page%>">��һҳ</a>&nbsp;&nbsp;&nbsp;&nbsp;
      	
      	<a href="list_page.jsp?currentPage=<%=pageCount%>">βҳ</a>&nbsp;&nbsp;&nbsp;&nbsp;
      	
      	������
      	<select name="currentPage" onchange="submitPageForm();">
      		<%
      			for(int i = 1;i<=pageCount;i++){
      		%>
      			<option value="<%=i%>" <%if(i == currentPage){%> selected="selected"<%}%> ><%=i%></option>
      		<%}%>
      	</select>
      	ҳ
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
