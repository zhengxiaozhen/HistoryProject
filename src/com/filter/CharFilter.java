package com.filter;

import javax.servlet.*;
import java.io.IOException;

/**
 * 字符格式过滤
 *
 * @author zlq
 */
public class CharFilter implements Filter
{
    //字符编码
    String encoding = null;

    @Override
    public void destroy()
    {
        encoding = null;

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException
    {
        if (encoding != null)
        {
            //设置request的编码格式
            request.setCharacterEncoding(encoding);
            //设置response字符编码
            response.setContentType("text/html;charset=" + encoding);
        }
        //传递给下一个过滤器
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException
    {
        //获取初始化参数
        encoding = filterConfig.getInitParameter("encoding");

    }

}