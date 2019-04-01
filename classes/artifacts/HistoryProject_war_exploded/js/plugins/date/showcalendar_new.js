var gdCtrl;
var pop_x;
var pop_y;
var date_tag="date";
var date_type="start";

var newPopup=document.parentWindow.createPopup();

function fPopCalendar2(popCtrl, dateCtrl){
	var html="";
	html+="<html>";
	html+="<head>";
	html+="<meta http-equiv='Content-Type' content='text/html;charset=utf-8' />";
	html+="<link type=\"text/css\" href=\"/js/date/Select/style.css\" rel=\"stylesheet\" \/>";
	
	html+="<script language=\javascript\" type=\"text/javascript\" src=\"/js/date/popcalendar_new.js\"><\/script>";
	
	html+="<\/head>";	
	html+="<body style=\"overflow:hidden;border:1px; margin-left:0px;margin-bottom:0px; margin-top: 0px;z-index:20;margin-right: 0px;margin-bottom: 0px;\" onload='fPopCalendar(gdCtrl,gdCtrl)'>";	

	html+="<\/body>";
	html+="<script language=\javascript\" type=\"text/javascript\">";	
	//html+="hideDiv();";
	html+="</script>";
	html+="<\/html>";
	date_tag="date";
	newPopup.document.writeln("");
	newPopup.document.close(); 
	newPopup.document.write(html);
	 var temp_e_obj=popCtrl;
	 //alert(this.popHeight);
	 var pop_x=temp_e_obj.offsetLeft+2;
	 var pop_y=temp_e_obj.offsetTop+temp_e_obj.offsetHeight;
	 while(temp_e_obj=temp_e_obj.offsetParent){
		 pop_x+=temp_e_obj.offsetLeft;
		 pop_y+=temp_e_obj.offsetTop;
	 }
	 if((pop_y+180)>screen.height){
		pop_y=this.targetObj.offsetTop-180;
	 }

	gdCtrl=popCtrl;
	this.newPopup.show(pop_x,pop_y,162,180,document.body);
}

function fPopDate(popCtrl, dateCtrl){
	var html="";
	html+="<html>";
	html+="<head>";
	html+="<meta http-equiv='Content-Type' content='text/html;charset=utf-8' />";
	html+="<link type=\"text/css\" href=\"/js/date/Select/style.css\" rel=\"stylesheet\" \/>";
	
	html+="<script language=\javascript\" type=\"text/javascript\" src=\"/js/date/popcalendar_new.js\"><\/script>";
	
	html+="<\/head>";	
	html+="<body style=\"overflow:hidden;border:1px; margin-left:0px;margin-bottom:0px; margin-top: 0px;z-index:20;margin-right: 0px;margin-bottom: 0px;\" onload='fPopCalendar(gdCtrl,gdCtrl)'>";	

	html+="<\/body>";
	html+="<script language=\javascript\" type=\"text/javascript\">";	
	//html+="hideDiv();";
	html+="</script>";
	html+="<\/html>";
	date_tag="date";
	newPopup.document.close();
	newPopup.document.writeln("");
	newPopup.document.write(html);
	var temp_e_obj=popCtrl;
	//alert(this.popHeight);
	var scroll_x=document.documentElement.scrollLeft;
	var scroll_y=document.documentElement.scrollTop;
	if(document.documentElement&&document.documentElement.scrollTop){
		scroll_x=document.documentElement.scrollLeft;
		scroll_y=document.documentElement.scrollTop;
		//alert(document.documentElement.scrollHeight)
	}else if(document.body){
		scroll_x=document.body.scrollLeft;
		scroll_y=document.body.scrollTop;
	}
	 
	 
	 var pop_x=temp_e_obj.offsetLeft+2-scroll_x;
	 var pop_y=temp_e_obj.offsetTop+temp_e_obj.offsetHeight-scroll_y;
	 while(temp_e_obj=temp_e_obj.offsetParent){
		 pop_x+=temp_e_obj.offsetLeft;
		 pop_y+=temp_e_obj.offsetTop;
	 }
	 if((pop_y+180)>screen.height){
		pop_y=this.targetObj.offsetTop-180;
	 }

	gdCtrl=popCtrl;
	this.newPopup.show(pop_x,pop_y,162,180,document.body);
}


