/**
 * @description 环境光
 * @author xu.zhengyou
 * @param {Object} viewer 视图
 */
import * as THREE from 'three'

export default class AmbientLight {
  constructor(viewer, option = { color: 0x404040 }) {
    this.light = new THREE.AmbientLight(new THREE.Color(option.color)) // 柔和的白光
    this.setOption(option)
    viewer.scene.add(this.light)
  }

  /**
   * 设置灯光参数
   * @param {Object} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 1 // 光线强度
  }
}
