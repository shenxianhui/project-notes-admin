/*
 * @Description: Animate 动画
 * @Author: shenxh
 * @Date: 2022-09-22 11:13:37
 * @LastEditors: shenxh
 * @LastEditTime: 2022-09-23 15:50:44
 */

export default {
  /**
   * @description: 初始化
   * @return {*}
   */
  initAnimate() {
    this.animate();
  },

  /**
   * @description: 启用动画
   * @return {*}
   */
  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));

    this.render();
  },

  /**
   * @description: 渲染
   * @return {*}
   */
  render() {
    this.stats && this.stats.update();
    this.renderer.render(this.scene, this.camera);
  },
};
