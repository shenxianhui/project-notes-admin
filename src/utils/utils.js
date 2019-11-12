// 区分 Android 和 iOS
let platformName = () => {
  let platform = '';
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isiOS) {
    platform = 'ios';
  } else if (isAndroid) {
    platform = 'android';
  }
  return platform;
};

// 获取当前日期详细信息
let getCurrentDate = () => {
  let myDate = new Date();
  let year = myDate.getFullYear().toString();
  let month = myDate.getMonth() < 9 ? `0${myDate.getMonth() + 1}` : (myDate.getMonth() + 1).toString();
  let date = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate().toString();
  let day = myDate.getDay() == 0 ? '7' : myDate.getDay().toString();
  let hour = myDate.getHours() < 10 ? `0${myDate.getHours()}` : myDate.getHours().toString();
  let minute = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes().toString();
  let seconds = myDate.getSeconds() < 10 ? `0${myDate.getSeconds()}` : myDate.getSeconds().toString();
  // 获取当前完整日期
  let dateIntact = `${year}-${month}-${date}`;
  let timeIntact = `${hour}:${minute}`;
  let dateTime = `${dateIntact} ${timeIntact}`;
  // 获取当月天数
  myDate.setMonth(myDate.getMonth() + 1);
  myDate.setDate(0);
  let dateTotal = myDate.getDate().toString();

  return {
    year: year, // 当前完整年份
    month: month, // 当前月份 (补0)
    date: date, // 当前日 (补0)
    day: day, // 当前星期X
    hour: hour, // 当前小时 (补0)
    seconds: seconds, // 当前秒 (补0)
    minute: minute, // 当前分钟 (补0)
    dateIntact: dateIntact, // 当前日期
    timeIntact: timeIntact, // 当前时间
    dateTime: dateTime, // 当前日期与时间
    dateTotal: dateTotal // 当月天数
  };
};

// 日期相互加减
let DateMinus = (date1, date2) => {
  // date1: 小日期(String), date2: 大日期(String)
  let sdate = new Date(date1);
  let now = new Date(date2);
  let days = now.getTime() - sdate.getTime();
  let day = parseInt(days / (1000 * 60 * 60 * 24), 10);
  return day;
};

// 日期计算 (天)
let computeDate = (date, days) => {
  // date: 日期(String), days: 加减的天数(Number)
  let myDate = new Date(date);
  myDate.setDate(myDate.getDate() + days);
  let _year = myDate.getFullYear();
  let _month = myDate.getMonth() < 9 ? `0${myDate.getMonth() + 1}` : (myDate.getMonth() + 1).toString();
  let _date = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate().toString();
  return `${_year}-${_month}-${_date}`;
};

// 获取今天后一周日期
let getAWeek = () => {
  let timestamp = new Date().getTime();
  let blanking = 24 * 60 * 60 * 1000;
  let dateArr = [];
  let count = 8;
  while (count--) {
    let dateNew = new Date(timestamp);
    let y = dateNew.getFullYear();
    let m = dateNew.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = dateNew.getDate();
    d = d < 10 ? '0' + d : d;
    dateArr.push(y + '/' + m + '/' + d);
    timestamp += blanking;
  }
  return dateArr;
};

// 日期格式化
let formatDate = date => {
  // 日期转化成字符串兼容ios
  let dateNew = new Date(String(date).replace(/-/g, '/'));
  let y = dateNew.getFullYear();
  let m = dateNew.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = dateNew.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
};

// 日期时间格式化
let formatDateTime = date => {
  // 日期转化成字符串兼容ios
  let dateNew = new Date(String(date).replace(/-/g, '/'));
  let y = dateNew.getFullYear();
  let m = dateNew.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = dateNew.getDate();
  d = d < 10 ? '0' + d : d;
  let h = dateNew.getHours();
  h = h < 10 ? '0' + h : h;
  let mi = dateNew.getMinutes();
  mi = mi < 10 ? '0' + mi : mi;
  return y + '.' + m + '.' + d + ' ' + h + ':' + mi;
};

// 防抖 | 节流
let debounce = (func, delay) => {
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 清洗出url中的参数值
let getQueryString = (href, name) => {
  let hrefSearch = href.split('?')[1];
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let r = hrefSearch.match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
};

/**
 * 把2019-05-19 10:00  2019-05-19 15:00  换算成2019-05-19 10:00-15:00
 * @param {String} startTime  2019-05-19 10:00
 * @param {String} endTime  2019-05-19 15:00
 */
let getRangeTime = (startTime, endTime) => {
  let tmpStart = startTime.split(' ');
  let tmpEnd = endTime.split(' ');
  if (tmpStart.length < 2 || tmpEnd.length < 2) {
    return '';
  }
  let date = tmpStart[0];
  return `${date} ${tmpStart[1]}-${tmpEnd[1]}`;
};

/**
 * 计算两个定位点间的直线距离
 * @param {Object} start  {longitude: 123, latitude: 80}
 * @param {Object} end  {longitude: 123, latitude: 80}
 * @return {} 单位 米
 */
let calculateLineDistance = (start, end) => {
  let d1 = 0.01745329251994329;
  let d2 = start.longitude;
  let d3 = start.latitude;
  let d4 = end.longitude;
  let d5 = end.latitude;
  d2 *= d1;
  d3 *= d1;
  d4 *= d1;
  d5 *= d1;
  let d6 = Math.sin(d2);
  let d7 = Math.sin(d3);
  let d8 = Math.cos(d2);
  let d9 = Math.cos(d3);
  let d10 = Math.sin(d4);
  let d11 = Math.sin(d5);
  let d12 = Math.cos(d4);
  let d13 = Math.cos(d5);
  let arrayOfDouble1 = [];
  let arrayOfDouble2 = [];
  arrayOfDouble1.push(d9 * d8);
  arrayOfDouble1.push(d9 * d6);
  arrayOfDouble1.push(d7);
  arrayOfDouble2.push(d13 * d12);
  arrayOfDouble2.push(d13 * d10);
  arrayOfDouble2.push(d11);
  let d14 = Math.sqrt(
    (arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
      (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
      (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2])
  );

  return Math.asin(d14 / 2.0) * 12742001.579854401;
};

// rem值转化为px值
let rem2px = rem => {
  if (document.documentElement.style.fontSize) {
    return rem * document.documentElement.style.fontSize.replace('px', '');
  } else {
    return rem * 100;
  }
};

// 手机号添加空格
let getMoblieFormat = val => {
  val = val.replace(/\s*/g, '');
  let result = [];
  for (let i = 0; i < val.length; i++) {
    if (i == 3 || i == 7) {
      result.push(' ' + val.charAt(i));
    } else {
      result.push(val.charAt(i));
    }
  }
  return result.join('');
};

export {
  platformName,
  getCurrentDate,
  DateMinus,
  computeDate,
  getAWeek,
  formatDate,
  formatDateTime,
  debounce,
  getQueryString,
  getRangeTime,
  calculateLineDistance,
  rem2px,
  getMoblieFormat
};
