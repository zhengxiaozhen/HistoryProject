package com.pdf.backend;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.pdf.util.CommonUtils;
import com.pdf.util.Const;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author wqq notice: in the end, you should invoke method merge() to merge all
 *         pdfs. for example: merge.append(is1,"aaa").append(is2,"bbb").merge();
 */
public class PdfMerge {

	private Log log = LogFactory.getLog(PdfMerge.class);

	private Document body = null;
	private Document list = null;
	private PdfCopy writer = null;

	private int pageOffset = 0;

	private String outputListFile;
	private String outputBodyFile;

	public PdfMerge() {
		initOutputFile();
	}

	private void initOutputFile() {
		String tmpdir = System.getProperty("java.io.tmpdir");

		if (tmpdir != null && tmpdir.length() > 1) {
			if (tmpdir.endsWith(Const.FILE_SEPERATOR) == false) {
				tmpdir = tmpdir + Const.FILE_SEPERATOR;
			}
		} else {
			tmpdir = "";
		}

		outputListFile = tmpdir + CommonUtils.generateFilenameWithoutSuffix()
				+ "-body.pdf";
		outputBodyFile = tmpdir + CommonUtils.generateFilenameWithoutSuffix()
				+ "-list.pdf";
	}

	private void initDocument(PdfReader reader, String title)
			throws IOException, DocumentException {

		reader.consolidateNamedDestinations();
		body = new Document(reader.getPageSizeWithRotation(1));
		writer = new PdfCopy(body, new FileOutputStream(outputBodyFile));
		body.open();

		list = new Document(body.getPageSize(), body.leftMargin(), body
				.rightMargin(), body.topMargin(), body.bottomMargin());
		PdfWriter.getInstance(list, new FileOutputStream(outputListFile));
		list.open();
	}
	@SuppressWarnings({ "unused", "deprecation" })
	public PdfMerge appends(InputStream is,String filejpg)
			throws DocumentException, IOException {
		Document document = new Document(
				PageSize.A4, 0, 0, 0, 0);
		BaseFont bfChinese = BaseFont.createFont("STSong-Light",
				"UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
		
		Font FontChinese = new Font(bfChinese, 14, Font.NORMAL);
		document.open();
		Image image = Image.getInstance(filejpg);
		PdfReader reader = null;
		try {

			reader = new PdfReader(is);
			int n = reader.getNumberOfPages();
			if (body == null || list == null || writer == null) {
				initDocument(reader, "");
			}
		
			image.scaleToFit(document.getPageSize().width(), document.getPageSize().height());
			
			if (pageOffset == 1) {
				--n;
				list.add(image);
				
			}
			++pageOffset;
			PdfImportedPage page;
			for (int i = 0; i < n;) {
				++i;
				page = writer.getImportedPage(reader, i);
				writer.addPage(page);
			}
				
			PRAcroForm form = reader.getAcroForm();
			if (form != null)
				writer.copyAcroForm(reader);
			document.close();
		} catch (BadPdfFormatException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} catch (DocumentException e) {
			throw e;
		} finally {
			if (reader != null)
				reader.close();
		}
		return this;
	}

	public PdfMerge appends(InputStream is) throws DocumentException,
			IOException {

		PdfReader reader = null;
		try {

			reader = new PdfReader(is);
			int n = reader.getNumberOfPages();
			if (body == null || list == null || writer == null) {
				initDocument(reader, "");
			}
			
			PdfImportedPage page;
			for (int i = 1; i < n;) {
				++i;
				page = writer.getImportedPage(reader, i);
				writer.addPage(page);
			}

			PRAcroForm form = reader.getAcroForm();
			if (form != null)
				writer.copyAcroForm(reader);

		} catch (BadPdfFormatException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} catch (DocumentException e) {
			throw e;
		} finally {
			if (reader != null)
				reader.close();
		}
		return this;
	}

	public PdfMerge append(InputStream is, String title)
			throws DocumentException, IOException {
		BaseFont bfChinese = BaseFont.createFont("STSong-Light",
				"UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
		Font FontChinese = new Font(bfChinese, 14, Font.NORMAL);
		PdfReader reader = null;
		try {
			reader = new PdfReader(is);
			int n = reader.getNumberOfPages();
			if (body == null || list == null || writer == null) {
				initDocument(reader, title);
			}
			// build bookmark
			PdfContentByte cb = writer.getDirectContent();
			PdfOutline root = cb.getRootOutline();
			PdfOutline outline = new PdfOutline(root, PdfAction.gotoLocalPage(
					pageOffset + 1, new PdfDestination(PdfDestination.XYZ, -1,
							-1, 0), writer), title);
			writer.add(outline);
			// build list
			float[] widths = { 0.90f };
			PdfPTable table = new PdfPTable(widths);
			PdfPCell cell = new PdfPCell(new Paragraph(title, FontChinese));
			cell.setBorder(0);
			table.addCell(cell);
			
			table.setWidthPercentage(100);
			list.add(table);
			PdfImportedPage page;
			for (int i = 0; i < n;) {
				++i;
				page = writer.getImportedPage(reader, i);
				writer.addPage(page);
			}
			PRAcroForm form = reader.getAcroForm();
			if (form != null)
				writer.copyAcroForm(reader);
		} catch (BadPdfFormatException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} catch (DocumentException e) {
			throw e;
		} finally {
			if (reader != null)
				reader.close();
		}
		return this;
	}
	//一个材料多个PDF
	public PdfMerge appendjpg(InputStream is)throws DocumentException, IOException {
		Document document = new Document(PageSize.A4, 0, 0, 0, 0);
		BaseFont bfChinese = BaseFont.createFont("STSong-Light","UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
		Font FontChinese = new Font(bfChinese, 14, Font.NORMAL);
		PdfReader reader = null;
		
		document.open();
		try {
			reader = new PdfReader(is);
			int n = reader.getNumberOfPages();
			if (body == null || list == null || writer == null) {
				initDocument(reader, "");
			}
			float[] widths = { 0.10f };
			PdfPTable table = new PdfPTable(widths);
			PdfPCell cell = new PdfPCell(new Paragraph("", FontChinese));
			cell.setBorder(0);
			table.addCell(cell);
			
			table.setWidthPercentage(100);
			list.add(table);
			PdfImportedPage page;
			
			for (int i = 0; i < n;) {
				++i;
				page = writer.getImportedPage(reader, i);
				writer.addPage(page);
			}
			
			PRAcroForm form = reader.getAcroForm();
			if (form != null)
				writer.copyAcroForm(reader);
//			Image image = Image.getInstance(filejpg);
//			image.scaleToFit(document.getPageSize().width(), document.getPageSize().height());
//			list.add(image);
			document.close();
			
		} catch (BadPdfFormatException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} catch (DocumentException e) {
			throw e;
		} finally {
			if (reader != null)
				reader.close();
		}
		return this;
		}
	
	public PdfMerge append(InputStream is)throws DocumentException, IOException {
		BaseFont bfChinese = BaseFont.createFont("STSong-Light",
				"UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
		Font FontChinese = new Font(bfChinese, 14, Font.NORMAL);
		PdfReader reader = null;
		try {
			reader = new PdfReader(is);
			int n = reader.getNumberOfPages();
			if (body == null || list == null || writer == null) {
				initDocument(reader, "");
			}
			// build bookmark
			PdfContentByte cb = writer.getDirectContent();
			PdfOutline root = cb.getRootOutline();
			PdfOutline outline = new PdfOutline(root, PdfAction.gotoLocalPage(
					pageOffset + 1, new PdfDestination(PdfDestination.XYZ, -1,
							-1, 0), writer), "");
			writer.add(outline);
			// build list
			float[] widths = { 0.10f };
			PdfPTable table = new PdfPTable(widths);
			PdfPCell cell = new PdfPCell(new Paragraph("", FontChinese));
			cell.setBorder(0);
			table.addCell(cell);
			
			table.setWidthPercentage(100);
			list.add(table);
			PdfImportedPage page;
			for (int i = 0; i < n;) {
				++i;
				page = writer.getImportedPage(reader, i);
				writer.addPage(page);
			}
			PRAcroForm form = reader.getAcroForm();
			if (form != null)
				writer.copyAcroForm(reader);
		} catch (BadPdfFormatException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} catch (DocumentException e) {
			throw e;
		} finally {
			if (reader != null)
				reader.close();
		}
		return this;
	}

	@SuppressWarnings("unchecked")
	private void mergePdfFiles(String[] files, OutputStream os)
			throws DocumentException, IOException {
		int ipageOffset = 0;
		List<HashMap<String, Object>> master = new ArrayList<HashMap<String, Object>>();
		int f = 0;
		Document document = null;
		PdfCopy copy = null;
		try {
			while (f < files.length) {
				PdfReader reader = null;
				File f1 = new File(files[f]);
				if (f1.exists() == false || f1.isFile() == false) {
					log.warn("file is not exist.");
					continue;
				}
				try {
					reader = new PdfReader(files[f]);
					reader.consolidateNamedDestinations();
					int n = reader.getNumberOfPages();
					List<HashMap<String, Object>> bookmarks = SimpleBookmark.getBookmark(reader);
					if (bookmarks != null) {
						if (ipageOffset != 0) {
							SimpleBookmark.shiftPageNumbers(bookmarks,
									ipageOffset, null);
						}
						master.addAll(bookmarks);
					}
					if (f == 0) {
						document = new Document(reader.getPageSizeWithRotation(1));
						copy = new PdfCopy(document, os);
						document.open();
					}

					ipageOffset += n;
					PdfImportedPage page;
					for (int i = 0; i < n;) {
						++i;
						page = copy.getImportedPage(reader, i);
						copy.addPage(page);
					}
					PRAcroForm form = reader.getAcroForm();
					if (form != null)
						copy.copyAcroForm(reader);
					f++;
				} catch (IOException e) {
					throw e;
				} catch (DocumentException e) {
					throw e;
				} finally {
					if (reader != null)
						reader.close();
				}
			}
			if (!master.isEmpty())
				copy.setOutlines(master); 
		} catch (IOException e) {
			throw e;
		} catch (DocumentException e) {
			throw e;
		} finally {
			if (copy != null)
				copy.close();
			if (document != null)
				document.close();
		}
		document.close();
	}

	public void merge(OutputStream os) throws DocumentException, IOException {
		if (body == null || list == null || writer == null) {
			log.warn("no documents to merge!");
			return;
		}
		if (writer != null) {
			writer.close();
			writer = null;
		}
		if (body != null) {
			body.close();
			body = null;
		}
		if (list != null) {
			list.close();
			list = null;
		}
		mergePdfFiles(new String[] { outputListFile, outputBodyFile }, os);
		clearTmpFile();
	}

	private void clearTmpFile() {
		File listFile = new File(outputListFile);
		File bodyFile = new File(outputBodyFile);
		if (listFile.exists() && listFile.isFile()) {
			listFile.delete();
		}
		if (bodyFile.exists() && bodyFile.isFile()) {
			bodyFile.delete();
		}
	}

	@Override
	protected void finalize() throws Throwable {
		super.finalize();
		if (writer != null)
			writer.close();
		if (body != null)
			body.close();
		if (list != null)
			list.close();
	}
}
