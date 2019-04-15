package com.controller;

import com.dao.TestDao;
import com.exception.DaoException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Classname ${NAME}
 * @Description TODO
 * @Author zhoulq
 * @Date 2019/4/15 9:00
 * @Version 1.0
 */
@WebServlet(name = "testController", value = "/testController")
public class TestController extends HttpServlet
{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        //控制层
        TestDao testDao = new TestDao();


        try
        {
            testDao.test();
        } catch (DaoException e)
        {
            //e.printStackTrace();
        }


    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        doPost(request, response);
    }
}
