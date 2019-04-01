package com.filter;

import javax.servlet.*;
import java.io.IOException;

/**
 * 字符格式过滤
 */
public class CharFilter implements Filter
{
    String encoding = null;  //字符编码

    public void destroy()
    {
        encoding = null;

    }

    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException
    {
        if (encoding != null)
        {
            request.setCharacterEncoding(encoding);  //设置request的编码格式
            response.setContentType("text/html;charset=" + encoding); //设置response字符编码
        }
        chain.doFilter(request, response);  //传递给下一个过滤器
    }

    public void init(FilterConfig filterConfig) throws ServletException
    {
        encoding = filterConfig.getInitParameter("encoding"); //获取初始化参数

    }

}