package com.dao;

import com.alibaba.druid.pool.DruidPooledConnection;
import com.exception.DaoException;
import com.filter.InitDbPoolConnection;
import com.util.DbPoolConnection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * @Classname testDao
 * @Description TODO
 * @Author zhoulq
 * @Date 2019/4/15 9:03
 * @Version 1.0
 */
public class TestDao
{
    private static final long serialVersionUID = -71334260745841874L;

    DbPoolConnection dbp = InitDbPoolConnection.db;
    DruidPooledConnection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    public void test()  throws DaoException
    {
        try
        {
            conn = dbp.getConnection();
            String sql = "select to_char(sysdate,'yyyy-mm-dd hh24:mi:ss1') s from dual";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next())
            {
                System.out.println(rs.getString("s"));

            }
        }catch (Exception e)
        {

            //throw new DaoException(e.getClass(), e.getCause());
            throw new DaoException(e.getClass(), e.getMessage());

        }


    }

}
