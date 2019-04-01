/***************************************日历start******************************************
*
*变量定义  :fj_date_start-fj_date_end 时间范围,fj_g_object 要填写时间的控件
            fj_o_today当前日期  fj_separator时间分界符   fj_inover div层是否获得焦点
*mode      :时间变换的类型0-年 1-月 2-直接选择月 
*created    :2006.03.27 by fujun
*
****************************************日历start******************************************/
var fj_date_start,fj_date_end,fj_g_object
var fj_o_today = new Date();
var fj_separator="-";
var fj_inover=false;
var fj_date_compent_tag="dcDate",fj_clearInterval_1;//是否有时间dcDate,dcDateTime

function change_date(temp,mode)
{
    var t_month,t_year
    if (mode){
        if(mode==1)
          t_month=parseInt(cele_date_month.value,10)+parseInt(temp,10);
        else
          t_month=parseInt(temp)
        if (t_month<cele_date_month.options(0).text) {
            cele_date_month.value=cele_date_month.options(cele_date_month.length-1).text;
            change_date(parseInt(cele_date_year.value,10)-1,0);
        }
        else{
            if (t_month>cele_date_month.options(cele_date_month.length-1).text){
                cele_date_month.value=cele_date_month.options(0).text;
                change_date(parseInt(cele_date_year.value,10)+1,0);
            }
            else{
                 cele_date_month.value=t_month;
                 set_cele_date(cele_date_year.value,cele_date_month.value);
            }
        }
    }
    else{
        t_year=parseInt(temp,10);
        if (t_year<cele_date_year.options(0).text) {
            cele_date_year.value=cele_date_year.options(0).text;
            set_cele_date(cele_date_year.value,1);
        }
        else{
            if (parseInt(t_year,10)>parseInt(cele_date_year.options(cele_date_year.length-1).text,10)){
                cele_date_year.value=cele_date_year.options(cele_date_year.length-1).text;
                set_cele_date(cele_date_year.value,12);
            }
            else{
                cele_date_year.value=t_year;
                set_cele_date(cele_date_year.value,cele_date_month.value);
            }
        }
    }
}

//初始化日历
function init(d_start,d_end)
{
     var temp_str;
     var i=0
     var j=0
		// alert('d');
     fj_date_start=new Date(1980,7,1)
     fj_date_end=new Date(2006,8,1)
     document.writeln("<div name=\"cele_date1\" id=\"cele_date1\" style=\"display:none\" style=\"LEFT: 69px; width:170; POSITION: absolute; TOP: 159px;Z-INDEX:99\" onClick=\"event.cancelBubble=true;\" onBlur=\"hilayer()\" onMouseOut=\"lostlayerfocus()\">-</div>");
     window.cele_date.innerHTML="";
     temp_str="<table border=\"1\" bgcolor=\"#DDDDDD\" bordercolor=\"white\"><tr align='center'><td colspan=7 onmouseover=\"overcolor(this)\" style=\"while-space:nowrap;\">";
     temp_str+="<input type=\"Button\" value=\"<<\" onclick=\"change_date(-1,1)\" onmouseover=\"getlayerfocus()\" style=\"color: #000099; background-color: #cccccc; cursor: hand; border:1px solid #ffffff\">-";

     temp_str+=""
     temp_str+="<select name=\"cele_date_year\" id=\"cele_date_year\" language=\"javascript\" onchange=\"change_date(this.value,0)\" onmouseover=\"getlayerfocus()\" onblur=\"getlayerfocus()\" style=\"font-size: 9pt; border: 1px #666666 outset; background-color: #F4F8FB\">"

     for(i=2008;i<=fj_o_today.getYear()+10;i++)
     {
     	temp_str+="<OPTION value=\""+i.toString()+"\">"+i.toString()+"</OPTION>";
     }
     temp_str+="</select>-";
     temp_str+=""
     temp_str+="<select name=\"cele_date_month\" id=\"cele_date_month\" language=\"javascript\" onchange=\"change_date(this.value,2)\" onmouseover=\"getlayerfocus()\" onblur=\"getlayerfocus()\" style=\"font-size: 9pt; border: 1px #666666 outset; background-color: #F4F8FB\">"

     for (i=1;i<=12;i++)
     {
     	temp_str+="<OPTION value=\""+i.toString()+"\">"+i.toString()+"</OPTION>";
     }
     temp_str+="</select>-";
     temp_str+=""
     temp_str+="<input type=\"Button\" value=\">>\" onclick=\"change_date(1,1)\" onmouseover=\"getlayerfocus()\"  style=\"color: #000099; background-color: #cccccc; cursor: hand; border:1px solid #ffffff\">";

     temp_str+="</td></tr><tr align='center'><td onmouseover=\"overcolor(this)\">"
     temp_str+="<font color=red>日</font></td><td>";
     temp_str+="一</td><td>"; 
     temp_str+="二</td><td>"; 
     temp_str+="三</td><td>"
     temp_str+="四</td><td>";
     temp_str+="五</td><td>"; 
     temp_str+="<font color=red>六</font></td></tr>";
     for (i=1 ;i<=6 ;i++)
     {
        temp_str+="<tr align='center'>";
        for(j=1;j<=7;j++){
            temp_str+="<td name=\"c"+i+"_"+j+"\" id=\"c"+i+"_"+j+"\" style=\"CURSOR: hand\" style=\"COLOR:#000000\" language=\"javascript\" onmouseover=\"overcolor(this)\" onmouseout=\"outcolor(this)\" onclick=\"td_click(this)\">?</td>"
        }
        temp_str+="</tr>"        
     }
     temp_str+="</td></tr>";
     temp_str+="<tr style=\"font-size:9pt\"><td colspan=7 align='center' valign='middle'><span id=\"tch_date_or_time_tag\">";
     temp_str+="</span>&nbsp;<span style=\"CURSOR: hand\" onmouseover=\"overcolor(this)\" onmouseout=\"outcolor(this)\" kind=\"clear\" onclick=\"td_click(this)\">清空</span></td></tr>";
     temp_str+="</table>";
     window.cele_date1.innerHTML=temp_str;
	 //alert(document.all.cele_date1);
	// document.all.cele_date1.style.display="";
}

