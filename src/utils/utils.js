// 区分 Android 和 iOS
// 示例: platformName(); // 'ios'|'android'|''
const platformName = () => {
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
const getCurrentDate = () => {
  let myDate = new Date();
  let year = myDate.getFullYear().toString();
  let month =
    myDate.getMonth() < 9 ? `0${myDate.getMonth() + 1}` : (myDate.getMonth() + 1).toString();
  let date = myDate.getDate() < 10 ? `0${myDate.getDate()}` : myDate.getDate().toString();
  let day = myDate.getDay() == 0 ? '7' : myDate.getDay().toString();
  let hour = myDate.getHours() < 10 ? `0${myDate.getHours()}` : myDate.getHours().toString();
  let minute =
    myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes().toString();
  let second =
    myDate.getSeconds() < 10 ? `0${myDate.getSeconds()}` : myDate.getSeconds().toString();
  // 获取当前完整日期
  let dateIntact = `${year}-${month}-${date}`;
  let timeIntact = `${hour}:${minute}:${second}`;
  let dateTime = `${dateIntact} ${timeIntact}`;
  // 获取当月天数
  myDate.setMonth(myDate.getMonth() + 1);
  myDate.setDate(0);
  let dateTotal = myDate.getDate().toString();

  return {
    dateTime, // 当前日期与时间
    dateIntact, // 当前日期
    timeIntact, // 当前时间
    dateTotal, // 当月天数
    year, // 当前完整年份
    month, // 当前月份 (补0)
    date, // 当前日 (补0)
    day, // 当前星期X
    hour, // 当前小时 (补0)
    minute, // 当前分钟 (补0)
    second // 当前秒 (补0)
  };
};

// 日期相互加减
// 示例: DateMinus('2019-11-20 00:00:00', '2019-11-26 00:00:00'); // 6
const DateMinus = (date1, date2, type = 'date') => {
  // 日期(前): String, 日期(后): String, 转换类型(year-年|month-月|date-日|hour-时|minute-分|second-秒|milliseconds-毫秒): String
  let sdate = new Date(date1);
  let now = new Date(date2);
  let curYearDays = getCurrentDate().year % 4 === 0 ? 366 : 365; // 判断平年瑞年

  let _milliseconds = now.getTime() - sdate.getTime();
  let _seconds = parseInt(_milliseconds / 1000, 10);
  let _minutes = parseInt(_seconds / 60, 10);
  let _hours = parseInt(_minutes / 60, 10);
  let _days = parseInt(_hours / 24, 10);
  let _months = parseInt(_days / 30, 10); // 一个月按30天计算
  let _years = parseInt(_days / curYearDays, 10);
  let data;
  switch (type) {
    case 'year':
      data = _years;
      break;
    case 'month':
      data = _months;
      break;
    case 'date':
      data = _days;
      break;
    case 'hour':
      data = _hours;
      break;
    case 'minute':
      data = _minutes;
      break;
    case 'second':
      data = _seconds;
      break;
    case 'milliseconds':
      data = _milliseconds;
      break;
  }

  return data;
};

// 日期计算 (天)
// 示例: computeDate('2019-11-26', -100); // '2019-08-18'
const computeDate = (date, days) => {
  // 日期: String, 天数: Number|String
  let myDate = new Date(date);
  myDate.setDate(myDate.getDate() + Number(days));
  let _year = myDate.getFullYear();
  let _month =
    myDate.getMonth() < 9 ? `0${myDate.getMonth() + 1}` : (myDate.getMonth() + 1).toString();
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

/**
 * @description: 日期格式化
 * @param {String} date 要格式化的时间
 * @param {String} startFormat 初始日期格式 (时间戳用 'timestamp')
 * @param {String} endFormat 结束日期格式 (时间戳用 'timestamp')
 * @return: 格式化后的日期
 */
const formatDate = (date, startFormat = 'timestamp', endFormat = 'yyyy-MM-dd') => {
  // if (typeof date !== 'string') {
  //   console.error('date 必须为字符串');
  //   return;
  // }
  let time = '00:00:00';
  date = String(date).replace(/(^\s+)|(\s+$)/g, ''); // 去除首尾空格

  // 转化前-先将传入日期统一转为 'yyyyMMdd HH:mm:ss' 格式
  // yyyyMMdd
  if (startFormat.slice(0, 8) === 'yyyyMMdd') {
    // 不做处理
  }
  // yyyy-MM-dd
  if (startFormat.slice(0, 10) === 'yyyy-MM-dd') {
    date = date.replace(/-/g, '');
  }
  // yyyy/MM/dd
  if (startFormat.slice(0, 10) === 'yyyy/MM/dd') {
    date = date.replace(/\//g, '');
  }
  // yyyy.MM.dd
  if (startFormat.slice(0, 10) === 'yyyy.MM.dd') {
    date = date.replace(/\./g, '');
  }
  // yyyy年MM月dd日
  if (startFormat.slice(0, 11) === 'yyyy年MM月dd日') {
    date = `${date.slice(0, 4)}${date.slice(5, 7)}${date.slice(8, 10)}`;
  }
  // 时间戳 timestamp
  if (startFormat === 'timestamp') {
    let _date = new Date(Number(date)),
      Y = _date.getFullYear(),
      M = _date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : _date.getMonth() + 1,
      D = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate(),
      h = _date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours(),
      m = _date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes(),
      s = _date.getSeconds() < 10 ? '0' + _date.getSeconds() : _date.getSeconds();

    // return Y + M + D + h + m + s;
    date = `${Y}${M}${D}`;
    time = `${h}:${m}:${s}`;
  }

  // 转化后-将 'yyyyMMdd' 格式的日期转为需要的格式
  // yyyyMMdd
  if (endFormat.slice(0, 8) === 'yyyyMMdd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}${date.slice(4, 6)}${date.slice(6, 8)} ${time}`;
    } else {
      date = `${date.slice(0, 4)}${date.slice(4, 6)}${date.slice(6, 8)}`;
    }
  }
  // yyyy-MM-dd
  if (endFormat.slice(0, 10) === 'yyyy-MM-dd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${time}`;
    } else {
      date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
    }
  }
  // yyyy/MM/dd
  if (endFormat.slice(0, 10) === 'yyyy/MM/dd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)} ${time}`;
    } else {
      date = `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`;
    }
  }
  // yyyy.MM.dd
  if (endFormat.slice(0, 10) === 'yyyy.MM.dd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)} ${time}`;
    } else {
      date = `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
    }
  }
  // yyyy年MM月dd日
  if (endFormat.slice(0, 11) === 'yyyy年MM月dd日') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(6, 8)}日 ${time}`;
    } else {
      date = `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(6, 8)}日`;
    }
  }
  // 时间戳 timestamp
  if (endFormat === 'timestamp') {
    let _date = new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${time}`);

    // 有四种方式获取
    date = _date.getTime(); // 通过原型方法直接获得当前时间的毫秒值
    // date = date.valueOf(); // 返回指定对象的原始值获得准确的时间戳值
    // date = Number(date); // 将时间转化为一个number类型的数值，即时间戳
    // date = Date.parse(date); // 不推荐这种办法，毫秒级别的数值被转化为000
  }

  return date;
};

/**
 * 把2019-05-19 10:00  2019-05-19 15:00  换算成2019-05-19 10:00-15:00
 * @param {String} startTime  2019-05-19 10:00
 * @param {String} endTime  2019-05-19 15:00
 */
const getRangeTime = (startTime, endTime) => {
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
let debounce = (fn, time = 500) => {
  // 回调函数: Function, 毫秒数: Number
  let timer;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
};

// 清洗出 url 中的参数值
// 示例: getQueryString('https://www.google.com?key=val', 'key'); // 'val'
const getQueryString = (href, key) => {
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
const calculateLineDistance = (start, end) => {
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
const remToPx = rem => {
  // rem值: Number
  if (document.documentElement.style.fontSize) {
    return rem * document.documentElement.style.fontSize.replace('px', '');
  } else {
    return rem * 100;
  }
};

// 手机号添加空格
// 示例: getMoblieFormat(18812341234); // '153 1234 1234'
const getMoblieFormat = val => {
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

/**
 * @description: Echarts 数据处理: 将数组里每个对象的 key 和 value 分开展示
 * @param {Object} data {2020: 100, 2021: 200}
 * @param {Array} keysName 指定对象的 key
 * @return: [{name: 2020, value: 100}, {name: 2021, value: 200}]
 */
const chartData = (data, isSort = true, keysName = ['name', 'value']) => {
  let arr = Object.entries(data);
  let list = arr.map(item => {
    let param = {};
    param[keysName[0]] = item[0];
    param[keysName[1]] = item[1];
    return param;
  });
  if (isSort) {
    let sortList = list.sort((a, b) => {
      return a['name'] - b['name'];
    });
    return sortList;
  } else {
    return list;
  }
};

export {
  platformName,
  getCurrentDate,
  DateMinus,
  computeDate,
  getAWeek,
  formatDate,
  getRangeTime,
  debounce,
  getQueryString,
  calculateLineDistance,
  remToPx,
  getMoblieFormat,
  chartData
};
