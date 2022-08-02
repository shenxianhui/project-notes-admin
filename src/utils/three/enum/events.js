/*
 * @Description: 内部事件
 * @Author: shenxh
 * @Date: 2022-08-02 15:32:11
 * @LastEditors: shenxh
 * @LastEditTime: 2022-08-02 15:48:18
 */

const events = {
  /** 鼠标点击 */
  clicked: 'clicked',
  /** 鼠标双击 */
  doubleclick: 'doubleclick',
  /** 鼠标按下 */
  mousedown: 'mousedown',
  /** 鼠标移动 */
  mousemove: 'mousemove',
  /** 鼠标抬起 */
  mouseup: 'mouseup',
  /** 渲染 */
  render: 'render',
  /** 加载完毕 */
  loaded: 'loaded',
  /** 地图初始化完毕 */
  mapInit: 'mapInit',
  /** zoom改变 */
  changeZoom: 'changeZoom',
}

export default events