function set_cele_date(year,month)
{
   var i,j,p,k
   var nd=new Date(year,month-1,1);
   event.cancelBubble=true;
   cele_date_year.value=year;
   cele_date_month.value=month;
   k=nd.getDay()-1;
   var temp;
   for (i=1;i<=6;i++)
      for(j=1;j<=7;j++){
        eval("c"+i+"_"+j+".innerHTML=\"\"");
        eval("c"+i+"_"+j+".bgColor=\"#DDDDDD\"");
        eval("c"+i+"_"+j+".style.cursor=\"hand\"");
      }
   while(month-1==nd.getMonth()){
      j=(nd.getDay() +1);
      p=parseInt((nd.getDate()+k) / 7)+1;
      eval("c"+p+"_"+j+".innerHTML="+"\""+nd.getDate()+"\"");
      if ((nd.getDate()==fj_o_today.getDate())&&(cele_date_month.value==fj_o_today.getMonth()+1)&&(cele_date_year.value==fj_o_today.getYear())){
      	 eval("c"+p+"_"+j+".bgColor=\"#86A4E1\"");
      }
      if (nd>fj_date_end || nd<fj_date_start){
         eval("c"+p+"_"+j+".bgColor=\"#bbbbbb\"");
         eval("c"+p+"_"+j+".innerHTML=\"&nbsp;\"");
         eval("c"+p+"_"+j+".style.cursor=\"text\"");
      }
      nd=new Date(nd.valueOf() + 86400000)
    }
}

//eP:点击的对象; d_start-d_end有效的时间区段; t_object:需要存放值的控件；by fujun
function show_cele_date(eP,d_start,d_end,t_object,lvfj_date_compent_tag){
  if(lvfj_date_compent_tag==undefined){
      fj_date_compent_tag="dcDate";
  }
  else{
      fj_date_compent_tag=lvfj_date_compent_tag;
  }
  if(fj_date_compent_tag=="dcDateTime"){
      tch_date_or_time_tag.innerHTML="<span style=\"cursor:hand\" onmouseover=\"overcolor(this);\" onmouseout=\"outcolor(this);\" id=\"span_fj_o_set_time\" kind=\"setTimeNo\" onclick=\"td_click(this);\">时间：</span><input name=\"fj_o_set_time\" id=\"fj_o_set_time\" type=\"text\" value=\""+getFJTime()+"\" style=\"width:80px;height:18px;border:1px solid #DDDDDD;background:#EEEEEE;text-align:center;font-size:9pt;margin:0px;padding:0px\" kind=\"clearTimeOk\" onmouseover=\"overcolor(this);\" onmouseout=\"outcolor(this);\" onclick=\"td_click(this);\">";
      setfj_o_set_time();
  }
  else{
      tch_date_or_time_tag.innerHTML="今天：<span style=\"CURSOR: hand\" onmouseover=\"overcolor(this);\" onmouseout=\"outcolor(this);\" kind=\"fj_o_today\" onclick=\"td_click(this);\">"+getNow()+"</span>";
  }

  window.cele_date1.style.display="";
  window.cele_date1.style.zIndex=99
  var s,cur_d
  var eT = eP.offsetTop;
  var eH = eP.offsetHeight;
  var dH = window.cele_date1.style.pixelHeight;
  var sT = document.body.scrollTop;
  var sL = document.body.scrollLeft;
  event.cancelBubble=true;
  window.cele_date1.style.posLeft = event.clientX-event.offsetX+sL-5;
  window.cele_date1.style.posTop = event.clientY-event.offsetY+eH+sT-5;
  //window.cele_date.style.posLeft = event.clientX;
  //window.cele_date.style.posTop = event.clientY;

  if ((window.cele_date1.style.posLeft+window.cele_date1.clientWidth)>document.body.clientWidth){ 
     if(document.body.clientWidth-window.cele_date1.clientWidth-20>0)
        window.cele_date1.style.posLeft=document.body.clientWidth-window.cele_date1.clientWidth-20;
     else
        window.cele_date1.style.posLeft=0;
  }
  if ((window.cele_date1.style.posTop+window.cele_date1.clientHeight)>document.body.clientHeight){
     if(document.body.clientHeight-window.cele_date1.clientHeight>0)
        window.cele_date1.style.posTop=document.body.clientHeight-window.cele_date1.clientHeight;
     else
        window.cele_date1.style.posTop=0;
  }
  if (d_start!=""){
    if (d_start=="fj_o_today"){
        fj_date_start=new Date(fj_o_today.getYear(),fj_o_today.getMonth(),fj_o_today.getDate());
    }else{
        s=d_start.split(fj_separator);
        fj_date_start=new Date(s[0],s[1]-1,s[2]);
    }
  }else{
    fj_date_start=new Date(1900,1,1);
  }

  if (d_end!=""){
    s=d_end.split(fj_separator);
    fj_date_end=new Date(s[0],s[1]-1,s[2]);
  }else{
    fj_date_end=new Date(3000,1,1);
  }

  fj_g_object=t_object

  cur_d=new Date()
  set_cele_date(cur_d.getYear(),cur_d.getMonth()+1);
  window.cele_date1.style.display="block";
  window.cele_date1.focus();
}

