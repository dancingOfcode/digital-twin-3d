import * as THREE from 'three'
import LabelRender from '@/common/three/labelRender'

/**
 * 批量渲染标签
 * @param {String} type 标签类型
 * @param {Object} viewer 视图
 * @param {Object} labelData 标签信息列表
 * @param {Object} labelData:{name:'', html: '',fontSize: '14px', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }}
 */
export const renderLabel = (type, viewer, labelData = []) => {
  let labelRender = new LabelRender(viewer)
  if (!labelData.length) return
  // 2DLabel
  if (type === '2DLabel') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, name, color } = item
      labelRender.addCss2DLabel(name, html, position, fontSize, color)
      return
    })
  }
  // 3DLabel
  if (type === '3DLabel') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, rotation, name, color } = item
      let label = labelRender.addCss3DLabel(name, html, position, fontSize, color)
      label.rotation.set(rotation.x, rotation.y, rotation.z)
      return
    })
  }
  // 3DSprite
  if (type === '3DSprite') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, name, color } = item
      labelRender.addCss3DSprite(name, html, position, fontSize, color)
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
    const {
      textureKey,
      geomery,
      imgUrl,
      uvOffset,
      repeat,
      rotation,
      position,
    } = item
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
    const { name, color, points, rotation = {}, position = {} } = item
    let pointA = new THREE.Vector3(...points[0])
    let pointB = new THREE.Vector3(...points[1])
    let pointC = new THREE.Vector3(...points[2])
    // 使用distanceTo()方法计算两点之间的距离
    let distanceAB = pointA.distanceTo(pointB).toFixed(6)
    let distanceBC = pointB.distanceTo(pointC).toFixed(6)
    let width = distanceAB > distanceBC ? distanceBC : distanceAB
    let length = distanceAB > distanceBC ? distanceAB : distanceBC
    const geometry = new THREE.PlaneGeometry(length, width)
    const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = name // 增加模型唯一标识,方便模型操作
    mesh.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0)
    mesh.position.set(position.x || 0, position.y || 0, position.z || 0)
    viewer.scene.add(mesh)
  })
}

/**
 * 
 * @param {Object} viewer 视图
 * @param {Array} stairData ,
 */
export const drawStair = (viewer, stairData = []) => {
  if (!stairData.length) return
  stairData.forEach(item => {
    const { name, stairColor, insideColor, stairGeo, insideGeo, rotation, position } = item
    // 创建电梯
    const stairGeometry = new THREE.BoxGeometry(stairGeo.x || 12, stairGeo.y || 12, stairGeo.z || 12);
    const stairMaterial = new THREE.MeshBasicMaterial({
      color: stairColor,
      opacity: 0.5,//透明度
      transparent: true,//允许透明
    });
    const stair = new THREE.Mesh(stairGeometry, stairMaterial);
    stair.name = name
    stair.position.set(position.x || 0, position.y || 0, position.z || 0);
    stair.rotation.set(rotation.x || 0, rotation.y || Math.PI / 4, rotation.z || 0);
    viewer.scene.add(stair);
    // 创建电梯的内部
    const insideGeometry = new THREE.BoxGeometry(insideGeo.x || 10, insideGeo.y || 10, insideGeo.z || 10);
    const insideMaterial = new THREE.MeshBasicMaterial({
      color: insideColor,
      opacity: 0.6,//透明度
      transparent: true,//允许透明
    });
    const inside = new THREE.Mesh(insideGeometry, insideMaterial);
    inside.name = `${name}-inside`
    inside.position.set(0, -(stairGeo.y - insideGeo.y) / 2, 0);
    stair.add(inside);
  })
}
