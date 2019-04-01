package com;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.DBPoolConnection;
import com.alibaba.druid.pool.DruidPooledConnection;
public class test extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);

		PreparedStatement ptmt = null;
		DBPoolConnection dbp = DBPoolConnection.getInstance();
		DruidPooledConnection coon = null;
		try {
			coon = dbp.getConnection();
			System.out.println("coon" + coon.toString());
			String sql = "select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss') dqsj from dual";
			ptmt = coon.prepareStatement(sql.toString());
			ResultSet set = ptmt.executeQuery();
			String dqsj = "";
			if (set.next()) {
				dqsj = set.getString("dqsj");
			}
			System.out.println("dqsj=" + dqsj);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (ptmt != null)
				try {
					ptmt.close();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}

			if (coon != null)
				try {
					coon.close();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
		}

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPost(req, resp);
	}

}
