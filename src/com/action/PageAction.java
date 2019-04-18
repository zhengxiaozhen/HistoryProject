package com.action;

import java.io.Serializable;

/**
 * @Classname pageDao
 * @Description TODO
 * @Author zhoulq
 * @Date 2019/4/17 10:34
 * @Version 1.0
 */
public class PageAction implements Serializable
{
    private static final long serialVersionUID = -6957361951748382519L;

    private String orgId;
    private String orgName;

    public String getOrgId()
    {
        return orgId;
    }

    public void setOrgId(String orgId)
    {
        this.orgId = orgId;
    }

    public String getOrgName()
    {
        return orgName;
    }

    public void setOrgName(String orgName)
    {
        this.orgName = orgName;
    }
}
