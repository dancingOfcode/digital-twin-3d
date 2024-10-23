/**
 * @description 加载模型 支持格式：gltf glb fbx obj
 * @author xu.zhengyou
 * @param {Object} viewer 视图容器
 */
import ModelFactory from './modelFactory'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
export default class ModelLoader {
  constructor(viewer) {
    this.viewer = viewer
    this.scene = viewer.scene
    this.loaderGLTF = new GLTFLoader() // 加载gltf模型
    this.loaderFBX = new FBXLoader() // 加载fbx模型
    this.loaderOBJ = new OBJLoader() // 加载obj模型
    this.dracoLoader = new DRACOLoader() // 加载draco模型(加载基于Google Draco压缩格式的3D模型的类)
    this.dracoLoader.setDecoderPath('/draco/') // 设置draco模型解码器路径
    this.loaderGLTF.setDRACOLoader(this.dracoLoader) // 设置draco模型加载器
  }

  /**
   * 添加模型数据到当前场景
   * @param {String} url 模型的路径
   * @param {Function} callback 返回模型对象，常用一些功能挂接在模型对象上
   * @param {Function} progress 返回加载进度，还有问题，需要修改
   */
  loadModelToScene(url, callback, progress) {
    this.$loadModel(
      url,
      model => {
        this.scene.add(model.scene) // 加载模型
        callback?.(model)
      },
      num => {
        progress?.(num) // 加载进度
      },
    )
  }

  /**
   * 加载模型
   * @param {String} url 加载模型路径
   * @param {Function} callback 回调模型
   * @param {Function} progress 返回加载进度
   */
  $loadModel(url, callback, progress) {
    let loader = this.loaderGLTF
    if (url.includes('.fbx')) {
      loader = this.loaderFBX
    }
    if (url.includes('.obj')) {
      loader = this.loaderOBJ
    }
    loader.load(
      url,
      model => {
        callback?.(new ModelFactory(model, this.viewer))
      },
      xhr => {
        progress?.(xhr.loaded / xhr.total)
      },
      error => {
        console.error('模型渲染报错：', error)
      },
    )
  }
}
