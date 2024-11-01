/**
 * @description 渲染标签 支持：2D标签 3D标签 精灵模型
 * @author xu.zhengyou
 * @param {Object} position 标签渲染位置 默认坐标原点
 * @param {String} html dom内容
 */
import { Mesh } from 'three'
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer' // CSS2模型对象CSS2DObject CSS2渲染器CSS2DRenderer
// 引入CSS3渲染器CSS3DRenderer
import {
  CSS3DObject,
  CSS3DSprite,
} from 'three/examples/jsm/renderers/CSS3DRenderer' // CSS3模型对象CSS3DObject CSS3精灵模型

export default class LabelRender {
  constructor(viewer) {
    this.viewer = viewer
  }

  /**
   * 渲染2D标签 标签默认保持自身像素值
   * @param {String} html dom内容
   * @param {String} name 标签名称
   * @param {Object} position 标签渲染位置
   */
  addCss2DLabel(name, html = '', position = { x: 0, y: 0, z: 0 }, fontSize) {
    const div = document.createElement('div')
    div.style.fontSize = fontSize || '14px'
    div.style.color = '#fff'
    div.innerHTML = html
    const css2DLabel = new CSS2DObject(div) // HTML元素转化为threejs的CSS2模型对象
    css2DLabel.name = name
    css2DLabel.position.set(position.x, position.y, position.z)
    const css2Renderer = new CSS2DRenderer(css2DLabel) // 创建一个CSS2渲染器CSS2DRenderer
    css2Renderer.render(this.viewer.scene, this.viewer.camera) // 用法和webgl渲染器渲染方法类似
    // width, height：canvas画布宽高度
    css2Renderer.setSize(
      this.viewer.viewerDom.offsetWidth,
      this.viewer.viewerDom.offsetHeight,
    )
    this.viewer.viewerDom.appendChild(css2Renderer.domElement)
    // 属性设置
    css2Renderer.domElement.style.position = 'absolute'
    css2Renderer.domElement.style.top = '50%'
    css2Renderer.domElement.style.left = '50%'
    css2Renderer.domElement.style.zIndex = 9999
    css2Renderer.domElement.style.pointerEvents = 'none'
    return css2DLabel
  }

  /**
   * 渲染3D标签 标签会跟着场景相机同步缩放
   * @param {String} html dom内容
   * @param {String} name 标签名称
   * @param {Object} position 标签渲染位置
   * @param {String} fontSize 字体大小
   */
  addCss3DLabel(name, html = '', position = { x: 0, y: 0, z: 0 }, fontSize) {
    const mesh = new Mesh()
    const div = document.createElement('div')
    div.style.fontSize = fontSize || '14px'
    div.style.pointerEvents = 'none'
    div.style.color = '#fff'
    div.innerHTML = html
    const css3DLabel = new CSS3DObject(div) // HTML元素转化为threejs的CSS3模型对象
    css3DLabel.name = name
    css3DLabel.position.set(position.x, position.y, position.z)
    mesh.add(css3DLabel) // 标签tag作为mesh子对象，默认标注在模型局部坐标系坐标原点
    this.viewer.scene.add(mesh)
    return css3DLabel
  }

  /**
   * 渲染3D标签 可以跟着场景缩放，位置可以跟着场景旋转，但是自身的姿态角度始终平行于canvas画布
   * @param {String} html dom内容
   * @param {String} name 标签名称
   * @param {Object} position 标签渲染位置
   */
  addCss3DSprite(name, html = '', position = { x: 0, y: 0, z: 0 }, fontSize) {
    const mesh = new Mesh()
    const div = document.createElement('div')
    div.style.fontSize = fontSize || '14px'
    div.style.pointerEvents = 'none'
    div.style.color = '#fff'
    div.innerHTML = html
    const css3DSprite = new CSS3DSprite(div) // HTML元素转化为threejs的CSS3精灵模型`CSS3DSprite`
    css3DSprite.name = name
    css3DSprite.position.set(position.x, position.y, position.z)
    mesh.add(css3DSprite) // 标签tag作为mesh子对象，默认标注在模型局部坐标系坐标原点
    this.viewer.scene.add(mesh)
    return css3DSprite
  }
}
