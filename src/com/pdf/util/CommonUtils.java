package com.pdf.util;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.lang.time.DateFormatUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;

public class CommonUtils {
	
	public static String encodePdfFile(String fullPath) throws IOException {
		StringBuffer pdfBase64StrBuff = new StringBuffer();
		if(StringUtils.isBlank(fullPath)){
			return "";
		}
		try {
			sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder();
			File f = new File(fullPath);
			if (!f.exists()) {
				return "";
			}

			FileInputStream fis = new FileInputStream(f);
			int length = 2048;
			byte[] arrByte = new byte[length];

			int rlen = 0;
			while ((rlen = fis.read(arrByte, 0, length)) >= 0) {
				if (rlen == length) {
					pdfBase64StrBuff.append(encoder.encode(arrByte));
					continue;
				}
				if (rlen < length) {
					byte[] dest = new byte[rlen];
					System.arraycopy(arrByte, 0, dest, 0, rlen);
					pdfBase64StrBuff.append(encoder.encode(dest));
				}
			}
			fis.close();
			
		} catch (FileNotFoundException e) {
	
			throw e;
		} catch (IOException e) {
			throw e;
		}
		return pdfBase64StrBuff.toString();
	}
	
	public static boolean validateHttpUrl(String url){
		if(StringUtils.isBlank(url)){
			return false;
		}
		return StringUtils.startsWithIgnoreCase(url, "http://") != false;
	}
	
	public static String generateFilenameWithoutSuffix(){
		//return UUID.randomUUID().toString() + ".pdf";
		String date = DateFormatUtils.format(new Date(System.currentTimeMillis()), "yyyyMMddHHmmssSSS");
		int random = RandomUtils.nextInt();
		return date + "-" + random;
	}
	
}
