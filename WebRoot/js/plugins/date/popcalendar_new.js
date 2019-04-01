var gdCtrl = parent.gdCtrl;
var dateTag = parent.date_tag;
var dateType= gdCtrl.datetype;
var goSelectTag = new Array();
var gcGray = "#808080";
var gcToggle = "gold";
var gcred = "#FF0000";
var gcBG = "#f0f0f0";
var gcGreen = "darkGreen";
var gcLine="silver";
var gcTitle="silver";
var ofSize="10pt";
var fj_clearInterval;
var gdCurDate = new Date();
var giYear = gdCurDate.getFullYear();
var giMonth = gdCurDate.getMonth()+1;
var giDay = gdCurDate.getDate();
    giMonth=((giMonth<10)?"":"")+giMonth;
    giDay=((giDay<10)?"0":"")+giDay;

 function fSetDate(iYear, iMonth, iDay){
  gdCtrl.focus();
  iMonth=((iMonth.length<2)?"0":"")+iMonth;
  if(dateTag=='dateTime'){
  	//gdCtrl.value = iYear+"-"+iMonth+"-"+iDay+" "+document.all.nowDateText.value;
	if(dateType=='start')gdCtrl.value = iYear+"-"+iMonth+"-"+iDay+" 00:00:00";
	else if(dateType=='end')gdCtrl.value = iYear+"-"+iMonth+"-"+iDay+" 23:59:59";
	else gdCtrl.value = iYear+"-"+iMonth+"-"+iDay+" "+document.all.nowDateText.value;
  }else{
  	gdCtrl.value = iYear+"-"+iMonth+"-"+iDay;
  }
  fHideCalendar();
  gdCtrl = parent.gdCtrl;
}

function fHideCalendar(){
  //VicPopCal.style.visibility = "hidden";
  hideDiv();
  parent.newPopup.hide();
  for (i in goSelectTag)                                        //在数组中循环取值，goSelectTag为数组名
  	goSelectTag[i].style.visibility = "visible";
  goSelectTag.length = 0;
  if(dateTag=='dateTime'){
  	 window.clearTimeout(fj_clearInterval);
  }
  
}

function fSetSelected(aCell){   
 gdCtrl = parent.gdCtrl;
  var iOffset = 0;
  var iYear =parseInt(tbSelYear.value);//动态改变文本框的年
  var iMonth = parseInt(tbSelMonth.value);//动态改变文本框的月
 
  aCell.bgColor = gcBG;
  with (aCell.children["cellText"]){
  	var iDay = parseInt(innerText);
	iDay=(iDay<10)?"0"+iDay:iDay;
	{
	}
  	if (color==gcGray)
		iOffset = (Victor<10)?-1:1;
	iMonth += iOffset;
	if (iMonth<1) {
		iYear--;
		iMonth = 12;
	}else if (iMonth>12){
		iYear++;
		iMonth = 1;
	}
  }
  iMonth=(iMonth<10)?"0"+iMonth:iMonth;
  fSetDate(iYear, iMonth, iDay);
  
}

function Point(iX, iY){
	this.x = iX;
	this.y = iY;
}

function fBuildCal(iYear, iMonth) {
  var aMonth=new Array();
  for(i=1;i<7;i++)
  	aMonth[i]=new Array(i);

  var dCalDate=new Date(iYear, iMonth-1, 1);
  var iDayOfFirst=dCalDate.getDay();
  var iDaysInMonth=new Date(iYear, iMonth, 0).getDate();
  var iOffsetLast=new Date(iYear, iMonth-1, 0).getDate()-iDayOfFirst+1;
  var iDate = 1;
  var iNext = 1;

  for (d = 0; d < 7; d++)
	aMonth[1][d] = (d<iDayOfFirst)?-(iOffsetLast+d):iDate++;
  for (w = 2; w < 7; w++)
  	for (d = 0; d < 7; d++)
		aMonth[w][d] = (iDate<=iDaysInMonth)?iDate++:-(iNext++);
  return aMonth;
}

