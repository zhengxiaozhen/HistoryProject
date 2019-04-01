/**
 * Created by user on 2017/1/24.
 */
var DictList = [];

var Common = {
    //获取父窗口地址参数
    getJsUrl:function(){
    var pos,str,para,parastr;
    var array =[]
    str = document.referrer;
    if(str.indexOf('?')>=0){
    parastr = str.split("?")[1];
        if(parastr.indexOf('&')>=0){
    var arr = parastr.split("&");
    for (var i=0;i<arr.length;i++){
        array[arr[i].split("=")[0]]=arr[i].split("=")[1];
    }
        }
    }
    return array;
    },
    /**
     * 根据dict key 获取dict集合
     * @param allDictList
     * @param key
     * @returns {Array}
     */
    getDictListByKey:function(allDictList,key) {
        var dictList = [];
        allDictList.forEach(function(data){
            if(data.key == key) {
                dictList.push(data);
            }
        })
        return dictList;
    },

    getSpeciesRangeDictListByPId:function (allDictList,key) {
        var dictList = [];
        allDictList.forEach(function(data){
            if(key!==""&&data.pId == key) {
                dictList.push(data);
            }
        })
        return dictList;
    },

    getSpeciesRangeDictListByPIdAndCsName:function (allDictList,key,name) {
        var dictList = [];
        allDictList.forEach(function(data){
            //避免0和""都取到
            if(key!==""&&data.pId == key) {
                if(name!==""&&data.csName.indexOf(name)>=0){
                    dictList.push(data);
                }
            }
        })
        return dictList;
    },
    /**
     * 根据dict key code获取dict name
     * @param allDictList
     * @param key
     * @param code
     * @returns {string}
     */
    getDictNameByKeyAndCode:function(allDictList,key,code) {
        var name = "";
        allDictList.forEach(function(data){
            if(data.key == key && data.code == code) {
                name = data.name;
            }
        })
        return name;
    },

    /**
     * 将obj中所有的时间对象值转换成时间戳
    */
    switchDateToTimestamp : function (obj) {
        for(var i in obj){
            if(obj.hasOwnProperty(i) && obj[i] instanceof Date){
                obj[i] = obj[i].getTime();
            }
            else if(obj.hasOwnProperty(i) && obj[i] instanceof Object){
                this.switchDateToTimestamp(obj[i]);
            }
        }
    },

    /**
    *  获取企业名称
    */
    getEnterpriseNameByKeyAndCode: function (key,code) {
        var name = "";
        EnterpriseList.forEach(function(item){
            if(item.key == key && item.enterpriseId == code) {
                name = item.name;
                return;
            }
        });
        return name;
    },

    /**
     * 获取区域名称
     */
    getAreaNameById : function (id) {
        var name = "";
        AreaList.forEach(function(item){
            if(item.code == id) {
                name = item.fullName;
                return;
            }
        });
        return name;
    },
    permissions:function(mgtResourceId,callback) {
        var url =Config.getRemoteUrl()+'business/getPermissions?mgtResourceId=' + mgtResourceId+ '&access-token=' + CurrentUser.accessToken;
        $.ajax({
            type:"GET",
            url:url,
            async: false,
            success: function (result) {
                if (result.code == 0) {
                    callback(result.data);
                }
            }
        });
    },
    getMgtResourceId:function(){
        return GetQueryString("mgtResourceId");
    },
    setZtreeValue:function(treeId,codeval){
        var areaTreeId=treeId;
        if(treeId==null){
            areaTreeId=$(".ztree").attr('id');
        }
        var treeObj = $.fn.zTree.getZTreeObj(areaTreeId);//根据 treeId 获取 zTree 对象
        if(treeObj!=null){
            var treeNode=treeObj.getNodeByParam("code",codeval, null);//根据节点数据的属性(id)获取条件完全匹配的节点数据 JSON 对象集合
            if(treeNode!=null){
                treeObj.selectNode(treeNode,false);//根据节点数据选中指定节点,false表示单独选中，之前选中的节点会被取消选中状态，为true 表示追加选中
                //$(".ztree-wrp").find("input").val(treeNode.fullName || treeNode.name);
                $("#"+areaTreeId).parent().parent().find("input").val(treeNode.fullName || treeNode.name);
            }
        }
    }
}
/**
 * 增加小时
 * @param h
 * @returns {Date}
 */
Date.prototype.addHours= function(h){
    var copiedDate = new Date();
    copiedDate.setTime(this.getTime() + (h*60*60*1000));
    return copiedDate;
}
/*
* 时间格式转换
**/
Date.prototype.format = function (format) {//时间格式转换
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

/*
* 获取URL参数
**/
var GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

var TableConfig={
    showToggle:false,
    showExport: true,
    exportTypes: ['excel'],
    showColumns: true,
    showHeader: 1,
    pageSize: 10,
    pageSize50: 50,
    pageList: [10,50,100,200,2000],
    exportDataType: "all",
    queryParamsType : "limit",
    sidePagination: "server",
    columnTooltip:function(val, row, i) {
        if(val==null||val=='null'||val=='undefined'){
            return '-';
        }else{
            var _title=val;
            var _val=val;
            if(val.length>=30) {
                _val=val.substr(0,30)+"...";
                var columnval=[];
                columnval.push('<p class="table-column-tooltip-options" style="margin:0 0 0px" data-toggle="tooltip"');
                columnval.push(' title="');
                columnval.push(_title);
                columnval.push('">');
                columnval.push(_val);
                columnval.push('</p>');
                return columnval.join("");
            }else{
                return val;
            }
        }
    },
    onloadSuccess:function(el,callback){
        el.on('load-success.bs.table',function(data){
            $(".table-column-tooltip-options").tooltip({html : true });
            if (callback && typeof(callback) == "function") {
                callback(el,data);
            }
        });
    }
}

