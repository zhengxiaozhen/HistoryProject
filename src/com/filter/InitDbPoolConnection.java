package com.filter;

import com.util.DbPoolConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * @Classname ${NAME}
 * @Description 初始化数据库连接池
 * @Date 2019/4/1 11:36
 * @author  by zhoulq
 */
public class InitDbPoolConnection extends HttpServlet
{
    public static DbPoolConnection db = null;

    @Override
    public void init() throws ServletException
    {
        super.init();
        db = DbPoolConnection.getInstance();
        if (db != null)
        {
            System.err.println("===========构造连接池成功========");
        }
    }

}
