package com.filter;

import com.util.DBPoolConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 * @Classname ${NAME}
 * @Description 初始化数据库连接池
 * @Date 2019/4/1 11:36
 * @Created by zhoulq
 */
public class InitDB extends HttpServlet
{

    @Override
    public void init() throws ServletException
    {
        super.init();
        DBPoolConnection db=DBPoolConnection.getInstance();
        if (db!=null)
            System.err.println("===========构造连接池成功========");
    }

}
