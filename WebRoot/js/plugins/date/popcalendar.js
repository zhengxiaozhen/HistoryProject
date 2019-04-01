var gdCtrl = new Object();
var goSelectTag = new Array();
var gcGray = "#808080";
var gcToggle = "gold";
var gcred = "#FF0000";
var gcBG = "#f0f0f0";
var gcGreen = "darkGreen";
var gcLine="silver";
var gcTitle="silver";
var ofSize="10pt";

var gdCurDate = new Date();
var giYear = gdCurDate.getFullYear();
var giMonth = gdCurDate.getMonth()+1;
var giDay = gdCurDate.getDate();
    giMonth=((giMonth<10)?"0":"")+giMonth;
    giDay=((giDay<10)?"0":"")+giDay;

function fPopCalendar(popCtrl, dateCtrl){
  event.cancelBubble=true;
  gdCtrl = dateCtrl;
  fSetYearMon(giYear, giMonth);
  var point = fGetXY(popCtrl);
  with (VicPopCal.style) {
  	left = point.x;
	top  = point.y+popCtrl.offsetHeight+1;
	width = VicPopCal.offsetWidth;
	height = VicPopCal.offsetHeight;
	fToggleTags(point);
	visibility = 'visible';
  }

  VicPopCal.focus();
}

 function fSetDate(iYear, iMonth, iDay){
  gdCtrl.focus();
  gdCtrl.value = iYear+"-"+iMonth+"-"+iDay;
  fHideCalendar();
 
}

function fHideCalendar(){
  VicPopCal.style.visibility = "hidden";
  for (i in goSelectTag)                                        //在数组中循环取值，goSelectTag为数组名
  	goSelectTag[i].style.visibility = "visible";
  goSelectTag.length = 0;
}

function fSetSelected(aCell){                                        
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
  tbSelMonth.options[iMon-1].selected = true;
  for (i = 0; i < tbSelYear.length; i++)
	if (tbSelYear.options[i].value == iYear)
		tbSelYear.options[i].selected = true;
  fUpdateCal(iYear, iMon);//将改变厚的值传给fUpdateCal（）以便以在表格中显示变化
}

function fPrevMonth(){
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (--iMon<1) {
	  iMon = 12;
	  iYear--;
  }

  fSetYearMon(iYear, iMon);
}

function fNextMonth(){
  var iMon = tbSelMonth.value;
  var iYear = tbSelYear.value;

  if (++iMon>12) {
	  iMon = 1;
	  iYear++;
  }

  fSetYearMon(iYear, iMon);
}

function fToggleTags(){
  with (document.all.tags("SELECT")){
 	for (i=0; i<length; i++)
 		if ((item(i).Victor!="Won")&&fTagInBound(item(i))){
 			item(i).style.visibility = "hidden";
 			goSelectTag[goSelectTag.length] = item(i);
 		}
  }
}

function fTagInBound(aTag){
  with (VicPopCal.style){
  	var l = parseInt(left);
  	var t = parseInt(top);
  	var r = l+parseInt(width);
  	var b = t+parseInt(height);
	var ptLT = fGetXY(aTag);
	return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
  }
}

function fGetXY(aTag){
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

var gMonths = new Array("1","2","3","4","5","6","7","8","9","10","11","12");

with (document) {
write("<Div id='VicPopCal' onclick='event.cancelBubble=true' style='POSITION:absolute;visibility:hidden;border:1px ridge;width:10;z-index:100;'>");
write("<table border='0' bgcolor='#f0f0f0'>");
write("<TR>");
write("<td valign='middle' align='center'><input type='button' name='PrevMonth'  class='previous' value='<<' onClick='fPrevMonth()'>");
write("&nbsp;<SELECT name='tbSelYear' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)' style='font-color:#000080;background:#f0f0f0' Victor='Won'>");
for(i=1949;i<=2020;i++)
write("<OPTION value='"+i+"'>"+i+"</OPTION>");
write("</SELECT>");
write("&nbsp;<select name='tbSelMonth' onChange='fUpdateCal(tbSelYear.value, tbSelMonth.value)'  style='font-color:#000080;background:#f0f0f0' Victor='Won'>");
for (i=0; i<12; i++)
write("<option value='"+(i+1)+"'>"+gMonths[i]+"</option>");
write("</SELECT>");
write("&nbsp;<input type='button' name='PrevMonth' class='next' value='>>' onclick='fNextMonth()'>");
write("</td>");
write("</TR><TR>");
write("<td align='center'>");
write("<DIV style='background-color:blue'><table border='0' cellspacing='0' cellpadding='0' width='100%' bgcolor='"+gcLine+"'><tr><td><table border='0' cellspacing='1' width='100%' cellpadding='1'>");
fDrawCal(giYear, giMonth, 12, 12);
write("</table></td></tr></table></DIV>");
write("</td>");
write("</TR><TR><TD align='center'>");
write("<span style='cursor:hand; font-size=9pt' onclick='fSetDate(giYear,giMonth,giDay)' onMouseOver='this.style.color=gcred' onMouseOut='this.style.color=0'>今天"+giYear+"-"+giMonth+"-"+giDay+"</span>");
write("<span style='cursor:hand; font-size=9pt' onclick='fClearInput()' onMouseOver='this.style.color=gcGreen' onMouseOut='this.style.color=0'>&nbsp;&nbsp;清空</span>");
write("</TD></TR>");
write("</TABLE></Div>");
write("<SCRIPT event=onclick() for=document>fHideCalendar()</SCRIPT>");
}

function arrowtag(namestr,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"' value='"+valuestr+"' class='textbox' size='12'  kind='date' onBlur='doBlur()' title='输入格式:YYYYMMDD 如20070101'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopCalendar("+namestr+","+namestr+");return false'>");
}

function popDate(namestr,cName,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"' value='"+valuestr+"' class='"+ cName +"' size='12'  kind='date' onBlur='doBlur()' title='输入格式:YYYYMMDD 如20070101'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopCalendar("+namestr+","+namestr+");return false'>");
}

function popDateTime(namestr,cName,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"' value='"+valuestr+"' class='"+ cName +"' size='12'  kind='datetime' onBlur='doBlur()' title='输入格式:YYYYMMDD 如20070101'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopCalendar("+namestr+","+namestr+");return false'>");
}