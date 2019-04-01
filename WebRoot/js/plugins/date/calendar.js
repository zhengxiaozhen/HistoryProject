var __gdCtrl = new Object();
var __goSelectTag = new Array();
var __gcGray = "#808080";		//不在当月日期显示颜色
var __gcToggle = "gold";		//鼠标经过单元格背景
var __gcred = "#FF0000";		//高亮显示颜色
var __gcBG = "#f0f0f0";		//日历表格背景
var __gcGreen = "darkGreen";
var __gcLine="silver";		//日历表边框颜色
var __gcTitle="silver";		//日历表头部背景
var __ofSize="10pt";			//无意义

var __gdCurDate = new Date();
var __giYear = __gdCurDate.getFullYear();
var __giMonth = __gdCurDate.getMonth()+1;
var __giDay = __gdCurDate.getDate();
    __giMonth=((__giMonth<10)?"0":"")+__giMonth;
    __giDay=((__giDay<10)?"0":"")+__giDay;



function __fSetDate(iYear, iMonth, iDay){
  //gdCtrl.value = iYear+"-"+iMonth+"-"+iDay;
  alert('call me');
}


function __fSetSelected(aCell){                                        
  var __iOffset = 0;
  var __iYear =parseInt(__tbSelYear.value);//动态改变文本框的年
  var __iMonth = parseInt(__tbSelMonth.value);//动态改变文本框的月
  
  __aCell.bgColor = __gcBG;
  with (__aCell.children["cellText"]){
  	var __iDay = parseInt(__innerText);
	__iDay=(__iDay<10)?"0"+__iDay:__iDay;
	{
	}
  	if (__color==__gcGray)
		__iOffset = 1;
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
  __fSetDate(iYear, iMonth, iDay);
}

function Point(iX, iY){
	this.x = iX;
	this.y = iY;
}

function __fBuildCal(iYear, iMonth) {
  var __aMonth=new Array();
  for(i=1;i<7;i++)
  	__aMonth[i]=new Array(i);

  var __dCalDate=new Date(iYear, iMonth-1, 1);
  var __iDayOfFirst=dCalDate.getDay();
  var __iDaysInMonth=new Date(iYear, iMonth, 0).getDate();
  var __iOffsetLast=new Date(iYear, iMonth-1, 0).getDate()-__iDayOfFirst+1;
  var __iDate = 1;
  var __iNext = 1;

  for (d = 0; d < 7; d++)
	__aMonth[1][d] = (d<__iDayOfFirst)?-(__iOffsetLast+d):__iDate++;
  for (w = 2; w < 7; w++)
  	for (d = 0; d < 7; d++)
		__aMonth[w][d] = (__iDate<=__iDaysInMonth)?__iDate++:-(__iNext++);
  return __aMonth;
}

function __fDrawCal(iYear, iMonth, iCellHeight, iDateTextSize) {
  var ts="";
  var __WeekDay = new Array("日","一","二","三","四","五","六");
  var __styleTD = " bgcolor='"+__gcBG+"' bordercolor='"+__gcBG+"' valign='middle' align='center' height='"+__iCellHeight+"' style='font-size:9pt "+__iDateTextSize+" 宋体;";
  var __titleTD = " bgcolor='"+__gcTitle+"' bordercolor='"+__gcBG+"' valign='middle' align='center' height='"+__iCellHeight+"' style='font-size:9pt "+__iDateTextSize+" 宋体;";
	ts +="<tr>";
	for(i=0; i<7; i++)
	  { ts += "<td "+titleTD+"color:green'>" + WeekDay[i] + "</td>";}
	ts += "</tr>";

  	for (w = 1; w < 7; w++) {
		ts +="<tr>";
		for (d = 0; d < 7; d++) {
			ts +="<td id=__calCell "+__styleTD+"cursor:hand;' onMouseOver='this.bgColor=gcToggle' onMouseOut='this.bgColor=gcBG' onclick='__fSetSelected(this)'>";
			ts +="<font id=__cellText > </font>";
			ts +="</td>";
		}
		ts +="</tr>";
	}

  //alert(ts)
  return ts;
}

function __fUpdateCal(iYear, iMonth) {
  __myMonth = __fBuildCal(iYear, iMonth);
  var i = 0;
  for (w = 0; w < 6; w++)
	for (d = 0; d < 7; d++)
		with (__cellText[(7*w)+d]) {
			
			if (__myMonth[w+1][d]<0) {
				color = __gcGray;
				__innerText =-__myMonth[w+1][d];
			}else{
				__color = ((d==0)||(d==6))?"red":"black";
				__innerText =__myMonth[w+1][d];
			}
		}
}
//该函数动态改变年后引起表格中的变化
function __fSetYearMon(iYear, iMon){
  __tbSelMonth.options[iMon-1].selected = true;
  for (i = 0; i < __tbSelYear.length; i++)
	if (__tbSelYear.options[i].value == iYear)
		__tbSelYear.options[i].selected = true;
  __fUpdateCal(iYear, iMon);//将改变厚的值传给fUpdateCal（）以便以在表格中显示变化
}

function __fPrevMonth(){
  var iMon = __tbSelMonth.value;
  var iYear = __tbSelYear.value;

  if (--iMon<1) {
	  iMon = 12;
	  iYear--;
  }

  __fSetYearMon(iYear, iMon);
}

function __fNextMonth(){
  var iMon = __tbSelMonth.value;
  var iYear = __tbSelYear.value;

  if (++iMon>12) {
	  iMon = 1;
	  iYear++;
  }

  __fSetYearMon(iYear, iMon);
}




var __gMonths = new Array("一","二","三","四","五","六","七","八","九","十","十一","十二");

var calStr="";
calStr +="<Div id='__showCalender' style='visibility:visible;border:1px ridge;width:10;z-index:100;'>";
calStr +="<table border='0' bgcolor='#f0f0f0'>";
calStr +="<TR>";
calStr +="<td valign='middle' align='center'>";
calStr +="<input type='button' name='__PrevMonth'  value='<<'  onClick='__fPrevMonth()'>";
calStr +="&nbsp;<SELECT name='__tbSelYear' onChange='fUpdateCal(this.value, __tbSelMonth.value)'";
calStr +="  >";
for(i=2008;i<=2020;i++)
{
  calStr +="<OPTION value='"+i+"'>"+i+"</OPTION>";
}
calStr +="</SELECT>";
calStr +="&nbsp;<select name='__tbSelMonth' onChange='fUpdateCal(__tbSelYear.value, this.value)'";
calStr +=" >";
for (i=0; i<12; i++)
{
  calStr +="<option value='"+(i+1)+"'>"+__gMonths[i]+"</option>";
}
calStr +="</SELECT>";
calStr +="&nbsp;<input type='button' name='__PrevMonth' value='>>' onclick='__fNextMonth()'>";
calStr +="</td>";
calStr +="</TR><TR>";
calStr +="<td align='center'>";
calStr +="<DIV style='background-color:blue'>";
calStr +="<table border='0' cellspacing='0' cellpadding='0' width='100%' bgcolor='"+__gcLine+"'>";
calStr +="<tr><td><table border='0' cellspacing='1' width='100%' cellpadding='1'>";
calStr += fDrawCal(__giYear, __giMonth, 12, 12);
calStr +="</table></td></tr></table></DIV>";
calStr +="</td>";
calStr +="</TR><TR><TD align='center'>";
calStr +="<span style='cursor:hand; font-size=9pt'; onclick='__fSetDate(__giYear,__giMonth,__giDay)'";
calStr +=" onMouseOver='this.style.color=gcred' onMouseOut='this.style.color=0'>今天："+__giYear+"-"+__giMonth+"-"+__giDay+"</span>";
calStr +="</TD></TR>";
calStr +="</TABLE></Div>";

//alert(calStr)