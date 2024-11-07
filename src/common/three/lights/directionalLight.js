/**
 * @description 平行光
 * @author xu.zhengyou
 * @param {Object} viewer 视图
 * @param {Array} position 位置
 * @param {Object} option 灯光参数
 */
import * as THREE from 'three'
export default class DirectionalLight {
  constructor(
    viewer,
    position = [200, 200, 200],
    option = { color: 'rgb(255,255,255)' },
  ) {
    this.light = new THREE.DirectionalLight(new THREE.Color(option.color))
    this.setOption(option)
    this.setPosition(position)
    viewer.scene.add(this.light)
  }

  /**
   * 设置灯光参数
   * @param {Object} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 2 // 光线强度
    this.light.castShadow = option.castShadow || true // 是否有阴影
    // 阴影像素
    this.light.shadow.mapSize.set(
      option.mapSize || 2048,
      option.mapSize || 2048,
    )
    // 阴影范围
    const d = 80
    this.light.shadow.camera.left = -d
    this.light.shadow.camera.right = d
    this.light.shadow.camera.top = d
    this.light.shadow.camera.bottom = -d
    this.light.shadow.bias = -0.0005 // 解决条纹阴影的出现
    // 最大可视距和最小可视距
    this.light.shadow.camera.near = 0.01
    this.light.shadow.camera.far = 2000
  }

  /**
   * 设置灯光位置
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  setPosition([x, y, z]) {
    if (this.light) this.light.position.set(x || 0, y || 0, z || 0)
  }
}
