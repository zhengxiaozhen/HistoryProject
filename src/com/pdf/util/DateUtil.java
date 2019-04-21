package com.pdf.util;

public class DateUtil {
	public static String convertToString(long ms) {
		   StringBuffer ret = new StringBuffer();
		   int ss = 1000;
		   int mi = ss * 60;
		   int hh = mi * 60;
	
		   long hour = ms  / hh;
		   long minute = (ms  - hour * hh) / mi;
		   long second = (ms  - hour * hh - minute * mi) / ss;
		   long milliSecond = ms - hour * hh - minute * mi - second * ss;

		   String strHour = hour < 10 ? "0" + hour : "" + hour;
		   String strMinute = minute < 10 ? "0" + minute : "" + minute;
		   String strSecond = second < 10 ? "0" + second : "" + second;
		   String strMilliSecond = milliSecond < 10 ? "0" + milliSecond : "" + milliSecond;
		   strMilliSecond = milliSecond < 100 ? "0" + strMilliSecond : "" + strMilliSecond;
		   
		   return ret.append(strHour).append(":").append(strMinute).append(":").append(strSecond).append(" ").append(strMilliSecond).toString();
	}
	
	public static String convertToString(long begin, long end) {
		return convertToString(end - begin);
	}
}
