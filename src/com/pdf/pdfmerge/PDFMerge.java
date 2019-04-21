package com.pdf.pdfmerge;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.*;
import com.pdf.backend.PdfMerge;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PDFMerge {
	@SuppressWarnings("unchecked")
	public boolean PDFConsFile(String[] files, String url_pdfname) {
		List list = new ArrayList();
		try {
			for (int i = 0; i < files.length; i++) {
				list.add(new FileInputStream(files[i]));
			}
			File file = new File(url_pdfname);
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs();
			}
			OutputStream os = new FileOutputStream(url_pdfname);
			new PDFMerge().concatPDFs(list, os, true);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean concatPDFs(List<InputStream> list, OutputStream os,
			boolean paginate) {
		Document document = new Document();
		try {
			List pdfList = list;
			List reader = new ArrayList();
			int totalPages = 0;
			Iterator it = pdfList.iterator();
			while (it.hasNext()) {
				InputStream is = (InputStream) it.next();
				PdfReader pdfreader = new PdfReader(is);
				reader.add(pdfreader);
				totalPages += pdfreader.getNumberOfPages();
			}
			PdfWriter writer = PdfWriter.getInstance(document, os);
			document.open();
			BaseFont bf = BaseFont.createFont("Helvetica", "Cp1252", false);
			PdfContentByte cb = writer.getDirectContent();

			int currentPageNum = 0;
			int pageOfCurrentReader = 0;
			Iterator itReader = reader.iterator();
			while (itReader.hasNext()) {
				PdfReader pdfReader = (PdfReader) itReader.next();
				while (pageOfCurrentReader < pdfReader.getNumberOfPages()) {
					document.newPage();
					pageOfCurrentReader++;
					currentPageNum++;
					PdfImportedPage page = writer.getImportedPage(pdfReader,
							pageOfCurrentReader);
					cb.addTemplate(page, 0.0F, 0.0F);
					if (paginate) {
						cb.beginText();
						cb.setFontAndSize(bf, 9.0F);
						cb.showTextAligned(1, currentPageNum + "of"
								+ totalPages, 520.0F, 5.0F, 0.0F);
						cb.endText();
					}
				}
				pageOfCurrentReader = 0;
			}
			os.flush();
			document.close();
			os.close();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			if (document.isOpen())
				document.close();
			try {
				if (os != null)
					os.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}

	//@Test
	public boolean MergePdfone(String[] filespath, String[] filemlname,
			String xd_url_filename) throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length - 1; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.append(is1, filemlname[i]);
			}
			FileOutputStream fos = new FileOutputStream(
					xd_url_filename.replaceAll("\\\\", "/"));
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (Exception e) {
			reVal = false;
		}
		return reVal;
	}

	public boolean MergePdf(String[] filespath, String[] filemlname,
			String xd_url_filename) throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.append(is1, filemlname[i]);
			}
			FileOutputStream fos = new FileOutputStream(
					xd_url_filename.replaceAll("\\\\", "/"));
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (Exception e) {
			reVal = false;
		}
		return reVal;
	}

	public boolean MergejpgPdf(String[] filespath, String xd_url_filename)
			throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.appendjpg(is1);
			}
			FileOutputStream fos = new FileOutputStream(
					xd_url_filename.replaceAll("\\\\", "/"));
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (Exception e) {
			reVal = false;
		}
		return reVal;
	}

	public boolean MergePdfs(String[] filespath, String[] filemlname,
			String xd_url_filename) throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.appends(is1, filemlname[i]);
			}
			FileOutputStream fos = new FileOutputStream(
					xd_url_filename.replaceAll("\\\\", "/"));
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (Exception e) {
			reVal = false;
		}
		return reVal;
	}

	public boolean MergePdf(String[] filespath, String xd_url_filename)
			throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.append(is1);
			}
			FileOutputStream fos = new FileOutputStream(
					xd_url_filename.replaceAll("\\\\", "/"));
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (Exception e) {
			reVal = false;
		}
		return reVal;
	}

	//@Test
	public boolean MergeToPdf(String[] filespath, String filejpg,
			String xd_url_filename) throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.appends(is1, filejpg);
			}
			FileOutputStream fos = new FileOutputStream(xd_url_filename);
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (Exception e) {
			reVal = false;
		}
		return reVal;
	}

	//@Test
	public boolean MergeToPdf(String[] filespath, String xd_url_filename)
			throws Exception {
		boolean reVal = true;
		PdfMerge pm = new PdfMerge();
		InputStream is1 = null;
		try {
			for (int i = 0; i < filespath.length; i++) {
				is1 = new FileInputStream(filespath[i]);
				pm.appends(is1);
			}
			FileOutputStream fos = new FileOutputStream(xd_url_filename);
			pm.merge(fos);
			reVal = true;
			is1.close();
			fos.close();
		} catch (DocumentException e) {
			reVal = false;
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return reVal;
	}

	/**
	 * 
	 * @param files
	 *            鍥剧墖杞琾df鍚庣殑pdf鏂囦欢璺緞
	 * @param xd_url_filename
	 *            鎵�湁鍥剧墖鍚堟垚鍥剧墖鍚庣殑pdf鍚嶇О
	 * @return
	 */
	public boolean mergePdfFiles(String[] files, String xd_url_filename) {
		boolean retValue = false;
		Document document = null;
		try {
			document = new Document(new PdfReader(files[0]).getPageSize(1));
			PdfCopy copy = new PdfCopy(document, new FileOutputStream(
					xd_url_filename));
			document.open();
			for (int i = 0; i < files.length; i++) {
				PdfReader reader = new PdfReader(files[i]);
				int n = reader.getNumberOfPages();
				for (int j = 1; j <= n; j++) {
					document.newPage();
					PdfImportedPage page = copy.getImportedPage(reader, j);
					copy.addPage(page);
				}
			}
			retValue = true;
		} catch (Exception e) {
			retValue = false;
			e.printStackTrace();
		} finally {
			document.close();
		}
		return retValue;
	}

	public boolean mergeItext(String str, String xd_url_filename) {
		boolean retValue = false;
		// 创建文本
		Document document = new Document();

		try {
			BaseFont bfChinese = BaseFont
					.createFont("STSong-Light", "UniGB-UCS2-H",
							BaseFont.NOT_EMBEDDED);
			Font FontChinese = new Font(bfChinese, 12, Font.NORMAL);
			// 写入文本到文件中
			PdfWriter.getInstance(document, new FileOutputStream(
					xd_url_filename));
			// 打开文本
			document.open();
			// 定义段落
			Paragraph paragraph = new Paragraph();
			// 插入十条文本块到段落中
			document.add(new Paragraph(str, FontChinese));
			// paragraph.add(str);
			// 添加段落
			// 关闭文本
			retValue = true;

		} catch (Exception e) {
			retValue = false;
			e.printStackTrace();
		} finally {
			document.close();
		}
		return retValue;
	}

}