function fDrawCal(iYear, iMonth, iCellHeight, iDateTextSize) {
  var WeekDay = new Array("日","一","二","三","四","五","六");
  var styleTD = " bgcolor='"+gcBG+"' bordercolor='"+gcBG+"' valign='middle' align='center' height='"+iCellHeight+"' style='font-size:9pt "+iDateTextSize+" 宋体;";
  var titleTD = " bgcolor='"+gcTitle+"' bordercolor='"+gcBG+"' valign='middle' align='center' height='"+iCellHeight+"' style='font-size:9pt "+iDateTextSize+" 宋体;";
  with (document) {
	write("<tr>");
	for(i=0; i<7; i++)
		write("<td "+titleTD+"color:green'>" + WeekDay[i] + "</td>");
	write("</tr>");

  	for (w = 1; w < 7; w++) {
		write("<tr>");
		for (d = 0; d < 7; d++) {
			write("<td id=calCell "+styleTD+"cursor:hand;' onMouseOver='this.bgColor=gcToggle' onMouseOut='this.bgColor=gcBG' onclick='fSetSelected(this)'>");
			write("<font id=cellText Victor='Liming Weng'> </font>");
			write("</td>")
		}
		write("</tr>");
	}
  }
}

function fUpdateCal(iYear, iMonth) {
	tbSelYear.value=iYear;
	tbSelMonth.value=iMonth;
	hideDiv();
  myMonth = fBuildCal(iYear, iMonth);
  var i = 0;
  for (w = 0; w < 6; w++)
	for (d = 0; d < 7; d++)
		with (cellText[(7*w)+d]) {
			Victor = i++;
			if (myMonth[w+1][d]<0) {
				color = gcGray;
				innerText =-myMonth[w+1][d];
			}else{
				color = ((d==0)||(d==6))?"red":"black";
				innerText =myMonth[w+1][d];
			}
		}
}
//该函数动态改变年后引起表格中的变化
function fSetYearMon(iYear, iMon){
	hideDiv();
	gdCtrl = parent.gdCtrl;
	tbSelMonth.value=iMon;
  //tbSelMonth.options[iMon-1].selected = true;
 /* for (i = 0; i < tbSelYear.length; i++)
	if (tbSelYear.options[i].value == iYear)
		tbSelYear.options[i].selected = true;*/
		for(i=1949;i<=2020;i++)
			if (i == iYear)
				tbSelYear.value=iYear;
  fUpdateCal(iYear, iMon);//将改变厚的值传给fUpdateCal（）以便以在表格中显示变化
}

function fPrevMonth(){
	gdCtrl = parent.gdCtrl;
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (--iMon<1) {
	  iMon = 12;
	  iYear--;
  }

  fSetYearMon(iYear, iMon);
}

function fNextMonth(){
	gdCtrl = parent.gdCtrl;
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (++iMon>12) {
	  iMon = 1;
	  iYear++;
  }

  fSetYearMon(iYear, iMon);
}

function fToggleTags(){
	gdCtrl = parent.gdCtrl;
  with (document.all.tags("SELECT")){
 	for (i=0; i<length; i++)
 		if ((item(i).Victor!="Won")&&fTagInBound(item(i))){
 			item(i).style.visibility = "hidden";
 			goSelectTag[goSelectTag.length] = item(i);
 		}
  }
}

function fTagInBound(aTag){
  /*with (VicPopCal.style){
  	var l = parseInt(left);
  	var t = parseInt(top);
  	var r = l+parseInt(width);
  	var b = t+parseInt(height);
	var ptLT = fGetXY(aTag);
	return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
  }*/
}

