/**
 * 用于把用utf16编码的字符转换成实体字符，以供后台存储
 * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
 * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
 */
function utf16ToEntity (str)  {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
  str = str.replace(patt, function(char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0); // 取出高位
      L = char.charCodeAt(1); // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
};


function uploadEmojiString(str){
  // str：可能含有emoji的字符串
  var pattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  str.replace(pattern,function(emoji){
  // 将emoji编码
      return encodeURI(emoji);
  });
  // str：将str中的字符串编码
  // 此时可以上传至数据库了。
}

function loadEmojiString(){
  var str = '从数据库取到的字符串，可能含有编码后的emoji';
  // 解码emoji
  return decodeURI(str);
}

export {
  loadEmojiString,
  uploadEmojiString,
  utf16ToEntity
}