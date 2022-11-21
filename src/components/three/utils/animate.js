/*
 * @Description: Animate 动画
 * @Author: shenxh
 * @Date: 2022-09-22 11:13:37
 * @LastEditors: shenxh
 * @LastEditTime: 2022-11-21 14:32:12
 */

export default that => {
  return {
    /**
     * @description: 初始化
     * @return {*}
     */
    init() {
      this.animate()
    },

    /**
     * @description: 启用动画
     * @return {*}
     */
    animate() {
      that.animationFrame = requestAnimationFrame(this.animate.bind(this))

      this.render()
    },

    /**
     * @description: 渲染
     * @return {*}
     */
    render() {
      that.stats && that.stats.update()
      that.renderer.render(that.scene, that.camera)
      that.css2DRenderer && that.css2DRenderer.render(that.scene, that.camera)
    },
  }
}
