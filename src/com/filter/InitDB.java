package com.filter;

import com.util.DBPoolConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Classname ${NAME}
 * @Description
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

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}
