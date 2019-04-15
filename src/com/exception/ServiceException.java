package com.exception;

/**
 * @Classname ServiceException
 * @Description TODO
 * @Author zhoulq
 * @Date 2019/4/15 9:51
 * @Version 1.0
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 业务逻辑层异常
 * @date 2011/04/07
 *
 */
public class ServiceException extends Exception{

    private static final long serialVersionUID = -71434260745841874L;

    private Logger log = null;
    public ServiceException(Class clazz, String message) {
        super(message);
        log = LoggerFactory.getLogger(clazz);
        log.error(message);
    }

    public ServiceException(Class clazz, Throwable throwable) {
        super(throwable);
        log = LoggerFactory.getLogger(clazz);
        log.error(throwable.getMessage());
    }

}
