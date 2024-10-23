import { CubeTextureLoader } from 'three'
import { skyboxType } from '@/common/utils/constant'

export default class SkyBox {
  constructor(viewer) {
    this.viewer = viewer
  }
  /**
   * 天空盒
   * @param {String} type 天空盒类型
   */
  setSkybox(type = skyboxType.day) {
    const loaderbox = new CubeTextureLoader() // 加载贴图
    const cubeTexture = loaderbox.load([
      `/images/skybox/${type}/posx.jpg`,
      `/images/skybox/${type}/negx.jpg`,
      `/images/skybox/${type}/posy.jpg`,
      `/images/skybox/${type}/negy.jpg`,
      `/images/skybox/${type}/posz.jpg`,
      `/images/skybox/${type}/negz.jpg`,
    ])
    this.viewer.scene.background = cubeTexture
  }
}
