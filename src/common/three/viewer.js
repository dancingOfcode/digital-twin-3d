/**
 * @description 视图组件集成
 * @author xu.zhengyou
 * @param {String} id canvas容器id
 */
import {
  Scene,
  WebGLRenderer,
  TextureLoader,
  RepeatWrapping,
  SRGBColorSpace,
  PerspectiveCamera,
  AxesHelper,
  Vector2,
  Cache,
  Color,
} from 'three'
import { Tween, Easing } from '@tweenjs/tween.js'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer' // 三维标签渲染器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // 轨道控制器扩展库
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js' // 后处理器
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js' // 渲染器通道RenderPass
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js' // OutlinePass通道
import Stats from 'three/examples/jsm/libs/stats.module' // 性能监视器
import ThreeMouseEvent from './threeMouseEvent' // 鼠标事件
import Lights from './lights' // 灯光
export default class Viewer {
  constructor(id) {
    this.id = id
    Cache.enabled = true // 开启缓存
    this.scene = undefined
    this.camera = undefined
    this.lights = undefined
    this.stats = undefined
    this.texture = undefined
    this.statsObj = undefined
    this.controls = undefined
    this.renderer = undefined
    this.composer = undefined
    this.mouseEvent = undefined
    this.css3DRenderer = undefined
    this.animateEventList = []
    this.tweenAnimateList = []
    this.textureList = []
    this.initViewer()
  }

  // 初始化three.js
  initViewer() {
    this.initRender()
    this.initScene()
    this.initLight()
    this.initCamera()
    this.initControl()

    // 使用HTML5的API请求动画帧 window.requestAnimationFrame 实现高性能动画渲染
    const animate = () => {
      this.updateDom()
      this.renderDom()
      window.requestAnimationFrame(animate)
      // 全局的公共动画函数，添加函数可同步执行
      this.animateEventList.forEach(event => {
        event.fun && event.content && event.fun(event.content)
      })
    }
    animate()
  }

  /**
   * 渲染视图
   */
  initRender() {
    this.viewerDom = document.getElementById(this.id)
    const offsetWidth = this.viewerDom.offsetWidth
    const offsetHeight = this.viewerDom.offsetHeight
    // 初始化WebGLRenderer
    this.renderer = new WebGLRenderer({
      antialias: true, // true/false表示是否开启抗锯齿
      alpha: true, // true/false 表示是否可以设置背景色透明
      precision: 'highp', // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
    })
    // 设置 canvas 画布宽高
    this.renderer.setSize(offsetWidth, offsetHeight)
    this.renderer.setClearColor(0x444444, 1) // 设置背景颜色
    this.renderer.setPixelRatio(window.devicePixelRatio) // 设备像素比与设备一致以避免渲染迷糊问题
    this.renderer.clearDepth() // 设置深度缓冲区 logarithmicDepthBuffer: true, true/false 表示是否使用对数深度缓冲，true性能不好
    this.renderer.shadowMap.enabled = true // 场景中的阴影自动更新
    this.viewerDom.appendChild(this.renderer.domElement) // 将渲染器添加到画布中

    // CSS3渲染器
    this.css3DRenderer = new CSS3DRenderer()
    this.css3DRenderer.domElement.style.position = 'absolute'
    this.css3DRenderer.domElement.style.zIndex = 0
    this.css3DRenderer.domElement.style.top = '0px'
    this.css3DRenderer.domElement.style.left = '0px'
    this.css3DRenderer.domElement.style.pointerEvents = 'none'
    this.viewerDom.appendChild(this.css3DRenderer.domElement)
  }

  /**
   * 更新DOM
   */
  updateDom() {
    // 动态获取canvas画布宽高
    const width = this.viewerDom.clientWidth
    const height = this.viewerDom.clientHeight
    // 更新
    this.controls.update()
    this.camera.aspect = window.innerWidth / window.innerHeight // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
    this.camera.updateProjectionMatrix() // 更新摄像机投影矩阵 在任何参数被改变以后必须被调用,来使得这些改变生效
    this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置渲染器的尺寸
    this.css3DRenderer.setSize(width, height) // 设置标签渲染器的尺寸
  }

