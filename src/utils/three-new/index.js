/*
 * @Description: three 封装
 * @Author: shenxh
 * @Date: 2022-08-03 14:14:01
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-06 11:43:45
 */

const context = require.context('.', true, /\.js$/)

let modules = {}

context.keys().forEach(key => {
  if (key === './index.js') return

  const obj = context(key).default

  Object.assign(modules, obj)
})

export default modules
