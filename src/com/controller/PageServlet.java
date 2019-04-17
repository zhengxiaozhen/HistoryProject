package com.controller;

import com.util.JdbcUtil;
import com.util.PageUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
@WebServlet(name = "PgaeServlet", value = "/PgaeServlet")
public class PageServlet extends HttpServlet {
    @Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}
    @Override
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("GBK");
		response.setCharacterEncoding("GBK");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String task = request.getParameter("task");
		if (task.equals("list")) {
			// 实例化分页的工具类
			PageUtil pageUtil = new PageUtil(request);
			pageUtil.setPageSize(8);
			// 取记录数
			String sql = "Select count(1) as rsCount From tc_jcyw.t_user";
			Map<String, Object> map = JdbcUtil.getObjectMap(sql);
			// 获取总记录数
			int rsCount = (Integer) map.get("rscount");
			pageUtil.setRsCount(rsCount);
			// 获取每页显示多少条
			int pageSize = pageUtil.getPageSize();
			// 获取总页数
			int pageCount = pageUtil.getPageCount();
			// 获取当前页
			int currentPage = pageUtil.getCurrentPage();
			// 生成分页的字符串
			String pageTool = pageUtil.createPageTool(PageUtil.BbsText);
			// 取数据
			int start = (currentPage - 1) * pageSize + 1;
			int end = currentPage * pageSize;
			StringBuffer buffer = new StringBuffer();
			buffer.append("select * from(");
			buffer.append(" select rownum rn, t.* from(");
			buffer.append(" select * from tc_jcyw.t_user order by userid asc)t");
			buffer.append(" where rownum<=" + end + ") t");
			buffer.append(" where t.rn > = " + start + "");

			List<Map<String, Object>> userList = JdbcUtil.getResultList(buffer
					.toString());
			request.setAttribute("userList", userList);
			request.setAttribute("pageTool", pageTool);

			request.getRequestDispatcher("/user_list.jsp").forward(request,
					response);
		}
		out.flush();
		out.close();
	}

}

