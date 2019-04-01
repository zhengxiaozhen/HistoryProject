var  gTchCookie = new TCHCookie();
function TCHCookie() {
	var _setKeyCookie = function (key, value) {
		var strCookie = '';
		strCookie = key + '=' + value;
		date.setTime(date.getTime() + 24 * 60 * 60 * 1000);//24小时过期
		strCookie = strCookie + '; expires=' + date.toGMTString();
		strCookie = strCookie + '; path=/';
		document.cookie = strCookie;
	}
	var _getKeyCookie = function (key, defaultValue) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split(';');
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split('=');
			if (arr[0] == key) {
				return unescape(arr[1]);
			}
		}
		return defaultValue;
	}

	return {
		SetKeyCookie: _setKeyCookie
		,GetKeyCookie: _getKeyCookie
	}
}