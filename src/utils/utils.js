// 区分 Android 和 iOS
// 示例: platformName(); // 'ios'|'android'|''
export const platformName = (() => {
  let platform = ''
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    platform = 'ios'
  } else if (isAndroid) {
    platform = 'android'
  }
  return platform
})()

// 防抖 | 节流 (多用于搜索页表单延时提交)
// 示例: debounce(val => { console.log(val) }, 1000);
export const debounce = (fn, time = 500) => {
  // 回调函数: Function, 毫秒数: Number
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

// 清洗出 url 中的参数值
// 示例: getQueryString('https://www.google.com?key=val', 'key'); // 'val'
export const getQueryString = (href, key) => {
  // url: String, key: String
  let hrefSearch = href.split('?')[1]
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  let r = hrefSearch.match(reg)
  if (r) {
    return decodeURI(r[2])
  } else {
    return null
  }
}
// rem 值转化为 px 值
// 示例: remToPx(0.1); // 转为对应的 px 值
export const remToPx = rem => {
  // rem值: Number
  if (document.documentElement.style.fontSize) {
    return rem * document.documentElement.style.fontSize.replace('px', '')
  } else {
    return rem * 100
  }
}

// 手机号添加空格
// 示例: getMoblieFormat(18812341234); // '153 1234 1234'
export const getMoblieFormat = val => {
  // 手机号码: Number|String
  let _val = val.toString().replace(/\s*/g, '')
  let result = []
  for (let i = 0; i < _val.length; i++) {
    if (i == 3 || i == 7) {
      result.push(' ' + _val.charAt(i))
    } else {
      result.push(_val.charAt(i))
    }
  }
  return result.join('')
}

/**
 * @description: Echarts 数据处理: 将数组里每个对象的 key 和 value 分开展示
 * @param {Object} data {2020: 100, 2021: 200}
 * @param {Array} keysName 指定对象的 key
 * @return: [{name: 2020, value: 100}, {name: 2021, value: 200}]
 */
export const chartData = (
  data,
  isSort = true,
  keysName = ['name', 'value'],
) => {
  let arr = Object.entries(data)
  let list = arr.map(item => {
    let param = {}
    param[keysName[0]] = item[0]
    param[keysName[1]] = item[1]
    return param
  })
  if (isSort) {
    let sortList = list.sort((a, b) => {
      return a['name'] - b['name']
    })
    return sortList
  } else {
    return list
  }
}

/**
 * @description: 生成唯一标识
 * @return {String}
 */
export const uuid = () => {
  // 标准的UUID格式为：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12)
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * @description: 短横线转驼峰
 * @return {String}
 */
export const kebabCaseToCamelCased = str => {
  const newStr = str.replace(/(-([a-z]))/g, (match, p1, p2, offset, string) => {
    // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
    return p2.toUpperCase()
  })

  return newStr
}

/**
 * @description: 驼峰转短横线
 * @return {String}
 */
export const camelCasedToKebabCase = str => {
  const newStr = str.replace(/([A-Z])/g, (match, p1, offset, string) => {
    // 一个捕获组捕获全部，所以match等于p1
    return '-' + p1.toLowerCase()
  })

  return newStr
}

/**
 * @description: 小驼峰转大驼峰
 * @param {*} str
 * @return {*}
 */
export const camelCasedBigToSmall = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
