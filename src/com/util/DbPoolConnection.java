package com.util;

/**
 * Created by tch on 2018/10/24.
 *
 * @deprecated Druid数据库连接池连接
 */


import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.pool.DruidPooledConnection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Properties;

/**
 * 要实现单例模式，保证全局只有一个数据库连接池
 *
 * @author 暖暖
 */
public class DbPoolConnection
{
    static Logger log = LoggerFactory.getLogger(DbPoolConnection.class);
    private static DbPoolConnection dbPoolConnection = null;
    private static DruidDataSource druidDataSource = null;

    static
    {
        Properties properties = loadPropertiesFile("druid.properties");
        try
        {
            //DruidDataSrouce工厂模式
            druidDataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);
            System.out.println("加载数据源成功：" + druidDataSource);
        } catch (Exception e)
        {
            e.printStackTrace();
            //log.error("获取配置失败");
        }
    }

    /**
     * 数据库连接池单例
     *
     * @return
     */
    public static synchronized DbPoolConnection getInstance()
    {
        if (null == dbPoolConnection)
        {
            dbPoolConnection = new DbPoolConnection();
        }
        return dbPoolConnection;
    }

    /**
     * 返回druid数据库连接
     * DruidPooledConnection
     *
     * @return
     * @throws SQLException
     */
    public DruidPooledConnection getConnection() throws SQLException
    {
        return druidDataSource.getConnection();
    }

    /**
     * @return Properties对象
     */
    private static Properties loadPropertiesFile(String fullFile)
    {
        String webRootPath = null;
        if (null == fullFile || "".equals(fullFile))
        {
            throw new IllegalArgumentException("Properties file path can not be null" + fullFile);
        }
        webRootPath = DbPoolConnection.class.getClassLoader().getResource("").getPath();
        webRootPath = new File(webRootPath).getParent();
        InputStream inputStream = null;
        Properties p = null;
        try
        {
            inputStream = new FileInputStream(new File(webRootPath + File.separator + fullFile));
            p = new Properties();
            p.load(inputStream);
        } catch (Exception e)
        {
            System.out.println("读取配置文件：" + webRootPath + File.separator + fullFile);
            e.printStackTrace();
        } finally
        {
            try
            {
                if (null != inputStream)
                {
                    inputStream.close();
                }
            } catch (Exception e)
            {
                e.printStackTrace();
            }
        }

        return p;
    }

}
