package com.pdf.pdfmerge;

import com.lowagie.text.Element;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.*;

import java.io.FileOutputStream;

/**
 * PDF生成水印 create by zhoulq
 */
public class PDFMergeMark {

	
	/* public static void main(String[] args) throws Exception { String
	 imageFilePath = "F:/11/sy.png"; // 水印图片路径 
	 String pdfFilePath ="F:/11/dddd.pdf"; // 文件生成路径 
	 String beginFilePath="F:/11/wKgQ71rDG6aARQwmAABFwsgXy7s326.pdf";
	 addWaterMark(beginFilePath,pdfFilePath,imageFilePath, "正版授权",200,50);
	 // 添加水印
	 }*/
	 

	/**
	 * 
	 * 【功能描述：添加图片和文字水印】 【功能详细描述：功能详细描述】
	 * 
	 * @param inputFile
	 *            待加水印文件
	 * @param outputFile
	 *            加水印后存放地址
	 * @param text
	 *            加水印的文本内容
	 * @param textWidth
	 *            文字横坐标
	 * @param textHeight
	 *            文字纵坐标
	 * @throws Exception
	 */
	public static void addWaterMark(String inputFile, String outputFile,
			String imgPath, String text, int textWidth, int textHeight)
			throws Exception {
		// 待加水印的文件
		PdfReader reader = new PdfReader(inputFile);
		// 加完水印的文件
		PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(
				outputFile));
		int total = reader.getNumberOfPages() + 1;
		PdfContentByte content;
		// 设置字体
		String systemName = System.getProperty("os.name");
		BaseFont basefont = null;
		if (systemName.indexOf("Windows") != -1) {
			basefont = BaseFont.createFont("c:/windows/fonts/SIMYOU.TTF",
					BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		} else if (systemName.indexOf("nux") != -1) {
			basefont  = BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
		}

		// 设置透明度，1f代表不透明
		PdfGState gs = new PdfGState();
		gs.setFillOpacity(0.1f);
		// 循环对每页插入水印
		for (int i = 1; i < total; i++) {
			// 水印的起始
			content = stamper.getUnderContent(i);
			// 开始
			content.beginText();
			// 设置透明度
			//content.setGState(gs);
			if (!"".equals(text)) {
				
				// 设置颜色 默认为蓝色
				//content.setColorFill(com.itextpdf.text.BaseColor.GRAY);
				// content.setColorFill(Color.GRAY);
				// 设置字体及字号
				content.setFontAndSize(basefont, 38);
				// 设置起始位置
				// content.setTextMatrix(400, 880);
				content.setTextMatrix(textWidth, textHeight);
				// 开始写入水印
				content.showTextAligned(Element.ALIGN_LEFT, text, textWidth,
						textHeight, 45);
				content.endText();
			}
			if (!"".equals(imgPath)) {
				// t添加图片水印
				Image img2 = Image.getInstance(imgPath);
				img2.setRotationDegrees(45);
				/*
				 * image.setAbsolutePosition(50, 400);//坐标
				 * image.setRotation(-20);//旋转 弧度
				 * image.setRotationDegrees(-45);//旋转 角度
				 * image.scaleAbsolute(200,100);//自定义大小
				 * image.scalePercent(50);//依照比例缩放
				 */
				img2.setAbsolutePosition(textWidth - 100, textHeight + 100);
				content.addImage(img2);
			}
		}
		stamper.close();
	}

}
