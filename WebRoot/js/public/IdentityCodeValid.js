function IdentityCodeValid(code) { 
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var tip = "";
	var pass= true;
	code =code.replace('x','X');
	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
		tip = "身份证号格式错误";
		pass = false;
	}
	
   else if(!city[code.substr(0,2)]){
		tip = "地址编码错误";
		pass = false;
	}
	else{
		//18位身份证需要验证最后一位校验位
		if(code.length == 18){
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			//校验位
			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++)
			{
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]){
				tip = "校验位错误";
				pass =false;
			}
		}
	}
	//alert(tip);
	return pass;
}
function isIdCardNo(num)  
{ 
    var factorArr = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1); 
    var error; 
    var varArray = new Array(); 
    var intValue; 
    var lngProduct = 0; 
    var intCheckDigit; 
    var intStrLen = num.length; 
    var idNumber = num;     
    // initialize 
    if ((intStrLen != 15) && (intStrLen != 18)) { 
        error = "输入身份证号码长度不对！"; 
      //  alert(error); 
        //frmAddUser.txtIDCard.focus(); 
        return false; 
    }     
    // check and set value 
    for(i=0;i<intStrLen;i++) { 
        varArray[i] = idNumber.charAt(i); 
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) { 
            error = "错误的身份证号码！."; 
           // alert(error); 
            //frmAddUser.txtIDCard.focus(); 
            return false; 
        } else if (i < 17) { 
            varArray[i] = varArray[i]*factorArr[i]; 
        } 
    } 
    if (intStrLen == 18) { 
        //check date 
        var date8 = idNumber.substring(6,14); 
        if (checkDate(date8) == false) { 
            error = "身份证中日期信息不正确！."; 
         //   alert(error); 
            return false; 
        }         
        // calculate the sum of the products 
        for(i=0;i<17;i++) { 
            lngProduct = lngProduct + varArray[i]; 
        }         
        // calculate the check digit 
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
        // check last digit 
        if (varArray[17].toUpperCase() != intCheckDigit) { 
            error = "身份证效验位错误!...正确为： " + intCheckDigit + "."; 
           // alert(error); 
            return false; 
        } 
    }  
    else{        //length is 15 
        //check date 
        var date6 = idNumber.substring(6,12); 
        if (checkDate(date6) == false) { 
           // alert("身份证日期信息有误！."); 
            return false; 
        } 
    } 
    //alert ("Correct."); 
    return true; 
} 

function checkDate(date) 
{ 
    return true; 
}