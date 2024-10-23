/**
 * @description 创建光源 包括：聚光光源 点光源 环境光光源 平面光光源 平行光光源
 * @author xu.zhengyou
 * @param {Object} viewer 视图
 * @param {Array} position 位置
 * @param {Object} option 灯光参数
 */
import SpotLight from './spotLight'
import PointLight from './pointLight'
import AmbientLight from './ambientLight'
import RectAreaLight from './rectAreaLight'
import DirectionalLight from './directionalLight'
export default class Lights {
  constructor(viewer) {
    this.viewer = viewer
    this.lightList = []
  }

  /**
   * 添加聚光光源
   * @param {Array} position
   * @param {Object} option
   * @param {String} color
   * @returns {Object} 光源
   */
  addSpotLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new SpotLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }

  /**
   * 添加点状光源
   * @param {Array} position
   * @param {Object} option
   * @param {String} color
   * @returns {Object} 光源
   */
  addPointLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new PointLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }

  /**
   * 添加环境光源
   * @returns {Object} 光源
   */
  addAmbientLight() {
    const ambientLight = new AmbientLight(this.viewer)
    this.lightList.push(ambientLight)
    return ambientLight
  }

  /**
   * 添加平面光光源
   * @param {Array} position
   * @param {Object} option
   * @param {String} color
   * @returns {Object} 光源
   */
  addRectAreaLight(
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' },
  ) {
    const rectAreaLight = new RectAreaLight(this.viewer, position, option)
    this.lightList.push(rectAreaLight)
    return rectAreaLight
  }

  /**
   * 添加平行光光源
   * @param {Array} position
   * @param {Object} option
   * @param {String} color
   * @returns {Object} 光源
   */
  addDirectionalLight(
    position = [200, 200, 200],
    option = { color: 'rgb(255,255,255)' },
  ) {
    const directionalLight = new DirectionalLight(this.viewer, position, option)
    this.lightList.push(directionalLight)
    return directionalLight
  }

  /**
   * 移除灯光
   * @param {Object} light 灯光
   * @returns {Object} 光源
   */
  removeLight(light) {
    this.viewer.scene.remove(light)
  }
}
