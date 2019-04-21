package com.pdf.jpgpdf;


import com.itextpdf.text.pdf.BaseFont;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import java.io.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class PDFCreatorJPG {
	public static PdfPTable generatePTable(String url) throws Exception{
		PdfPTable pdfPTable = new PdfPTable(1);
		try{
		  Image image = Image.getInstance(url);
		  pdfPTable.addCell(image);
		}
		catch(Exception err){
			throw err;
		}
		return pdfPTable;
	}
	@SuppressWarnings("unchecked")
	public static byte[] getBytes(InputStream is)  throws Exception
    {
        byte[] data = null;        
        Collection chunks = new ArrayList();
        byte[] buffer = new byte[1024*1000];
        int read = -1;
        int size = 0;
        
        while((read=is.read(buffer))!=-1)
        {
            if(read>0)
            {
                byte[] chunk = new byte[read];
                System.arraycopy(buffer,0,chunk,0,read);
                chunks.add(chunk);
                size += chunk.length;
            }
        }
        if(size>0)
        {
            ByteArrayOutputStream bos = null;
            try
            {
                bos = new ByteArrayOutputStream(size);
                for(Iterator itr=chunks.iterator();itr.hasNext();)
                {
                    byte[] chunk = (byte[])itr.next();
                    bos.write(chunk);
                }
                data = bos.toByteArray();
            }
            finally
            {
                if(bos != null)
                {
                    bos.close();
                }
            }
        }
        return data;
    } 
	public static byte[] getBytesFromInStream(InputStream stream) throws IOException {
		    int buf_size = 4096;
		    ByteArrayOutputStream bytestream = new ByteArrayOutputStream();
		    int ch = -1;
		    byte[] bt = new byte[buf_size];

		    while ((ch = stream.read(bt, 0, buf_size)) != -1)
		    {
		      bytestream.write(bt, 0, ch);
		    }
		    byte[] imgdata = bytestream.toByteArray();
		    bytestream.close();
		    return imgdata;
	}
	@SuppressWarnings({ "unused", "deprecation" })
	public static void generatePdfFromStreams(InputStream[] streams,String filetitle,String pdfFileName)throws Exception{
		com.lowagie.text.Document document = new com.lowagie.text.Document(PageSize.A4,3,0,0,0);
		try{
			PdfWriter pdfwriter = PdfWriter.getInstance(document, new FileOutputStream(pdfFileName));
			com.lowagie.text.pdf.BaseFont bfChinese = com.lowagie.text.pdf.BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
			Font FontChinese = new Font(bfChinese, 12, Font.NORMAL);			
			document.open();
			for(int i=0;i<streams.length;i++){
				byte[] bs = getBytesFromInStream(streams[i]);
				Image image =Image.getInstance(bs);
				image.scaleToFit(document.getPageSize().getWidth(),document.getPageSize().getHeight()-50);
				document.add(new Paragraph(filetitle,FontChinese));
                document.add(image);
			}			
		}
		catch(Exception err){
			err.printStackTrace();
		}
		finally{
			document.close();
		}
	}
	@SuppressWarnings("deprecation")
	public static void jpgPdf(String[] jpgFileName,String[] pdfFileName,String xd_url) throws Exception{
		com.lowagie.text.Document document = new com.lowagie.text.Document(PageSize.A4,0,0,0,0);
		try{
			document.open();
			com.lowagie.text.pdf.BaseFont bfChinese = com.lowagie.text.pdf.BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
			Font FontChinese = new Font(bfChinese, 12, Font.NORMAL);
			///直接将整张图片作为一个Element写入pdf文件中
			for (int i = 0; i < jpgFileName.length; i++) {
				Image image = Image.getInstance(jpgFileName[i]);
				image.scaleToFit(document.getPageSize().getWidth(),document.getPageSize().getHeight()-50);
				document.add(new Paragraph(pdfFileName[i],FontChinese));
				document.add(image);
			}
		}catch(Exception err){
			err.printStackTrace();
		}finally{
			document.close();
		}
		try{
			 for (int i = 0; i < jpgFileName.length; i++) {
				 InputStream[] ins = new InputStream[]{new FileInputStream(jpgFileName[i])};
				 int index = jpgFileName[i].lastIndexOf("/p");
				 if(index==-1)
					  index=jpgFileName[i].lastIndexOf("\\p");
				 String s = xd_url + jpgFileName[i].substring(index+1);
				 generatePdfFromStreams(ins,pdfFileName[i],s.replaceAll(".jpg",".pdf"));
			 } 
		}
	    catch(Exception err){
	    	err.printStackTrace();
	    }

	}
	/**
	 * 
	 * @param jpgFileName 图片路径
	 * @param filepdfname 图片标题名称
	 * @param xd_url      获取服务端路径
	 * @return
	 * @throws Exception
	 */
	//把多个图片归为一个PDF
	public static boolean jpgToPdf(String[] jpgFileName,String[] filepdfname,String xd_url) throws Exception{
		com.lowagie.text.Document document = new com.lowagie.text.Document(PageSize.A4,0,0,0,0);
		try{
			FileInputStream fis= new FileInputStream(jpgFileName[0]);
			document.open();
			com.lowagie.text.pdf.BaseFont bfChinese = com.lowagie.text.pdf.BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
			Font FontChinese = new Font(bfChinese, 12, Font.NORMAL);
			//直接将整张图片作为一个Element写入pdf文件中
			for (int i = 0; i < jpgFileName.length; i++) {
				if(jpgFileName[i].split(",").length > 1){
					String[] jpgname = jpgFileName[i].split(",");
					for (String string : jpgname) {
						Image image = Image.getInstance(string);
						image.scaleToFit(document.getPageSize().getWidth(),document.getPageSize().getHeight()-50);
						document.add(new Paragraph(filepdfname[i],FontChinese));
						document.add(image);
					}	
				}else{
					Image image = Image.getInstance(jpgFileName[i]);
					image.scaleToFit(document.getPageSize().getWidth(),document.getPageSize().getHeight()-50);
					document.add(new Paragraph(filepdfname[i],FontChinese));
					document.add(image);
				}
			}
			for (int i = 0; i < jpgFileName.length; i++) {
			  if(jpgFileName[i].split(",").length > 1){
				  String[] sfile = jpgFileName[i].split(",");
				  for (String strfile : sfile) {
					  InputStream[] ins = new InputStream[]{new FileInputStream(strfile)};
					  int index = strfile.lastIndexOf("/p");
					  if(index==-1)
						  index=strfile.lastIndexOf("\\p");
					  String s = xd_url + jpgFileName[i].substring(index+1);
					  generatePdfFromStreams(ins,filepdfname[i],s.replaceAll(".jpg",".pdf"));
				  }
			  }else{

				  InputStream[] ins = new InputStream[]{new FileInputStream(jpgFileName[i])};
				  int index = jpgFileName[i].lastIndexOf("/p");
				  if(index==-1)
				  index=jpgFileName[i].lastIndexOf("\\p");
				  String s = xd_url + jpgFileName[i].substring(index+1);
				  generatePdfFromStreams(ins,filepdfname[i],s.replaceAll(".jpg",".pdf"));
			  } 
		   }
			return true;
		}catch(Exception err){
			err.printStackTrace();
			return false;
		}finally{
			document.close();
		}

	}

	/*public static void main(String[] args)
	{
		File fileRoot2 = new File("");
		System.out.println("绝对路径：" + fileRoot2.getAbsolutePath());
		String mm=fileRoot2.getAbsolutePath()+"/pdf/src/ptimg.jpg";
		String tt="paaa.pdf";
		String[] file={mm};
		String[] pdf={tt};

        PDFCreatorJPG pj=new PDFCreatorJPG();
		PDFMerge merge = new PDFMerge();
		String pdf_file=fileRoot2.getAbsolutePath()+"/pdf/src/ptimg.pdf,"+fileRoot2.getAbsolutePath()+"/pdf/src/ptimg2.pdf";
		String jpgpdfname=fileRoot2.getAbsolutePath()+"/pdf/src/pddddd.pdf";
		try
		{
			//pj.jpgToPdf(file, pdf, fileRoot2.getAbsolutePath()+"/pdf/src/");



			merge.mergePdfFiles(pdf_file.split(","), jpgpdfname);
		} catch (Exception e)
		{
			e.printStackTrace();
		}



	}*/
	
	
}
