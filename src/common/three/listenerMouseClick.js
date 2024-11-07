/**
 * @description 监听鼠标点击事件 （主要用于调试时获取坐标）
 * @author xu.zhengyou
 * @param {Object} viewer 视图
 */
import { Raycaster } from 'three'
export default class ListenerMouseClick {
  constructor(viewer) {
    this.viewer = viewer
    window.addEventListener('click', this.onMouseClick, false)
    // 监听鼠标点击事件
  }

  onMouseClick = event => {
    const mouse = {}
    // 将鼠标位置转换成归一化设备坐标(-1 到 +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    const raycaster = new Raycaster() // 光线投射类 用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
    // 使用鼠标位置和相机进行射线投射
    raycaster.setFromCamera(mouse, this.viewer.camera)
    // 计算物体和射线的交点
    var intersects = raycaster.intersectObjects(this.viewer.scene.children)
    // 如果存在交点
    if (intersects.length > 0) {
      // 获取第一个交点的位置
      var point = intersects[0].point
      console.log('点击位置的3D坐标:', point)
      return point
    }
  }
}
