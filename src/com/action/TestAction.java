package com.action;

/**
 * @Classname TestAction
 * @Description 基本类
 * @Author zhoulq
 * @Date 2019/4/16 22:32
 * @Version 1.0
 */

public class TestAction
{
    private String userName;
    private String password;

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        this.userName = userName;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    @Override
    public String toString()
    {
        return "TestAction{" +
                "userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
