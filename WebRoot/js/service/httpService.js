var HttpService = function(){
   var POST = function(url,para,callback,noNeedLoading){
        //alert(url);
        var config = {
            type:"POST",
            contentType:"application/json"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,para,callback,config)
    }
    var POST2 = function(url,para,callback,noNeedLoading){
        var config = {
            type:"POST",
            contentType:"application/x-www-form-urlencoded"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,para,callback,config)
    }

    var GET = function(url,callback,noNeedLoading){
        var config = {
            type:"GET",
            contentType:"application/json"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,null,callback,config)
    }
    var GET2 = function(url,callback,noNeedLoading){
        var config = {
            type:"GET",
            contentType:"application/x-www-form-urlencoded"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,null,callback,config)
    }

    var PUT = function(url,para,callback,noNeedLoading){
        var config = {
            type:"PUT",
            contentType:"application/json"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,para,callback,config)
    }
    var PUT2 = function(url,para,callback,noNeedLoading){
        var config = {
            type:"PUT",
            contentType:"application/x-www-form-urlencoded"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,para,callback,config)
    }

    var DELETE = function(url,para,callback,noNeedLoading){
        var config = {
            type:"DELETE",
            contentType:"application/json"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,para,callback,config)
    }
    var DELETE2 = function(url,para,callback,noNeedLoading){
        var config = {
            type:"DELETE",
            contentType:"application/x-www-form-urlencoded"
        };
        if(!noNeedLoading) {
            config.loading = true;
        }
        else {
            config.loading = false;
        }
        request(url,para,callback,config)
    }



    var loadingBox;
    var request = function(url,para,callback,config){
        var loading = true;
        var type = 'POST';
        var contentType = 'application/json';
        if(config){
            if(config.loading){
                loading = config.loading;
            }
            else if(!config.loading){
                loading = false;
            }
            if(config.type){
                type = config.type;
            }
            if(config.contentType){
                contentType = config.contentType;
            }
        }
        if(loading){
           // loadingBox = layer.load(0, {shade: false});
        }
        var requestUrl = "";
        var paraArray = [];
        var paraString = "";
        if(url.indexOf("?")>0){
            paraString =  url.substring(url.indexOf("?")+1,url.length);
            paraArray = paraString.split('&');
        }
        paraArray = paraArray.sort();
        paraString = "";
        for(var i=0;i<paraArray.length;i++){
            paraString = paraString+paraArray[i];
        }

        var data= "";
        if(config.contentType == "application/x-www-form-urlencoded") {
            if(para){
                data = para;
                paraArray = [];
                for(p in para) {
                    //如果是数组适配一下后台接受的参数形式
                    if(para[p] instanceof Array){
                        for(var i=0;i<para[p].length;i++){
                            paraArray.push(p+"[]="+para[p][i]);
                        }
                    }
                    else {
                        if(!para[p]&&para[p]!=0){
                            paraArray.push(p+"=");
                        }
                        else {
                            paraArray.push(p+"="+para[p]);
                        }
                    }
                }
                if(type=="PUT"){
                    paraString = paraString + paraArray.join("&");
                }
                else if(type=="POST"){
                    paraArray = paraArray.sort();
                    paraString = paraString + paraArray.join("");
                }
                else {
                    paraString = paraString + paraArray.join("&");
                }
            }
        }
        else {
            if(para) {
                data = JSON.stringify(para);
            }
            paraString = paraString + data;
        }
        //var secret = sessionStorage.getItem('secret');
        //var accessToken = sessionStorage.getItem('accessToken');
        //var signature = md5(secret + paraString + accessToken);

        requestUrl = /*Config.getRemoteUrl() + */url;
        //requestUrl = Config.getRemoteUrl() + url;
        /*if(url.indexOf("?")>=0){
            requestUrl = Config.getRemoteUrl() + url + "&access-token="+ CurrentUser.accessToken;
        }
        else {
            requestUrl = Config.getRemoteUrl() + url + "?access-token="+ CurrentUser.accessToken;
        }*/
        //todo 暂时去掉验证
        var AjaxRequest = $.ajax({
            type: type,
            timeout : 30000, //超时时间设置，单位毫秒
            url: requestUrl,
            contentType: contentType,
            dataType:"json",
            data: data,
            success:function(data){
                //console.log(data);
                if(loading) {
                    //layer.close(loadingBox);
                }
                if(data&&data.code>0){
                    errorService.handleHttpError(data.code,data.message,function(){
                        if(typeof callback == "function"){
                            callback(data);
                        }
                    });
                }
                else{
                    if(typeof callback == "function"){
                        callback(data);
                    }
                }
            },
            error:function(data){
                console.log(data);
                if(loading) {
                   // layer.close(loadingBox);
                }
                if(data && (data.statusText == 'timeout')){
                    return;
                }
                if(data && (data.status == 0) && (data.statusText == 'error')) {
                    /*layer.*/
                    confirm('连接服务器出错,请检查网络是否正常', {
                        btn: ['重试','取消'] //按钮
                    }, function(){
                        //layer.closeAll();
                        request(url,para,callback,config);
                    }, function(){
                        AjaxRequest.abort();
                    });
                }
                if(data && (data.status == 500)){
                    /*layer.*/
                    alert('访问服务器出错，服务器内部错误！')
                }
                if(data && (data.status == 404)){
                   /* layer.*/
                    alert('找不到调用接口！')
                }
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    /*layer.*/
                    confirm('访问服务器超时', {
                        btn: ['继续等待','取消'] //按钮
                    }, function(){
                        //layer.closeAll();
                        request(url,para,callback,config);
                    }, function(){
                        AjaxRequest.abort();
                    });
                }
            }
        });
    }


    return {
        POST: POST,
        POST2:POST2,
        GET:GET,
        GET2:GET2,
        PUT:PUT,
        PUT2:PUT2,
        DELETE:DELETE,
        DELETE2:DELETE2
    }
}
var httpService = new HttpService();