function fGetXY(aTag){
	gdCtrl = parent.gdCtrl;
  var oTmp = aTag;
  var pt = new Point(0,0);
  do {
  	pt.x += oTmp.offsetLeft;
  	pt.y += oTmp.offsetTop;
  	oTmp = oTmp.offsetParent;
  } while(oTmp.tagName!="BODY");
  return pt;
}
function fClearInput()
{
	gdCtrl.value = "";
  	fHideCalendar();
}

	function hideDiv(){
		document.all.divYear.style.display='none';
		document.all.divMonth.style.display='none'
	}

	function displayDate(year,month){
		event.cancelBubble=true;
		//document.all.divYear.style.display='none'
		document.all.divMonth.style.display='none'
		if(document.all.divYear.style.display=='none')
			document.all.divYear.style.display='';
		else
			document.all.divYear.style.display='none';
		var temp_e_obj = document.all.tbSelYear;
		 var pop_x=temp_e_obj.offsetLeft+2;
	 	var pop_y=temp_e_obj.offsetTop+temp_e_obj.offsetHeight;
		 while(temp_e_obj=temp_e_obj.offsetParent){
		 	pop_x+=temp_e_obj.offsetLeft;
		 	pop_y+=temp_e_obj.offsetTop;
		 }
	 	if((pop_y+180)>screen.height){
			pop_y=this.targetObj.offsetTop-180;
	 	}
		document.all.divYear.style.left=pop_x;
		document.all.divYear.style.top=pop_y;
		
	}

 function displaymonth(year,month){
 		event.cancelBubble=true;
		document.all.divYear.style.display='none'
		//document.all.divMonth.style.display='none'
		
 		if(document.all.divMonth.style.display=='none')
			document.all.divMonth.style.display='';
		else
			document.all.divMonth.style.display='none';
		var temp_e_obj = document.all.tbSelMonth;
		 var pop_x=temp_e_obj.offsetLeft+2;
	 	var pop_y=temp_e_obj.offsetTop+temp_e_obj.offsetHeight;
		 while(temp_e_obj=temp_e_obj.offsetParent){
		 	pop_x+=temp_e_obj.offsetLeft;
		 	pop_y+=temp_e_obj.offsetTop;
		 }
	 	if((pop_y+180)>screen.height){
			pop_y=this.targetObj.offsetTop-180;
	 	}
		document.all.divMonth.style.left=pop_x;
		document.all.divMonth.style.top=pop_y;
 	
 }

 function outMouse(obj){
 	event.cancelBubble=true;
 	obj.style.background='#316ac5';
	obj.style.color='#FFFFFF';
 }
  function overMouse(obj){
 	event.cancelBubble=true;
 	obj.style.background='#FFFFFF'
	obj.style.color='';
 }

var gMonths = new Array("1","2","3","4","5","6","7","8","9","10","11","12");

