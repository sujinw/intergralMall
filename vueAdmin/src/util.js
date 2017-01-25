//base64操作
var Base64 = function () {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  // 加密算法
  this.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    }
    // 解密算法
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // 转成utf-8  
  var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  //解密uft-8字符
  var _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = 0,
      c1 = 0,
      c2 = 0,
      c3;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}

var prefix = "www.wvmp360.com"
var base64 = new Base64();
//存数据
var storeSet = function (key, value, pre) {
    prefix = pre ? pre : prefix;
    return window.localStorage.setItem(prefix + key, base64.encode(value));
  }
  //取数据
var storeGet = function (key, pre) {
    prefix = pre ? pre : prefix;
    return window.localStorage.getItem(prefix + key) ? base64.decode(window.localStorage.getItem(prefix + key)) : false;
  }
  //存session
var sessionSet = function (key, value, pre) {
    prefix = pre ? pre : prefix;
    return window.localStorage.setItem(prefix + key, base64.encode(value));
  }
  //取session
var sessionGet = function (key, pre) {
  prefix = pre ? pre : prefix;
  return window.localStorage.getItem(prefix + key) ? base64.decode(window.localStorage.getItem(prefix + key)) : false;
}

//获得coolie 的值
var cookieGet = function (name) {
    var _cookieStr = document.cookie;

    var cookieArray = _cookieStr.split("; "); //得到分割的cookie名值对
    for (var i = 0; i < cookieArray.length; i++) {
      var arr = cookieArray[i].split("="); //将名和值分开
      if (arr[0] == name) return decodeURIComponent(arr[1]); //如果是指定的cookie，则返回它的值
    }
    return "";
  }
  //设置cookie
var cookieSet = function (cookiename, cookievalue, hours) {
    var date = new Date();
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
  }
  //删除cookie
var cookieDel = function (name) {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
}
export default {
  storeSet: storeSet,
  storeGet: storeGet,
  sessionGet: sessionGet,
  sessionSet: sessionSet
}
