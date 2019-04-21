package com.controller;

import com.pdf.jpgpdf.PDFCreatorJPG;
import com.pdf.pdfmerge.PDFMerge;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

/**
 * @Classname ${NAME}
 * @Description TODO
 * @Author zhoulq
 * @Date 2019/4/21 15:06
 * @Version 1.0
 */
@WebServlet(name = "uploadContorller")
public class uploadContorller extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        doPost(request,response);
    }

    private String url="http://127.0.0.1:8090";

   /* public String upload(String myUploadFile, HttpServletRequest request)
    {

        //多部件请求对象
        MultipartHttpServletRequest mh = (MultipartHttpServletRequest) request;
        //获取文件list集合
        List<MultipartFile> files = mh.getFiles(myUploadFile);
        //创建jersey服务器，进行跨服务器上传
        Client client = Client.create();
        //json格式的图片路径
        List<Object> listJsonPath = new ArrayList<Object>();
        for (MultipartFile file : files)
        {
            String newFileName = "";
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            newFileName = sdf.format(new Date());
            Random r = new Random();
            //{'':''}
            String jsonPath = "";
            for (int i = 0; i < 3; i++)
            {
                newFileName = newFileName + r.nextInt(10);
            }
            //原始的文件名
            String originalFilename = file.getOriginalFilename();
            //截取文件扩展名
            String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
            //绝对路径（另一台服务器文件路径）
            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd");
            String uploaddate = sdf2.format(new Date());
            *//*Properties prop = new Properties();
            try
            {
                String filePath = request.getServletContext().getRealPath("/upload.properties");
                // 通过输入缓冲流进行读取配置文件
                InputStream InputStream = new BufferedInputStream(new FileInputStream(new File(filePath)));
                // 加载输入流
                prop.load(InputStream);
                //printAllProperty(prop);
                String ss = prop.getProperty("url");
                System.out.println("tt=" + ss);
            } catch (Exception e)
            {
                e.printStackTrace();
            }*//*
            //String fullPath = url + File.separator + "upload" + File.separator + uploaddate + File.separator + newFileName + suffix;
            String fullPath = url +  "/upload/"  + uploaddate + "/" + newFileName + suffix;
            //相对路径（数据库中存放的文件名）
            String relativePath = newFileName + suffix;
            //各自的流
            InputStream inputStream = null;
            try
            {
                inputStream = file.getInputStream();
            } catch (IOException e1)
            {
                e1.printStackTrace();
            }
            //将文件传入文件服务器
            WebResource resource = client.resource(fullPath);
            resource.put(String.class, inputStream);
            jsonPath = "{\"fullPath\":\"" + fullPath + "\",\"relativePath\":\"" + relativePath + "\"}";
            JSONObject jsonObject = JSONObject.parseObject(jsonPath);
            listJsonPath.add(jsonObject);
        }
        JSONArray jsonArray = JSONArray.parseArray(JSON.toJSONString(listJsonPath));
        String ss = jsonArray.toString();
        return ss;
    }*/


     public static void main(String[] args)
    {
        File fileRoot2 = new File("");
        System.out.println("绝对路径：" + fileRoot2.getAbsolutePath());
        String mm=fileRoot2.getAbsolutePath()+"/src/ptimg.jpg";
        String tt="paaa.pdf";
        String[] file={mm};
        String[] pdf={tt};

        PDFCreatorJPG pj=new PDFCreatorJPG();
        PDFMerge merge = new PDFMerge();
        String pdf_file=fileRoot2.getAbsolutePath()+"/src/ptimg.pdf,"+fileRoot2.getAbsolutePath()+"/src/ptimg2.pdf";
        String jpgpdfname=fileRoot2.getAbsolutePath()+"/src/pddddd.pdf";
        try
        {
            PDFCreatorJPG.jpgToPdf(file, pdf, fileRoot2.getAbsolutePath()+"/src/");

            merge.mergePdfFiles(pdf_file.split(","), jpgpdfname);
        } catch (Exception e)
        {
            e.printStackTrace();
        }



    }

}