  /**
   * 与 requestAnimationFrame 动画帧联动渲染
   */
  renderDom() {
    this.renderer.render(this.scene, this.camera) // 渲染场景
    this.css3DRenderer.render(this.scene, this.camera) // 渲染3D标签场景
    // 后处理效果
    if (this.composer) {
      this.composer.render()
    }
    // tweens 动画
    if (this.tweenAnimateList.length) {
      this.tweenAnimateList.map(obj => obj.tween.update())
    }
    // uv纹理动画
    if (this.textureList.length) {
      this.textureList.map(
        // 设置纹理动画：偏移量根据纹理和动画需要，设置合适的值
        obj => obj.uvOffset && (obj.texture.offset.x += obj.uvOffset),
      )
    }
  }

  /**
   * 渲染场景
   */
  initScene() {
    this.scene = new Scene()
    this.scene.background = new Color('rgb(5,24,38)')
  }

  /**
   * 渲染相机
   */
  initCamera() {
    // 透视投影相机
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000,
    )
    // 相机位置
    this.camera.position.set(550, 400, 550)
    // 相机观看方向 坐标原点
    this.camera.lookAt(0, 0, 0)
  }

  /**
   * 添加灯光
   */
  initLight() {
    if (!this.lights) {
      this.lights = new Lights(this)
    }
  }

  /**
   * 渲染控制器
   */
  initControl() {
    if (!this.renderer?.domElement) return
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = false // 关闭阻尼
    this.controls.screenSpacePanning = false // 平移的时候摄像机的位置将在与摄像机向上方向垂直的平面中平移
  }

  /**
   * 辅助观察坐标系
   */
  addAxesHelper() {
    this.scene.add(new AxesHelper(100))
  }

  /**
   * 性能监视器
   */
  addStats() {
    this.stats = new Stats()
    this.statsObj = {
      fun: this.updateStatus,
      content: this.stats,
    }
    this.stats.dom.style.top = '60px'
    this.viewerDom.appendChild(this.stats.dom) // stats.dom:web页面上输出计算结果,一个div元素
    this.addAnimate(this.statsObj)
  }

  /**
   * 移除性能监视器
   */
  removeStats() {
    if (this.stats && this.statsObj) {
      this.viewerDom.removeChild(this.stats.dom)
      this.removeAnimate(this.statsObj)
    }
  }

  /**
   * 更新性能监视器
   */
  updateStatus(stats) {
    stats.update()
  }

  /**
   * 添加全局的动画事件
   * @param {Object} animate 函数加参数对象：{ fun: 函数名称, content: 函数参数 }
   */
  addAnimate(animate) {
    this.animateEventList.push(animate)
  }

  /**
   * 移除全局的动画事件
   * @param {Object} animate  Object 函数加参数对象：{ fun: 函数名称, content: 函数参数 }
   */
  removeAnimate(animate) {
    this.animateEventList.map((val, i) => {
      if (val === animate) {
        this.animateEventList.splice(i, 1)
      }
    })
  }

  /**
   * 添加TWEEN.js动画
   * @param {String} tweenKey 动画唯一标识，用于tweenAnimateList移出动画
   * @param {Object} coords 动画初始状态
   * @param {Object} end 动画终点状态
   * @param {Number} time 动画耗时
   * @param {Number} delay 延时执行
   * @param {Function} updateCallBack 动画更新回调
   */
  addTweenAnimate = (
    tweenKey,
    coords = { x: 0, y: 0, z: 0 },
    end = { x: 0, y: 0, z: 0 },
    time,
    delay = 0,
    updateCallBack,
  ) => {
    let tweenAnimate = new Tween(coords, false) // Create a new tween that modifies 'coords'.
      .to(end, time)
      .easing(Easing.Quadratic.InOut)
      .delay(delay)
      .onUpdate(() => {
        if (typeof updateCallBack === 'function') {
          updateCallBack()
        }
      })
    this.tweenAnimateList.push({
      tweenKey,
      tween: tweenAnimate,
    })
    return tweenAnimate
  }

  /**
   * 移除TWEEN.js动画
   * @param {String} tweenKeys TWEEN.js动画唯一标识
   */
  removeTweenAnimate(tweenKeys = []) {
    this.tweenAnimateList = this.tweenAnimateList.filter(
      item => !tweenKeys.includes(item.tweenKey),
    )
  }

  /**
   * 开启鼠标事件
   * @param {String} mouseType 鼠标类型
   * @param {Function} succCallback 选中成功回调
   * @param {Function} failCallback 选中成功回调
   */
  startMouseEvent(mouseType, succCallback, failCallback) {
    if (!this.mouseEvent) {
      this.mouseEvent = new ThreeMouseEvent(
        this,
        succCallback,
        failCallback,
        mouseType,
      )
    }
    this.mouseEvent.start()
  }

  /**
   * 关闭鼠标事件
   */
  stopMouseEvent() {
    this.mouseEvent.stop()
  }

  /**
   * @description 后处理效果
   * @param {Object} mesh  后处理对象
   * @param {String} color  模型描边颜色，默认白色
   * @param {Number} period  模型闪烁频率控制，默认 0 不闪烁
   * @param {Number} thickness  高亮发光描边厚度 默认为 1
   * @param {Number} strength  高亮描边发光强度
   */
  addComposer(mesh, color = '#fff', period = 0, thickness = 1, strength = 3) {
    this.composer = new EffectComposer(this.renderer) // 创建后处理对象EffectComposer，WebGL渲染器作为参数
    const renderPass = new RenderPass(this.scene, this.camera) // 创建一个渲染器通道，场景和相机作为参数
    this.composer.addPass(renderPass) // 设置renderPass通道
    const v2 = new Vector2(window.innerWidth, window.innerHeight) // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
    const outlinePass = new OutlinePass(v2, this.scene, this.camera)
    outlinePass.selectedObjects = [mesh] // 一个模型对象 增加发光效果
    this.composer.addPass(outlinePass) // 设置OutlinePass通道
    // 效果控制
    outlinePass.visibleEdgeColor.set(color)
    outlinePass.pulsePeriod = period
    outlinePass.edgeThickness = thickness
    outlinePass.edgeStrength = strength
  }

  /**
   * @description 移出后处理效果
   */
  removeComposer() {
    this.composer = null
  }

  /**
   * @description 添加uv贴图
   * @param {String} textureKey  uv 贴图唯一标识
   * @param {String} imgUrl  uv 贴图url
   * @param {Number} uvOffset  uv 纹理动画偏移量 +:向右； -：向左
   * @returns {Object} 纹理对象
   */
  addTextureLoader(textureKey, imgUrl, uvOffset) {
    const texLoader = new TextureLoader() //纹理贴图加载器TextureLoader
    const texture = texLoader.load(imgUrl) // .load()方法加载图像，返回一个纹理对象Texture
    texture.offset.x += 0.5 //纹理U方向偏移
    // 设置.wrapS也就是U方向，纹理映射模式(包裹模式)
    texture.wrapS = RepeatWrapping //对应offste.x偏移
    texture.colorSpace = SRGBColorSpace //设置为SRGB颜色空间
    this.textureList.push({
      texture,
      uvOffset, // 是否渲染纹理动画
      textureKey,
    })
    return texture
  }

  /**
   * @description 清除纹理动画
   * @param {String} texttureKeys uv动画唯一标识
   */
  removeUvAnimate(texttureKeys = []) {
    this.textureList = this.textureList.filter(
      item => !texttureKeys.includes(item.textureKey),
    )
  }

  /**
   * @description 清除模型
   * @param { Array} modelNames 模型名称
   */
  removeModel(modelNames = []) {
    if (!modelNames.length) return
    modelNames.forEach(name => {
      let model = this.scene.getObjectByName(name)
      if (!model.isMesh) return
      this.scene.remove(model)
      model.geometry.dispose()
      if (model.material) {
        model.material.dispose()
      }
    })
  }
}
