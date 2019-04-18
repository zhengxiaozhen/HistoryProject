package com.dao;

import com.action.PageAction;
import com.alibaba.druid.pool.DruidPooledConnection;
import com.exception.DaoException;
import com.filter.InitDbPoolConnection;
import com.util.DbPoolConnection;
import com.util.PageBean;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * @Classname PageDao
 * @Description TODO
 * @Author zhoulq
 * @Date 2019/4/17 10:10
 * @Version 1.0
 */
public class PageDao
{

    private static final long serialVersionUID = -71334260745841874L;
    //获取连接池
    DbPoolConnection dbp = InitDbPoolConnection.db;
    DruidPooledConnection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    /**
     * 功能描述
     *
     * @param
     * @return void
     * @Author zhoulq
     * @Description //DAO测试势力
     * @Date 15:25 2019/4/16
     **/
    public PageBean<PageAction> testPage(int pageNum, int pageSize) throws DaoException
    {
        try
        {
            //获取连接
            conn = dbp.getConnection();

            //查询总数
            int totalRecord = 0;

            String sql = "Select count(*) cnt from tc_jcyw.t_org where 1=1";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            if (rs.next())
            {
                totalRecord = rs.getInt("cnt");

            }


            PageBean pb = new PageBean(pageNum, pageSize, totalRecord);
            int startIndex = pb.getStartIndex();
            int endIndex = pb.getEndIndex();


            sql = "SELECT * FROM (Select  ORGNAME orgname,SUNIT_CODE orgid,rownum rn  from tc_jcyw.t_org where 1=1 )" +
                    "WHERE 1=1  and rn>=" + startIndex + "and rn<=" + endIndex;
            System.out.println(""+sql);
            //jdbc
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            List<PageAction> list = new ArrayList<PageAction>();
            while (rs.next())
            {
                PageAction page = new PageAction();
                //System.out.println(rs.getString("s"));
                page.setOrgId(rs.getString("orgid"));
                page.setOrgName(rs.getString("orgname"));
                list.add(page);
            }
            pb.setList(list);
            return pb;

        } catch (Exception e)
        {
            //自定义异常 写入日志
            throw new DaoException(e.getClass(), e.getMessage());

        }


    }


}
