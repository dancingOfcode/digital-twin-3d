/**
 * @description 点光源
 * @author xu.zhengyou
 * @param {Object} viewer 视图
 * @param {Array} position 位置
 * @param {Object} option 灯光参数
 */
import * as THREE from 'three'
export default class PointLight {
  constructor(
    viewer,
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' },
  ) {
    const color = new THREE.Color(option.color)
    this.light = new THREE.PointLight(color)
    this.light.castShadow = true
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 10, 10),
      new THREE.MeshBasicMaterial({ color }),
    )
    this.light.add(this.mesh)
    viewer.scene.add(this.light)
    this.setOption(option)
    this.setPosition(position)
  }

  /**
   * 设置灯光参数
   * @param {Object} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 20 // 光线强度
    this.light.distance = option.distance || 200 // 光线距离
    this.light.decay = option.decay || 1 // 光的衰减指数 0.0;//设置光源不随距离衰减
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
