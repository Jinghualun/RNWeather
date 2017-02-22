var Utils = {};

Utils.getWeekday = function(time) {
    var number = new Date(Date.parse(time.replace(/-/g,   "/"))).getDay();
    var weekday;
    if (number === 0) {
      weekday = '星期日';
    } else if (number === 1) {
      weekday = '星期一';
    } else if (number === 2) {
      weekday = '星期二';
    } else if (number === 3) {
      weekday = '星期三';
    } else if (number === 4) {
      weekday = '星期四';
    } else if (number === 5) {
      weekday = '星期五';
    } else if (number === 6) {
      weekday = '星期六';
    }
    return weekday;
}

Utils.getTime = function(time) {
  var hour = new Date(Date.parse(time.replace(/-/g,   "/"))).getHours();
  return hour;
}

Utils.getLocalTime = function() {
  var date = new Date();
  return date.toLocaleTimeString();
}

Utils.strMapToObj = function(strMap){
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

Utils.mapToJson = function(map) {
  return JSON.stringify(Utils.strMapToObj(map));
}

Utils.objToStrMap = function(obj){
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

Utils.jsonToMap = function(jsonStr){
    return  Utils.objToStrMap(JSON.parse(jsonStr));
}

Utils.parseIntToString = function(num) {
  return num.toString();
}

Utils.parseStringToInt = function(str) {
  return parseInt(str);
}

export default Utils;
