package com.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	public static String getDate(String pattern) {
		Date date = new Date();
		DateFormat dateFormat = new SimpleDateFormat(pattern);
		String str = dateFormat.format(date);
		return str;
	}
}
