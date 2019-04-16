package com.util;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class JdbcUtil {
    static DbPoolConnection dataSource = DbPoolConnection.getInstance();


    public static Connection getConn() {
		Connection conn = null;
		try {

			conn = dataSource.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}

	public static boolean executeUpdate(String sql) {
		Connection conn = null;
		Statement stmt = null;
		boolean flag = false;
		try {
			conn = JdbcUtil.getConn();
			stmt = conn.createStatement();
			int i = stmt.executeUpdate(sql);
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.tryClose(null, stmt, conn);
		}
		return flag;
	}

	public static boolean executeUpdatePre(String sql, List<Object> paramList) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		boolean flag = false;
		try {
			conn = JdbcUtil.getConn();
			pstmt = conn.prepareStatement(sql);
			for (int i = 0; i < paramList.size(); i++) {
				pstmt.setObject(i + 1, paramList.get(i));
			}
			pstmt.executeUpdate();
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.tryClose(null, pstmt, conn);
		}
		return flag;
	}

	public static boolean executeBatch(List<String> sqlList) {
		Connection conn = null;
		Statement stmt = null;
		boolean flag = false;
		try {
			conn = JdbcUtil.getConn();
			conn.setAutoCommit(false);
			stmt = conn.createStatement();
			for (String sql : sqlList) {
				stmt.addBatch(sql);
			}
			int[] intArray = stmt.executeBatch();
			conn.commit();
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
			try {
				conn.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
		} finally {
			JdbcUtil.tryClose(null, stmt, conn);
		}
		return flag;
	}

	public static List<Map<String, Object>> getResultList(String sql) {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		ResultSetMetaData metaData = null;
		try {
			conn = JdbcUtil.getConn();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			metaData = rs.getMetaData();

			while (rs.next()) {
				Map<String, Object> map = new HashMap<String, Object>();
				int columnCount = metaData.getColumnCount();
				for (int i = 1; i <= columnCount; i++) {
					String columnName = metaData.getColumnName(i).toLowerCase();
					int columnType = metaData.getColumnType(i);
					Object columnValue = null;
					switch (columnType) {
					case Types.NUMERIC:
						columnValue = rs.getInt(columnName);
						break;
					case Types.DOUBLE:
						columnValue = rs.getDouble(columnName);
						break;
					case Types.VARCHAR:
						columnValue = rs.getString(columnName);
						break;
					case Types.DATE:
						columnValue = rs.getDate(columnName);
						break;
					default:
						columnValue = rs.getObject(columnName);
						break;
					}
					map.put(columnName, columnValue);
				}

				resultList.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.tryClose(rs, stmt, conn);
		}
		return resultList;
	}

	public static Map<String, Object> getObjectMap(String sql) {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		ResultSetMetaData metaData = null;
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			conn = JdbcUtil.getConn();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			metaData = rs.getMetaData();
			if (rs.next()) {
				int columnCount = metaData.getColumnCount();
				for (int i = 1; i <= columnCount; i++) {
					String columnName = metaData.getColumnName(i).toLowerCase();
					int columnType = metaData.getColumnType(i);
					Object columnValue = null;
					switch (columnType) {
					case Types.NUMERIC:
						columnValue = rs.getInt(columnName);
						break;
					case Types.DOUBLE:
						columnValue = rs.getDouble(columnName);
						break;
					case Types.VARCHAR:
						columnValue = rs.getString(columnName);
						break;
					case Types.DATE:
						columnValue = rs.getDate(columnName);
						break;
					default:
						columnValue = rs.getObject(columnName);
						break;
					}
					map.put(columnName, columnValue);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			JdbcUtil.tryClose(rs, stmt, conn);
		}
		return map;
	}

	public static void tryClose(ResultSet rs, Statement stmt, Connection conn) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			rs = null;
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			stmt = null;
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			conn = null;
		}
	}

	public static void main(String[] args) {
		String sql = "Select ORGNAME orgname,SUNIT_CODE orgid from tc_jcyw.t_org where rownum<10";
		List<Map<String, Object>> userList = JdbcUtil.getResultList(sql);
		for (Map<String, Object> map : userList) {

			System.out
					.println(map.get("orgid") + "\t" + map.get("orgname"));
		}
	}
}
