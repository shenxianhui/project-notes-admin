// 获取当前日期详细信息
// 示例: getCurrentDate(); // { key: val, ... }
const getCurrentDate = (() => {
  let myDate = new Date();
  let year = myDate.getFullYear().toString();
  let month =
    myDate.getMonth() < 9
      ? `0${myDate.getMonth() + 1}`
      : (myDate.getMonth() + 1).toString();
  let date =
    myDate.getDate() < 10
      ? `0${myDate.getDate()}`
      : myDate.getDate().toString();
  let day = myDate.getDay() == 0 ? '7' : myDate.getDay().toString();
  let hour =
    myDate.getHours() < 10
      ? `0${myDate.getHours()}`
      : myDate.getHours().toString();
  let minute =
    myDate.getMinutes() < 10
      ? `0${myDate.getMinutes()}`
      : myDate.getMinutes().toString();
  let second =
    myDate.getSeconds() < 10
      ? `0${myDate.getSeconds()}`
      : myDate.getSeconds().toString();
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
})();

// 日期相互加减
// 示例: dateInterval('2019-11-20 00:00:00', '2019-11-26 00:00:00'); // 6
const dateInterval = (date1, date2, type = 'date') => {
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
    myDate.getMonth() < 9
      ? `0${myDate.getMonth() + 1}`
      : (myDate.getMonth() + 1).toString();
  let _date =
    myDate.getDate() < 10
      ? `0${myDate.getDate()}`
      : myDate.getDate().toString();
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
const formatDate = (
  date,
  startFormat = 'timestamp',
  endFormat = 'yyyy-MM-dd'
) => {
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
      M =
        _date.getMonth() + 1 < 10
          ? '0' + (_date.getMonth() + 1)
          : _date.getMonth() + 1,
      D = _date.getDate() < 10 ? '0' + _date.getDate() : _date.getDate(),
      h = _date.getHours() < 10 ? '0' + _date.getHours() : _date.getHours(),
      m =
        _date.getMinutes() < 10 ? '0' + _date.getMinutes() : _date.getMinutes(),
      s =
        _date.getSeconds() < 10 ? '0' + _date.getSeconds() : _date.getSeconds();

    // return Y + M + D + h + m + s;
    date = `${Y}${M}${D}`;
    time = `${h}:${m}:${s}`;
  }

  // 转化后-将 'yyyyMMdd' 格式的日期转为需要的格式
  // yyyyMMdd
  if (endFormat.slice(0, 8) === 'yyyyMMdd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}${date.slice(4, 6)}${date.slice(
        6,
        8
      )} ${time}`;
    } else {
      date = `${date.slice(0, 4)}${date.slice(4, 6)}${date.slice(6, 8)}`;
    }
  }
  // yyyy-MM-dd
  if (endFormat.slice(0, 10) === 'yyyy-MM-dd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
        6,
        8
      )} ${time}`;
    } else {
      date = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
    }
  }
  // yyyy/MM/dd
  if (endFormat.slice(0, 10) === 'yyyy/MM/dd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(
        6,
        8
      )} ${time}`;
    } else {
      date = `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)}`;
    }
  }
  // yyyy.MM.dd
  if (endFormat.slice(0, 10) === 'yyyy.MM.dd') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(
        6,
        8
      )} ${time}`;
    } else {
      date = `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}`;
    }
  }
  // yyyy年MM月dd日
  if (endFormat.slice(0, 11) === 'yyyy年MM月dd日') {
    if (endFormat.includes(':')) {
      date = `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(
        6,
        8
      )}日 ${time}`;
    } else {
      date = `${date.slice(0, 4)}年${date.slice(4, 6)}月${date.slice(6, 8)}日`;
    }
  }
  // 时间戳 timestamp
  if (endFormat === 'timestamp') {
    let _date = new Date(
      `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${time}`
    );

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

export {
  getCurrentDate,
  dateInterval,
  computeDate,
  getAWeek,
  formatDate,
  getRangeTime
};
