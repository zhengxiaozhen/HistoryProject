package com.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
/**  功能描述
 * @Author zhoulq
 * @Description //TODO
 * @Date 8:35 2019/4/18
 * @Param  
 * @return
 **/
public class DateUtil {
	public static String getDate(String pattern) {
		Date date = new Date();
		DateFormat dateFormat = new SimpleDateFormat(pattern);
		String str = dateFormat.format(date);
		return str;
	}
}
