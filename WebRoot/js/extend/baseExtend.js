// JavaScript Document  by tang 2016-11-17
(function($) {
	//表单参数转json
	$.fn.serializeObject = function(){
		var serializeObj = {};
		var obj =  this.serializeArray();
		$.each(obj,function(){
			if(serializeObj[this.name]){
				if(!serializeObj[this.name].push){
					serializeObj[this.name] = [serializeObj[this.name]];
				}
				serializeObj[this.name].push(this.value||"");
			}else{
				serializeObj[this.name]=this.value||"";
			}
		});
		return serializeObj;
	}
	//设置表单只读
	$.fn.setReadonly =  function(){
		var isTrue = typeof value =='undefined'||value==true;
		_this = $(this);
		_this.find(":text,textarea").attr("readonly",isTrue);
		_this.find(":radio,:checkbox,select").attr("disabled",isTrue);
	}
	
	//多选选中值
	$.fn.getCheckboxVal = function(){
		_obj = $(this).filter(":checked");
		var ary = new Array();
		$.each(_obj,function(index,element){
			ary.push($(this).val());
		});
		return ary.join(",");
	}
	
	$.extend({
		// 前端 ajax 登录错误跳转
		isLogin : function(data){
			var obj = $.parseJSON(data);
			if(data.res=='login_error'){
				alert("登录失效！");
				top.location.href="/";
			}
		},
		//身份证号校验
		isIdCard : function(num){
		    var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1); 
			var error; 
			var varArray = new Array(); 
			var intValue; 
			var lngProduct = 0; 
			var intCheckDigit; 
			var intStrLen = num.length; 
			var idNumber = num;
			if ((intStrLen != 15) && (intStrLen != 18)) { 
				error = "输入身份证号码长度不对！"; 
				return false; 
			}     
			// check and set value 
			for(i=0;i<intStrLen;i++) { 
				varArray[i] = idNumber.charAt(i); 
				if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) { 
					error = "错误的身份证号码！."; 
					return false; 
				} else if (i < 17) { 
					varArray[i] = varArray[i]*factorArr[i]; 
				} 
			} 
			if (intStrLen == 18) { 
				var date8 = idNumber.substring(6,14); 
				if (checkDate(date8) == false) { 
					error = "身份证中日期信息不正确！."; 
					return false; 
				}         
				for(i=0;i<17;i++) { 
					lngProduct = lngProduct + varArray[i]; 
				}          
				intCheckDigit = 12 - lngProduct % 11; 
				switch (intCheckDigit) { 
					case 10: 
						intCheckDigit = 'X'; 
						break; 
					case 11: 
						intCheckDigit = 0; 
						break; 
					case 12: 
						intCheckDigit = 1; 
						break; 
				}         
				if (varArray[17].toUpperCase() != intCheckDigit) { 
					error = "身份证效验位错误!...正确为： " + intCheckDigit + "."; 
					return false; 
				} 
			}  
			else{      
				var date6 = idNumber.substring(6,12); 
				if (checkDate(date6) == false) {  
					return false; 
				} 
			} 
			return true; 
		}
	});
})(jQuery);