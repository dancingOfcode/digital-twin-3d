import * as THREE from 'three'
import LabelRender from '@/common/three/labelRender'

/**
 * 批量渲染标签
 * @param {String} type 标签类型
 * @param {Object} viewer 视图
 * @param {Object} labelData 标签信息列表
 * @param {String} html HTML内容
 * @param {Object} position 位置信息
 * @param {Object} rotation:{html: '',fontSize: '14px', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }} 旋转参数
 */
export const renderLabel = (type, viewer, labelData = []) => {
  let labelRender = new LabelRender(viewer)
  if (!labelData.length) return
  // 2DLabel
  if (type === '2DLabel') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, } = item
      labelRender.addCss2DLabel(html, position, fontSize)
      return
    })
  }
  // 3DLabel
  if (type === '3DLabel') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, rotation } = item
      let label = labelRender.addCss3DLabel(html, position, fontSize)
      label.rotation.set(rotation.x, rotation.y, rotation.z)
      return
    })
  }
  // 3DSprite
  if (type === '3DSprite') {
    labelData.map(item => {
      const { html, fontSize = '14px', position } = item
      labelRender.addCss3DSprite(html, position, fontSize)
      return
    })
  }
}

/**
 * 批量绘制方形区域
 * @param {Object} viewer 视图
 * @param {Array} squareData  { points: [], color: '', position }
 */
export const drawSquareArea = (viewer, squareData = []) => {
  if (!squareData.length) return
  squareData.map(item => {
    // 创建几何点集
    const points = []
    points.push(new THREE.Vector3(...item.points[0]))
    points.push(new THREE.Vector3(...item.points[1]))
    points.push(new THREE.Vector3(...item.points[2]))
    points.push(new THREE.Vector3(...item.points[3]))
    points.push(new THREE.Vector3(...item.points[0]))
    // 创建几何体与材质
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const meterial = new THREE.LineBasicMaterial({ color: item.color })
    // 把几何体和材质组合在一起
    const { x, y, z } = item.position ?? { x: 0, y: 1, z: 0 }
    const line = new THREE.Line(geometry, meterial)
    line.position.set(x || 0, y || 1, z || 0)
    viewer.scene.add(line)
    return
  })
}

/**
 * 批量创建贴图 支持传入 uvOffset 生成uv动画
 * @param {Object} viewer 视图
 * @param {Array} textureData { textureKey:'', geomery:{}, imgUrl:'', uvOffset:0.05, repeat:{x:1,y:1}, rotation:{}, position:{} }
 */
export const drawTexture = (viewer, textureData = []) => {
  if (!textureData.length) return
  textureData.map(item => {
    const { textureKey, geomery, imgUrl, uvOffset, repeat, rotation, position } = item
    let texture = viewer.addTextureLoader(textureKey, imgUrl, uvOffset)
    texture.repeat.set(repeat.x, repeat.y) //注意选择合适的阵列数量
    const material = new THREE.LineBasicMaterial({
      map: texture, //map表示材质的颜色贴图属性
    })
    const c_geomery = new THREE.PlaneGeometry(geomery[0], geomery[1])
    const textureMesh = new THREE.Mesh(c_geomery, material)
    textureMesh.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0)
    textureMesh.position.set(position.x || 0, position.y || 0, position.z || 0)
    textureMesh.name = textureKey
    viewer.scene.add(textureMesh)
  })
}

/**
 * 绘制平面
 * @param {Object} viewer 视图
 * @param {Array} planeData {name, color, points, rotation, position} 平面数据
 */
export const drawPlane = (viewer, planeData) => {
  if (!planeData.length) return
  planeData.forEach(item => {
    const { name, color, points, rotation, position } = item
    let pointA = new THREE.Vector3(...points[0]);
    let pointB = new THREE.Vector3(...points[1]);
    let pointC = new THREE.Vector3(...points[2]);
    // 使用distanceTo()方法计算两点之间的距离
    let distanceAB = pointA.distanceTo(pointB).toFixed(6);
    let distanceBC = pointB.distanceTo(pointC).toFixed(6);
    let width = distanceAB > distanceBC ? distanceBC : distanceAB
    let length = distanceAB > distanceBC ? distanceAB : distanceBC
    const geometry = new THREE.PlaneGeometry(length, width);
    const material = new THREE.MeshBasicMaterial({ color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = name // 增加模型唯一标识,方便模型操作
    mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    mesh.position.set(position.x, position.y, position.z)
    viewer.scene.add(mesh)
  });
}