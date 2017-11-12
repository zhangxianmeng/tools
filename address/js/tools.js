+ function($) {

	$(function() {
		var $doc = $(document)
		/*限制只能输入整数
		 * =============*/
		$doc.on('keyup', 'input[data-rule-digits]', function() {
			this.value = this.value.replace(/\D|^0/g, "")
		})
		/*限制只能输入数字，可以为小数
		 * =============*/
		$doc.on('keyup', 'input[data-rule-num]', function() {

			if(!/^\d+[.]?\d*$/.test(this.value)) {
				this.value = /^\d+[.]?\d*/.exec(this.value);
			}
			return false;
		})

	})

}(jQuery);

! function(window, $) {
	var Util = window.Util || {};
	/**
	 * 获取url参数值
	 * @param name
	 * @param url
	 * @returns {*}
	 */
	Util.getQueryString = function(name, url) {
		if(!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if(!results) return null;
		if(!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	window.Util = Util;
}(window);

//判断Mobile装置
function isMobile(){
	return (/AppleWebKit.*Mobile/i.test(navigator.userAgent) 
		|| /Android/i.test(navigator.userAgent) 
		|| /BlackBerry/i.test(navigator.userAgent) 
		|| /IEMobile/i.test(navigator.userAgent) 
		|| (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)));
}

function getMobilePlat(){
	if(navigator.userAgent.match(/Android/i))
		return 'Android';
	if(navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i))
		return 'IOS';
	if(navigator.userAgent.match(/Windows Phone/i))
		return 'Windows Phone';
	return 'other';
}

/**
 * 解析Url param内容
 * @return {Object} urlParam
 * @public
 */
function getUrlParam() {
	var urlParam = {};
	var query = window.location.search.substring(1);
	if(query.length==0)return;
	var vars = query.split("&"),pair;
	console.log
	for (var i=0;i<vars.length;i++) {
		pair = vars[i].split("=");
		urlParam[pair[0]] = decodeURIComponent(pair[1]);
	}
	query = vars = pair = null;
	return urlParam;
}

/**
 * get Cookie
 * @param key
 */
function getCookie(key){
	if(!key||!(typeof key ==='string')){
		alert('key 必须为String 不可为空');
		return '';
	}

	key+='=';
	var cookieArr = document.cookie.split(';');
	var value = '';
	for(var i in cookieArr){
		if(cookieArr[i].indexOf(key)>-1){
			value = cookieArr[i].trim().replace(key,'');
			break;
		}
	}
	return value;
}

/**
 * set Cookie
 * @param {String} key
 * @param {String} value
 */
function setCookie(key,value){
	if(!key||!(typeof key ==='string')){
		alert('key 必须为String 不可为空');
		return '';
	}
	if(!value){
		document.cookie = key+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		return;
	}
	document.cookie = key+'= '+value;
}