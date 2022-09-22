/*
 * @Description: three 封装
 * @Author: shenxh
 * @Date: 2022-08-03 14:14:01
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-19 16:10:21
 */

import Events from 'events';
const context = require.context('.', true, /\.js$/);

class Three extends Events {
  constructor(id, config) {
    super();

    this.initThree(id);
  }

  initThree(id) {
    this.container = document.getElementById(id);
  }
}

context.keys().forEach(key => {
  if (key === './index.js') return;

  const obj = context(key).default;

  Object.assign(Three.prototype, obj);
});

export default Three;
