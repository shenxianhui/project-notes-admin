/*
 * @Descripttion:
 * @version:
 * @Author: heliping
 * @Date: 2022-02-22 14:13:51
 * @LastEditors: heliping
 * @LastEditTime: 2022-02-22 14:14:07
 */
/**
 * 内部事件
 * @enum {string} events
 * @description Container 内部产生的事件
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
	/** 返回工艺图信息给外部 */
	getDiagram: 'getDiagram',
}

export default events