function set_date_clear(){
  fj_g_object.value="";
}
function td_click(t_object){
  var t_d
  if(t_object.kind=="clear"){
      fj_g_object.value="";
      h_cele_date();
  }
  else if(t_object.kind=="fj_o_today"){
      fj_g_object.value=t_object.innerHTML;
      h_cele_date();
  }
  else if(t_object.kind=="clearTimeOk"){
      window.clearTimeout(fj_clearInterval_1);
      fj_o_set_time.kind="clearTimeNo";
      span_fj_o_set_time.kind="setTimeOK";
  }
  else if(t_object.kind=="setTimeOK"){
      setfj_o_set_time();
      span_fj_o_set_time.kind="setTimeNo";
      fj_o_set_time.kind="clearTimeOk";
  }
  else if(t_object.kind=="setTimeNo"||t_object.kind=="clearTimeNo"){
      //无操作
  }
  else{
     if (parseInt(t_object.innerHTML,10)>=1 && parseInt(t_object.innerHTML,10)<=31 ){
        t_d=new Date(cele_date_year.value,cele_date_month.value-1,t_object.innerHTML)
        if (t_d<=fj_date_end && t_d>=fj_date_start){
            var year = cele_date_year.value;
            var month = cele_date_month.value;
            var day = t_object.innerHTML;
            if (parseInt(month)<10)
                month = "0" + month;
            if (parseInt(day)<10)
                day = "0" + day;
            
            if(fj_date_compent_tag=="dcDateTime"){
                if(fj_o_set_time.value=="")
                   fj_o_set_time.value=getFJTime();
                fj_g_object.value=year+fj_separator+month+fj_separator+day+" "+fj_tchTrim(fj_o_set_time.value);
            }
            else{
                fj_g_object.value=year+fj_separator+month+fj_separator+day;
            }
            h_cele_date();
       }
     }
  }
}

function h_cele_date(){
    window.cele_date1.style.display="none";
    try{
       window.clearTimeout(fj_clearInterval_1);
       fj_g_object.focus();
    }
    catch(E){}
}
function overcolor(obj){
    if (obj.style.cursor=="hand")
       obj.style.color = "#FFFFFF";
    fj_inover=true;
    try{
        window.cele_date.focus();
    }
    catch(E){}
}
function outcolor(obj){
	obj.style.color = "#000000";
	fj_inover=false;
}
function getNow(){
    var Stamp=new Date();
    var year = Stamp.getYear();
    var month = Stamp.getMonth()+1;
    var day = Stamp.getDate();
    if(month<10){
	month="0"+month;
    }
    if(day<10){
	day="0"+day;
    }
    return year+fj_separator+month+fj_separator+day;
}
function getFJTime(){
    //fj_o_set_time
    var cc_date=new Date();
    var fj_ot_hour=cc_date.getHours();
    var fj_ot_minute=cc_date.getMinutes();
    var fj_ot_second=cc_date.getSeconds();
    if(fj_ot_hour<10)
          fj_ot_hour="0"+fj_ot_hour;
    if(fj_ot_minute<10)
          fj_ot_minute="0"+fj_ot_minute;
    if(fj_ot_second<10)
          fj_ot_second="0"+fj_ot_second;
          
    return fj_ot_hour+" : "+fj_ot_minute+" : "+fj_ot_second;
}
function setfj_o_set_time(){
        fj_o_set_time.value=getFJTime();
        fj_clearInterval_1=window.setTimeout("setfj_o_set_time()",1000);
}
function fj_tchTrim(lv_str){
	if(lv_str==undefined)
	        return "";
	else
		return lv_str.replace(/\s/g,"");
}
function hilayer(){
	if (fj_inover==false){
		var lay=document.all.cele_date;
		h_cele_date();
	}
}
function getlayerfocus(){
	fj_inover=true;
}
function lostlayerfocus(){
	fj_inover=false;
}
init();
/***************************************日历结束 end*******************************************/