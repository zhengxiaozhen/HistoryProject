package com.pdf.delfile;

import java.io.File;
import java.io.IOException;

public class DeleteFile {
	public static void delete(String[] url)throws IOException{
		 File file =null;
		for (int j = 0; j < url.length; j++) {
			 file = new File(url[j]);  
			 if(file.isDirectory()){
		            File [] files = file.listFiles();
		            if(files.length == 0){
		                if(file.getAbsolutePath().indexOf(".jpg") != -1){
		                    file.delete();
		                }
		            }else{
		                for(int i=0;i<files.length;i++){
		                    if(files[i].isDirectory()){
		                        if(files[i].listFiles().length > 0){
		                            delete(files[i].list());
		                        }else{
		                            if(files[i].getAbsolutePath().indexOf(".jpg") != -1){
		                                files[i].delete();
		                            }
		                        }
		                    }else{
		                        if(files[i].getAbsolutePath().indexOf(".jpg") != -1){
		                            files[i].delete();
		                        }
		                    }
		                }
		            }
		            if(file.getAbsolutePath().indexOf(".jpg") != -1){
		                System.out.println(file.getAbsoluteFile());
		                file.delete();
		            }
		        }else{
		            if(file.getAbsolutePath().indexOf(".jpg") != -1){
		                System.out.println(file.getAbsoluteFile());
		                file.delete();
		            }
		        }
		}
		 
   }
}
