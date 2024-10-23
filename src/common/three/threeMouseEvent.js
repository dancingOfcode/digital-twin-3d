/**
 * @description 鼠标事件封装
 * @author xu.zhengyou
 * @param {Object} viewer 视图容器
 * @param {Function} succCallback  成功回调函数
 * @param {Function} failCallback  失败回调函数
 * @param {String} type 鼠标事件类型
 * @returns
 */
import * as THREE from 'three'

export default class ThreeMouseEvent {
  constructor(viewer, succCallback, failCallback, type = 'click') {
    this.type = type
    this.viewer = viewer
    this.bingEvent = undefined
    this.succCallback = succCallback
    this.failCallback = failCallback
    return this
  }

  /**
   * 触发选中监听
   */
  start() {
    this.stop()
    this.bingEvent = this.$event.bind(this, this)
    this.viewer.renderer.domElement.addEventListener(this.type, this.bingEvent)
  }

  /**
   * 停止选中监听
   */
  stop() {
    this.viewer.renderer.domElement.removeEventListener(
      this.type,
      this.bingEvent,
    )
  }

  /**
   * 鼠标事件处理
   */
  $event(that, event) {
    const raycaster = new THREE.Raycaster() // 创建射线
    const mouse = new THREE.Vector2() // 创建鼠标坐标
    const { clientWidth } = that.viewer.renderer.domElement
    const { clientHeight } = that.viewer.renderer.domElement
    // offsetX、offsetY坐标转化为标准设备坐标 范围：[-1,1]
    mouse.x = (event.offsetX / clientWidth) * 2 - 1
    mouse.y = -(event.offsetY / clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, that.viewer.camera) // 设置射线的起点和终点 即创建一条射线
    // TODO: 第一个参数是否需要外部传入，减小监听范围
    const intersects = raycaster.intersectObject(that.viewer.scene, true) // 检测射线与模型是否相交
    if (intersects.length > 0 && intersects[0]) {
      that.succCallback(intersects[0].object, intersects[0].point) // 返回模型对象及交叉点
    } else {
      that.failCallback()
    }
  }
}