with (document) {
write("<Div id='VicPopCal' onclick='event.cancelBubble=true' style='border:1px ridge;width:10;z-index:100;'>");
write("<table border='0' bgcolor='#f0f0f0' style='z-index:5;'>");
write("<TR>");
write("<td valign='middle' align='center'><input type='button' name='PrevMonth'  class='previous' value='<<' onClick='fPrevMonth()'>");

write("<input type='text'  name='tbSelYear' id='tbSelYear' value='' readonly='' onClick='displayDate(tbSelYear.value, tbSelMonth.value);' style='font-color:#000080;background:#FFFFFF; cursor:hand;width:60px;background:url(/js/date/Select/icon_select.gif) no-repeat right 4px;'>");

//write("&nbsp;<SELECT  name='tbSelYear' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' style='font-color:#000080;background:#f0f0f0;z-index:0' Victor='Won'>");
write("<div id='divYear'  onclick='event.cancelBubble=true' style='border:1px;border-style:solid; border-color:#000000;width:55px; height:123px;font-color:#000080;background:#FFFFFF;z-index:0; display:none; position:absolute; z-index:10; overflow:auto'>");
write("<table width='30px' border='0' cellpadding='0' cellspacing='0' >");
for(i=1949;i<=2020;i++)
write("<tr style='cursor:hand' onClick=fUpdateCal('"+i+"',tbSelMonth.value) onMouseOver='outMouse(this)' onMouseOut='overMouse(this);' id='year"+i+"'><td>"+i+"</td></tr>")
write("</table></div>");

//write("<OPTION value='"+i+"'>"+i+"</OPTION>");
//write("</SELECT>");

//write("&nbsp;<select name='tbSelMonth' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)'  style='font-color:#000080;background:#f0f0f0;z-index:-1;' Victor='Won'>");
write("<input type='text'  name='tbSelMonth' id='tbSelMonth' value='' readonly='' onClick='displaymonth(tbSelYear.value, tbSelMonth.value);' style='font-color:#000080;background:#FFFFFF; cursor:hand;width:40px;background:url(/js/date/Select/icon_select.gif) no-repeat right 4px;'>");
write("<div id='divMonth'  onclick='event.cancelBubble=true' style='border:1px;border-style:solid; border-color:#000000;width:40px; height:123px;font-color:#000080;background:#FFFFFF;z-index:0; display:none; position:absolute; z-index:10; overflow:auto'>");
write("<table width='20px' border='0'  cellpadding='0' cellspacing='0' >");
for (i=1; i<=12; i++)
document.write("<tr style='cursor:hand;' onClick=fUpdateCal(tbSelYear.value,"+i+") onMouseOver='outMouse(this)' onMouseOut='overMouse(this);' id='month"+i+"'><td>"+i+"</td></tr>")
write("</table></div>");
/*
for (i=0; i<12; i++)
write("<option value='"+(i+1)+"'>"+gMonths[i]+"</option>");
write("</SELECT>");*/


write("&nbsp;<input type='button' name='PrevMonth' class='next' value='>>' onclick='fNextMonth()'>");
write("</td>");
write("</TR><TR>");
write("<td align='center'>");
write("<DIV style='background-color:blue'><table border='0' cellspacing='0' cellpadding='0' width='100%' bgcolor='"+gcLine+"'><tr><td><table border='0' cellspacing='1' width='100%' cellpadding='1'>");
fDrawCal(giYear, giMonth, 12, 12);
write("</table></td></tr></table></DIV>");
write("</td>");
write("</TR><TR><TD align='center'>");
if(dateTag=='dateTime'){
	write("<span style='cursor:hand; font-size=9pt' valign='top' onclick='fSetDate(giYear,giMonth,giDay)'  onMouseOver='this.style.color=gcred' onMouseOut='this.style.color=0' id='nowDateSpan'>今天</span><input type='text' name='nowDateText' id='nowDateText' style='width:80px;height:18px;border:1px solid #DDDDDD;background:#EEEEEE;text-align:center;font-size:9pt;margin:0px;padding:0px' value='"+getFJTime()+"' onfocus='dateTimeFocus();'>");
	setfj_o_set_time();
}else{
	write("<span style='cursor:hand; font-size=9pt' onclick='fSetDate(giYear,giMonth,giDay)' onMouseOver='this.style.color=gcred' onMouseOut='this.style.color=0' id='nowDateSpan'>今天"+giYear+"-"+giMonth+"-"+giDay+"</span>");
}
write("<span style='cursor:hand; font-size=9pt' onclick='fClearInput()' onMouseOver='this.style.color=gcGreen' onMouseOut='this.style.color=0'>&nbsp;&nbsp;清空</span>");
write("</TD></TR>");
write("</TABLE>");
write("<SCRIPT event=onclick() for=document>fHideCalendar()</SCRIPT>");
}


function dateTimeFocus(){
	window.clearTimeout(fj_clearInterval);
}

//function fPopCalendar(popCtrl, dateCtrl){
		
  //event.cancelBubble=true;
  //gdCtrl = dateCtrl;
  hideDiv();
  fSetYearMon(giYear, giMonth);
  var point = fGetXY(gdCtrl);
  /*with (VicPopCal.style) {
  	left = 0;
	top  = 0;
	width = VicPopCal.offsetWidth;
	height = VicPopCal.offsetHeight;
	fToggleTags(point);
	visibility = 'visible';
  }*/

  //VicPopCal.focus();
//}
function setObj(obj){
	gdCtrl=obj;
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
          
    return fj_ot_hour+":"+fj_ot_minute+":"+fj_ot_second;
}
function setfj_o_set_time(){
        document.all.nowDateText.value=getFJTime();
        fj_clearInterval=window.setTimeout("setfj_o_set_time()",1000);
}

