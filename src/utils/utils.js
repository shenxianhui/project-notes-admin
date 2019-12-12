// 区分 Android 和 iOS
// 示例: platformName(); // 'ios'|'android'|''
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
// 示例: getCurrentDate(); // { key: val, ... }
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
  let timeIntact = `${hour}:${minute}:${seconds}`;
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
// 示例: DateMinus('2019-11-20', '2019-11-26'); // 6
let DateMinus = (date1, date2) => {
  // 日期(前): String, 日期(后): String
  let sdate = new Date(date1);
  let now = new Date(date2);
  let days = now.getTime() - sdate.getTime();
  let _days = parseInt(days / (1000 * 60 * 60 * 24), 10);

  return _days;
};

// 日期计算 (天)
// 示例: computeDate('2019-11-26', -100); // '2019-08-18'
let computeDate = (date, days) => {
  // 日期: String, 天数: Number|String
  let myDate = new Date(date);
  myDate.setDate(myDate.getDate() + Number(days));
  let _year = myDate.getFullYear();
  let _month = myDate.getMonth() < 9 ? `0${myDate.getMonth() + 1}` : (myDate.getMonth() + 1).toString();
  let _date = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate().toString();
  let day = `${_year}-${_month}-${_date}`;

  return day;
};

// 获取过去/未来X天的日期 (含当天)
// 示例: getAWeek(-2); // ['2019-11-25', '2019-11-26']
let getAWeek = days => {
  // 天数: Number|String
  let timestamp = new Date().getTime();
  let blanking = 24 * 60 * 60 * 1000;
  let dateArr = [];
  let _days = Number(days);
  if (_days >= 0) {
    // 未来X天 (含当天)
    while (_days--) {
      let dateNew = new Date(timestamp);
      let y = dateNew.getFullYear();
      let m = dateNew.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = dateNew.getDate();
      d = d < 10 ? '0' + d : d;
      dateArr.push(y + '-' + m + '-' + d);
      timestamp += blanking;
    }
  } else {
    // 过去X天 (含当天)
    while (_days++) {
      let dateNew = new Date(timestamp);
      let y = dateNew.getFullYear();
      let m = dateNew.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = dateNew.getDate();
      d = d < 10 ? '0' + d : d;
      dateArr.unshift(y + '-' + m + '-' + d);
      timestamp -= blanking;
    }
  }
  return dateArr;
};

// 日期格式化
// 示例: formatDate('2019/11/26 11:12:13'); // '2019-11-26 11:12:13'
let formatDate = (date, isTime = false) => {
  // 日期: String, 是否包含时间: Boolean (默认false)
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
  let se = dateNew.getSeconds();
  se = se < 10 ? '0' + se : se;
  let _date;
  if (isTime) {
    _date = y + '.' + m + '.' + d + ' ' + h + ':' + mi + ':' + se;
  } else {
    _date = y + '-' + m + '-' + d;
  }
  return _date;
};

// 时间戳转日期
// 示例: timestampToTime(1574756312123); // '2019-11-26 16:18:32'
let timestampToTime = timestamp => {
  // 时间戳: Number|String
  let date = new Date(Number(timestamp)),
    Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ',
    h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':',
    m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':',
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return Y + M + D + h + m + s;
};

// 日期转时间戳
// 示例: timeToTimestamp('2019-11-26 16:18:32:123'); // 1574756312123
let timeToTimestamp = time => {
  // 日期: String
  let date = new Date(time);
  // 有四种方式获取
  let _time = date.getTime(); // 通过原型方法直接获得当前时间的毫秒值
  // let _time = date.valueOf(); // 返回指定对象的原始值获得准确的时间戳值
  // let _time = Number(date); // 将时间转化为一个number类型的数值，即时间戳
  // let _time = Date.parse(date); // 不推荐这种办法，毫秒级别的数值被转化为000

  return _time;
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

// 防抖 | 节流 (多用于搜索页表单延时提交)
// 示例: debounce(val => { console.log(val) }, 1000);
let debounce = (func, delay = 500) => {
  // 回调函数: Function, 毫秒数: Number
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

// 清洗出 url 中的参数值
// 示例: getQueryString('https://www.google.com?key=val', 'key'); // 'val'
let getQueryString = (href, key) => {
  // url: String, key: String
  let hrefSearch = href.split('?')[1];
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  let r = hrefSearch.match(reg);
  if (r) {
    return decodeURI(r[2]);
  } else {
    return null;
  }
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

// rem 值转化为 px 值
// 示例: remToPx(0.1); // 转为对应的 px 值
let remToPx = rem => {
  // rem值: Number
  if (document.documentElement.style.fontSize) {
    return rem * document.documentElement.style.fontSize.replace('px', '');
  } else {
    return rem * 100;
  }
};

// 手机号添加空格
// 示例: getMoblieFormat(18812341234); // '153 1234 1234'
let getMoblieFormat = val => {
  // 手机号码: Number|String
  let _val = val.toString().replace(/\s*/g, '');
  let result = [];
  for (let i = 0; i < _val.length; i++) {
    if (i == 3 || i == 7) {
      result.push(' ' + _val.charAt(i));
    } else {
      result.push(_val.charAt(i));
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
  timestampToTime,
  timeToTimestamp,
  getRangeTime,
  debounce,
  getQueryString,
  calculateLineDistance,
  remToPx,
  getMoblieFormat
};
