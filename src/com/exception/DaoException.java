package com.exception;

/**
 * @Classname daoException
 * @Description 自定义异常
 * @Author zhoulq
 * @Date 2019/4/15 9:37
 * @Version 1.0
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 自定义异常类(继承运行时异常)
 *
 * @author AlanLee
 * @version 2016/11/26
 */

public class DaoException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = -8801718407102159973L;

    private Logger log = null;

    @SuppressWarnings("unchecked")
    public DaoException(Class clazz, String message) {
        super(message);
        log = LoggerFactory.getLogger(clazz);
        log.error(message);
    }

    @SuppressWarnings("unchecked")
    public DaoException(Class clazz, Throwable throwable) {
        super(throwable);
        log = LoggerFactory.getLogger(clazz);
        log.error(throwable.getMessage());
        System.out.println(throwable.getMessage());
    }
}

