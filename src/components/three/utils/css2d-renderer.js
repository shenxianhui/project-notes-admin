/*
 * @Description: CSS 2D渲染器 （CSS2DRenderer）
 * @Author: shenxh
 * @Date: 2022-11-21 09:37:57
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-30 13:29:44
 */

import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export default that => {
  return {
    /**
     * @description: 创建渲染对象
     * @param {string} label 标签名称
     * @return {*}
     */
    createObject(dom) {
      that.css2DObject = new CSS2DObject(dom)
    },

    /**
     * @description: 设置渲染对象方向
     * @param {number} x x 坐标
     * @param {number} y y 坐标
     * @param {number} z z 坐标
     * @return {*}
     */
    setObjectPosition(x, y, z) {
      that.css2DObject.position.set(x, y, z)
    },

    /**
     * @description: 创建渲染器
     * @param {object} params 参数
     * @return {*}
     */
    createRenderer() {
      that.css2DRenderer = new CSS2DRenderer()
      that.css2DRenderer.setSize(
        that.container.clientWidth,
        that.container.clientHeight,
      )
      that.css2DRenderer.domElement.id = 'label-renderer'
      that.css2DRenderer.domElement.style.position = 'absolute'
      that.css2DRenderer.domElement.style.top = '0px'
      that.container.appendChild(that.css2DRenderer.domElement)
      // that.css2DRenderer.domElement.addEventListener('click', e => {
      //   that.emit('click-label', e)
      // })
      // that.css2DRenderer.domElement.addEventListener('mousemove', e => {
      //   that.emit('mousemove-label', e)
      // })
      // that.css2DRenderer.domElement.addEventListener('mouseout', e => {
      //   that.emit('mouseout-label', e)
      // })
    },
  }
}
