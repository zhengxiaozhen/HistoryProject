package com.controller;

import com.action.PageAction;
import com.alibaba.fastjson.JSON;
import com.dao.PageDao;
import com.exception.DaoException;
import com.util.PageBean;

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
 * @Date 2019/4/17 10:10
 * @Version 1.0
 */
@WebServlet(name = "PageController" ,value = "/PageController")
public class PageController extends HttpServlet
{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        //控制层
        PageDao testDao = new PageDao();


        try
        {
           PageBean<PageAction> pageBean= testDao.testPage(3,20);

            String s = JSON.toJSONString(pageBean);
            System.out.println(s);

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
