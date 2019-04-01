/**
 * Created by user on 2015/7/17.
 */
app.factory('httpService', function(errorService) {
    var factory = {};
    factory.loadingBox;
    factory.request = function(url,para,callback,config){
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
            factory.loadingBox = layer.load(0, {shade: false});
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

        requestUrl = Config.getRemoteUrl() + url;
        //requestUrl = Config.getRemoteUrl() + url;
        if(url.indexOf("?")>=0){
            requestUrl = Config.getRemoteUrl() + url + "&access-token="+ CurrentUser.accessToken;
        }
        else {
            requestUrl = Config.getRemoteUrl() + url + "?access-token="+ CurrentUser.accessToken;
        }
        //todo 暂时去掉验证
        var AjaxRequest = $.ajax({
            type: type,
            timeout : 30000, //超时时间设置，单位毫秒
            url: requestUrl,
            contentType: contentType,
            dataType:"json",
            data: data,
            success:function(data){
                if(loading) {
                    layer.close(factory.loadingBox);
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
                if(loading) {
                    layer.close(factory.loadingBox);
                }
                if(data && (data.statusText == 'timeout')){
                    return;
                }
                if(data && (data.status == 0) && (data.statusText == 'error')) {
                    layer.confirm('连接服务器出错,请检查网络是否正常', {
                        btn: ['重试','取消'] //按钮
                    }, function(){
                        layer.closeAll();
                        factory.request(url,para,callback,config);
                    }, function(){
                        AjaxRequest.abort();
                    });
                }
                if(data && (data.status == 500)){
                    layer.alert('访问服务器出错，服务器内部错误！')
                }
                if(data && (data.status == 404)){
                    layer.alert('找不到调用接口！')
                }
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                if(status=='timeout'){//超时,status还有success,error等值的情况
                    layer.confirm('访问服务器超时', {
                        btn: ['继续等待','取消'] //按钮
                    }, function(){
                        layer.closeAll();
                        factory.request(url,para,callback,config);
                    }, function(){
                        AjaxRequest.abort();
                    });
                }
            }
        });
    }

    factory.POST = function(url,para,callback,noNeedLoading){
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
        factory.request(url,para,callback,config)
    }
    factory.POST2 = function(url,para,callback,noNeedLoading){
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
        factory.request(url,para,callback,config)
    }

    factory.GET = function(url,callback,noNeedLoading){
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
        factory.request(url,null,callback,config)
    }
    factory.GET2 = function(url,callback,noNeedLoading){
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
        factory.request(url,null,callback,config)
    }

    factory.PUT = function(url,para,callback,noNeedLoading){
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
        factory.request(url,para,callback,config)
    }
    factory.PUT2 = function(url,para,callback,noNeedLoading){
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
        factory.request(url,para,callback,config)
    }

    factory.DELETE = function(url,para,callback,noNeedLoading){
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
        factory.request(url,para,callback,config)
    }
    factory.DELETE2 = function(url,para,callback,noNeedLoading){
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
        factory.request(url,para,callback,config)
    }

    return factory;
});