function fPopDateTime(popCtrl,dateCtrl){
	var html="";
	html+="<html>";
	html+="<head>";
	html+="<meta http-equiv='Content-Type' content='text/html;charset=utf-8' />";
	html+="<link type=\"text/css\" href=\"/js/date/Select/style.css\" rel=\"stylesheet\" \/>";
	html+="<script language=\javascript\" type=\"text/javascript\" src=\"/js/date/popcalendar_new.js\"><\/script>";
		
	html+="<\/head>";	
	html+="<body style=\"overflow:hidden;border:1px;margin-left:0px;margin-bottom:0px; margin-top: 0px;z-index:20;margin-right: 0px;margin-bottom: 0px;\" onload='fPopCalendar(gdCtrl,gdCtrl)'>";	
	html+="<\/body>";
	html+="<script language=\javascript\" type=\"text/javascript\">";	
	//html+="hideDiv();";
	html+="</script>";
	html+="<\/html>";
	date_tag="dateTime";
	newPopup.document.close();
	newPopup.document.writeln("");
	newPopup.document.write(html);
	var temp_e_obj=popCtrl;
	//alert(this.popHeight);
	var pop_x=temp_e_obj.offsetLeft+2;
	var pop_y=temp_e_obj.offsetTop+temp_e_obj.offsetHeight;
	while(temp_e_obj=temp_e_obj.offsetParent){
		pop_x+=temp_e_obj.offsetLeft;
		pop_y+=temp_e_obj.offsetTop;
	}
	if((pop_y+180)>screen.height){
		pop_y=this.targetObj.offsetTop-180;
	}
	gdCtrl=popCtrl;
	this.newPopup.show(pop_x,pop_y,162,185,document.body);
}

function fPopDateTime(popCtrl,dateCtrl,datetype){
	var html="";
	html+="<html>";
	html+="<head>";
	html+="<meta http-equiv='Content-Type' content='text/html;charset=utf-8' />";
	html+="<link type=\"text/css\" href=\"/js/date/Select/style.css\" rel=\"stylesheet\" \/>";
	html+="<script language=\javascript\" type=\"text/javascript\" src=\"/js/date/popcalendar_new.js\"><\/script>";
		
	html+="<\/head>";	
	html+="<body style=\"overflow:hidden;border:1px;margin-left:0px;margin-bottom:0px; margin-top: 0px;z-index:20;margin-right: 0px;margin-bottom: 0px;\" onload='fPopCalendar(gdCtrl,gdCtrl)'>";	
	html+="<\/body>";
	html+="<script language=\javascript\" type=\"text/javascript\">";	
	//html+="hideDiv();";
	html+="</script>";
	html+="<\/html>";
	date_tag="dateTime";
	newPopup.document.close();
	newPopup.document.writeln("");
	newPopup.document.write(html);
	var temp_e_obj=popCtrl;
	//alert(this.popHeight);
	var pop_x=temp_e_obj.offsetLeft+2;
	var pop_y=temp_e_obj.offsetTop+temp_e_obj.offsetHeight;
	while(temp_e_obj=temp_e_obj.offsetParent){
		pop_x+=temp_e_obj.offsetLeft;
		pop_y+=temp_e_obj.offsetTop;
	}
	if((pop_y+180)>screen.height){
		//pop_y=this.targetObj.offsetTop-180;
	}
	gdCtrl=popCtrl;
	date_type=datetype;
	this.newPopup.show(pop_x,pop_y,162,185,document.body);
}

function show(){
	
}

function show_pop_Date(namestr,cName,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"'  onBlur='doBlur();' value='"+valuestr+"' class='"+ cName +"' size='12'  kind='date'  title='输入格式:YYYYMMDD 20070101'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopDate("+namestr+","+namestr+");return false'>");
}
function popDate(namestr,cName,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"' onBlur='doBlur();' value='"+valuestr+"' class='"+ cName +"' size='12'  kind='date'  title='输入格式:YYYYMMDD 20070101'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopDate("+namestr+","+namestr+");return false'>");
}
function show_pop_DateTime(namestr,cName,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"' onBlur='doBlur();' value='"+valuestr+"' class='"+ cName +"' size='20'  kind='datetime'  title='输入格式:YYYYMMDD hh:mm:ss 20070101 00:00:00'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopDateTime("+namestr+","+namestr+");return false'>");
}
function popDateTime(namestr,cName,valuestr)
{
	  document.write("<input type='text' name='"+namestr+"' id='"+namestr+"' onBlur='doBlur();' value='"+valuestr+"' class='"+ cName +"' size='20'  kind='datetime'  title='输入格式:YYYYMMDD hh:mm:ss 20070101 00:00:00'>&nbsp;<img src='/js/date/datetime.gif' style='cursor:hand;' align='absmiddle' alt='弹出日历下拉菜单' onclick='fPopDateTime("+namestr+","+namestr+");return false'>");
}
